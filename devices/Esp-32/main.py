# import libs
import machine
import esp32
from third_party import string
import network
import socket
import os
import utime
import ssl
from third_party import rsa
from umqtt.simple import MQTTClient
from ubinascii import b2a_base64
from machine import RTC, Pin
import ntptime
import ujson
import config

# network init
sta_if = network.WLAN(network.STA_IF)
led_pin = machine.Pin(config.device_config['led_pin'], Pin.OUT) #built-in LED pin
led_pin.value(1)

# function to establish and eval the status of the connection 
def connect():
    if not sta_if.isconnected():
        print('connecting to network...')
        sta_if.active(True)
        sta_if.connect(config.wifi_config['ssid'], config.wifi_config['password'])
        while not sta_if.isconnected():
            pass
    print('network config: {}'.format(sta_if.ifconfig()))

# take care about the time for the messaging ----> i guess
def set_time():
    ntptime.settime()
    tm = utime.localtime()
    tm = tm[0:3] + (0,) + tm[3:6] + (0,)
    machine.RTC().datetime(tm)
    print('current time: {}'.format(utime.localtime()))

# encoder for the messages 
def b42_urlsafe_encode(payload):
    return string.translate(b2a_base64(payload)[:-1].decode('utf-8'),{ ord('+'):'-', ord('/'):'_' })

# Epoch_offset is needed because micropython epoch is 2000-1-1 and unix is 1970-1-1. Adding 946684800 (30 years)
epoch_offset = 946684800

# creation of the jwt
def create_jwt(project_id, private_key, algorithm, token_ttl):
    # print init in process of jwt generation
    print("Creating JWT...")
    # the actual token
    private_key = rsa.PrivateKey(*private_key)
    # duration
    claims = {
        # The time that the token was issued at
        'iat': utime.time() + epoch_offset,
        # The time the token expires.
        'exp': utime.time() + epoch_offset + token_ttl,
        # The audience field should always be set to the GCP project id.
        'aud': project_id
    }
    # This only supports RS256 at this time.
    header = { "alg": algorithm, "typ": "JWT" }
    content = b42_urlsafe_encode(ujson.dumps(header).encode('utf-8'))
    content = content + '.' + b42_urlsafe_encode(ujson.dumps(claims).encode('utf-8'))
    signature = b42_urlsafe_encode(rsa.sign(content,private_key,'SHA-256'))
    #signed JWT
    return content+ '.' + signature 

# global vars to hold telemtry
active = {}
motorSpeed = {}
colorValue = {}    

# function to handle the receive message, always show something about config topic
def on_message(topic, message):
    # decode messages
    payload = str(message.decode('utf-8'))
    # print message in string type
    print(payload)
    # check if exist data in the payload
    # if payload:
        # convert the string to dictionary
        # toObject = payload
        # print message in dictionary type
        # print(toObject)
        # extract data from message incoming of client UI 
        # active = payload[active]
        # motorSpeed = payload[motorSpeed]
        # colorValue = payload[colorValue]
        # run it publish data function
        # publishData(mqtt_topic, client)    

# function to create and set the mqtt client
def get_mqtt_client(project_id, cloud_region, registry_id, device_id, jwt):
    # clien id in the IoT Core format
    client_id = 'projects/{}/locations/{}/registries/{}/devices/{}'.format(project_id, cloud_region, registry_id, device_id)
    # print pass
    print('Sending message with password {}'.format(jwt))
    client = MQTTClient (    
                            client_id.encode('utf-8'),
                            server=config.google_cloud_config['mqtt_bridge_hostname'],
                            port=config.google_cloud_config['mqtt_bridge_port'],
                            user=b'ignored',
                            password=jwt.encode('utf-8'),
                            ssl=True
                        )
    # set callback to deal with the messages income
    client.set_callback(on_message)
    # connect client
    client.connect()
    # subscribe client to the topics
    client.subscribe('/devices/{}/config'.format(device_id), 1)
    client.subscribe('/devices/{}/commands/#'.format(device_id), 1)
    # set client
    return client

# run the eval and connect to the red function
connect()
# Need to be connected to the internet before setting the local RTC.
set_time()

# var to hold and run function to create jwt
jwt = create_jwt(
                    config.google_cloud_config['project_id'], 
                    config.jwt_config['private_key'], 
                    config.jwt_config['algorithm'], 
                    config.jwt_config['token_ttl']
                )
# var to hold and run function mqtt client 
client = get_mqtt_client(
                            config.google_cloud_config['project_id'], 
                            config.google_cloud_config['cloud_region'], 
                            config.google_cloud_config['registry_id'], 
                            config.google_cloud_config['device_id'], 
                            jwt
                        )
# topic to publish
mqtt_topic = '/devices/{}/{}'.format(config.google_cloud_config['device_id'], 'events')

# publish data function
def publishData(mqtt_topic, client):
    # telemetry dict
    message = {
        "thingId": config.google_cloud_config['device_id'],
        "createdAt": utime.time() + epoch_offset,
        "active": active,
        "motorSpeed": motorSpeed,
        "colorValue": colorValue
    }
    # print message to publish
    print("Publishing message "+str(ujson.dumps(message)))
    # publish to client
    client.publish(mqtt_topic.encode('utf-8'), ujson.dumps(message).encode('utf-8'))
    
# device bucle
while True:
    # Check for new messages on subscription
    if client.check_msg():
        on_message(topic, message)