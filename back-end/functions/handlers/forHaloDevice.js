// get on of halo device
exports.getOnOffFromHaloDevice = (req, res) => {
    // firebase part
    const { db } = require('../utilities/admin');
    // var to firebase consult
    const userDeviceId = req.params.userDeviceId
    // var for hold id of device
    let deviceId = "";
    // ask for firebase document
    db
        .doc(`/userDevices/${userDeviceId}`)
        .get()
        .then((doc) => {
            let userDeviceData = doc.data();
            let userHandle = userDeviceData.userHandle;
            let nameOfDevice = userDeviceData.device.nameOfDevice;
            // var with vars to pass through function
            deviceId = `${userHandle}-${nameOfDevice}-${userDeviceId}`;

            // listen messages from halo device in on/off topic
            function listenForOnMessageFromHaloDevice(deviceId){
                // project gcloud id
                const projectId = 'sfdd-d8a16';
                const subscriptionPath = `projects/${projectId}/subscriptions/commands~${deviceId}~on-off`;
                // Creates a client; cache this for further use
                const pubSubClient = new PubSub();
                // References an existing subscription
                const subscriptionToOnTopic = pubSubClient.subscription(subscriptionPath);
                // message handler
                const messageHandler1 = (message) => {
                    console.log(`Received message ${message.id}:`);
                    console.log('\tData:' + message.data);
                    console.log(`\tAttributes: ${message.attributes}`);
                    let payload = JSON.parse(message.data);
                    // "Ack" (acknowledge receipt of) the message
                    message.ack();
                    // res to ui
                    res.send(payload);
                }   
                // Listen for new messages until timeout is hit
                subscriptionToOnTopic.on('message', messageHandler1);

            
            };
        
            listenForOnMessageFromHaloDevice(deviceId);
        
        })
}