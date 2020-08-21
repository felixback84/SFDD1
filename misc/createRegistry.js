// Client retrieved in callback
// const cloudRegion = 'us-central1';
// const projectId = 'adjective-noun-123';
// const registryId = 'my-registry';
// function errCb = lookupRegistry; // Lookup registry if already exists.
const iot = require('@google-cloud/iot');

// Lookup the pubsub topic
const topicPath = `projects/${projectId}/topics/${pubsubTopicId}`;

const iotClient = new iot.v1.DeviceManagerClient({
  // optional auth parameters.
});

const newParent = iotClient.locationPath(projectId, cloudRegion);
const deviceRegistry = {
  eventNotificationConfigs: [
    {
      pubsubTopicName: topicPath,
    },
  ],
  id: registryId,
};
const request = {
  parent: newParent,
  deviceRegistry: deviceRegistry,
};

try {
  const responses = await iotClient.createDeviceRegistry(request);
  const response = responses[0];

  console.log('Successfully created registry');
  console.log(response);
} catch (err) {
  console.error('Could not create registry', err);
}