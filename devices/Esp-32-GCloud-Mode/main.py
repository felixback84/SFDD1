# [START iot_mqtt_includes]
import argparse
import datetime
import logging
import os
import random
import ssl
import time
import jwt
import paho.mqtt.client as mqtt
import config
import network
import esp32
import utime
import ujson
# [END iot_mqtt_includes]

# The initial backoff time after a disconnection occurs, in seconds.
minimum_backoff_time = 1
# The maximum backoff time before giving up, in seconds.
MAXIMUM_BACKOFF_TIME = 32
# Whether to wait with exponential backoff before publishing.
should_backoff = False

# [START network init]
sta_if = network.WLAN(network.STA_IF)

# function to establish and eval the status of the connection 
def connect():
    if not sta_if.isconnected():
        print('connecting to network...')
        sta_if.active(True)
        sta_if.connect(config.wifi_config['ssid'], config.wifi_config['password'])
        while not sta_if.isconnected():
            pass
    print('network config: {}'.format(sta_if.ifconfig()))

# run the eval and connect function
connect() 
# [END network init]    

# [START iot_mqtt_jwt]
def create_jwt(project_id, private_key_file, algorithm):
    # token time
    token = {
        # The time that the token was issued at
        'iat': datetime.datetime.utcnow(),
        # The time the token expires.
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=20),
        # The audience field should always be set to the GCP project id.
        'aud': project_id
    }
    # Read the private key file.
    with open(private_key_file, 'r') as f:
        private_key = f.read()
    # print
    print('Creating JWT using {} from private key file {}'.format(
            algorithm, private_key_file))
    # the actual token
    return jwt.encode(token, private_key, algorithm=algorithm)
# [END iot_mqtt_jwt]

# [START iot_mqtt_config]
# on error function
def error_str(rc):
    """Convert a Paho error to a human readable string."""
    return '{}: {}'.format(rc, mqtt.error_string(rc))

# on connect function
def on_connect(unused_client, unused_userdata, unused_flags, rc):
    """Callback for when a device connects."""
    print('on_connect', mqtt.connack_string(rc))

    # After a successful connect, reset backoff time and stop backing off.
    global should_backoff
    global minimum_backoff_time
    should_backoff = False
    minimum_backoff_time = 1

# on disconnect function
def on_disconnect(unused_client, unused_userdata, rc):
    """Paho callback for when a device disconnects."""
    print('on_disconnect', error_str(rc))

    # Since a disconnect occurred, the next loop iteration will wait with
    # exponential backoff.
    global should_backoff
    should_backoff = True

# on publish function
def on_publish(unused_client, unused_userdata, unused_mid):
    """Paho callback when a message is sent to the broker."""
    print('on_publish')

# on message function
def on_message(unused_client, unused_userdata, message):
    """Callback when the device receives a message on a subscription."""
    payload = str(message.payload.decode('utf-8'))
    print('Received message \'{}\' on topic \'{}\' with Qos {}'.format(
            payload, message.topic, str(message.qos)))

# get client function
def get_client(
        project_id, cloud_region, registry_id, device_id, private_key_file,
        algorithm, ca_certs, mqtt_bridge_hostname, mqtt_bridge_port):
    """Create our MQTT client. The client_id is a unique string that identifies
    this device. For Google Cloud IoT Core, it must be in the format below."""
    
    # vars to set the connection with IoT Core
    project_id = config.google_cloud_config['project_id']
    cloud_region = config.google_cloud_config['cloud_region']
    registry_id = config.google_cloud_config['registry_id']
    device_id = config.google_cloud_config['device_id']
    mqtt_bridge_hostname = config.google_cloud_config['mqtt_bridge_hostname']
    mqtt_bridge_port = config.google_cloud_config['mqtt_bridge_port']
    algoritm = config.jwt_config['algorithm']
    private_key_file = './utils/rsa_public.pem'

    # url client_id
    client_id = 'projects/{}/locations/{}/registries/{}/devices/{}'.format(
            project_id, cloud_region, registry_id, device_id)
    # print        
    print('Device client_id is \'{}\''.format(client_id))

    # mqtt client
    client = mqtt.Client(client_id=client_id)

    # With Google Cloud IoT Core, the username field is ignored, and the
    # password field is used to transmit a JWT to authorize the device.
    client.username_pw_set(
            username='unused',
            password=create_jwt(
                    project_id, private_key_file, algorithm))
            
    # Enable SSL/TLS support.
    client.tls_set(ca_certs=ca_certs, tls_version=ssl.PROTOCOL_TLSv1_2)

    # Register message callbacks. https://eclipse.org/paho/clients/python/docs/
    # describes additional callbacks that Paho supports. In this example, the
    # callbacks just print to standard out.
    client.on_connect = on_connect
    client.on_publish = on_publish
    client.on_disconnect = on_disconnect
    client.on_message = on_message

    # Connect to the Google MQTT bridge.
    client.connect(mqtt_bridge_hostname, mqtt_bridge_port)

    # topics subscriptions
    # This is the topic that the device will receive configuration updates on.
    mqtt_config_topic = '/devices/{}/config'.format(device_id)
    # Subscribe to the config topic.
    client.subscribe(mqtt_config_topic, qos=1)
    # The topic that the device will receive commands on.
    mqtt_command_topic = '/devices/{}/commands/#'.format(device_id)
    # Subscribe to the commands topic, QoS 1 enables message acknowledgement.
    client.subscribe(mqtt_command_topic, qos=0)
    # print
    print('Subscribing to {}'.format(mqtt_command_topic))

    # the actual client
    return client
# [END iot_mqtt_config]

# [START device loop]
# infinite bucle to device publish telemetry
while True:
    # telemetry dict
    message = {
        "device_id": config.google_cloud_config['device_id'],
        "temp": esp32.raw_temperature()
    }
    # topic to publish
    mqtt_topic = '/devices/{}/{}'.format(config.google_cloud_config['device_id'], 'events')
    # publish to client
    client.publish(mqtt_topic.encode('utf-8'), ujson.dumps(message).encode('utf-8'))
    # Delay for 10 seconds.
    utime.sleep(10)  
# [END device loop]