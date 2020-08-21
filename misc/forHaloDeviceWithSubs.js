// exports.getOnOffFromHaloDevice = (req,res) => {
//     // lib
//     const {PubSub} = require('@google-cloud/pubsub');
//     // firebase part
//     const { db } = require('../utilities/admin');
//     // var to firebase consult
//     const userDeviceId = req.params.userDeviceId
//     // var for hold id of device
//     let deviceId = "";
//     // ask for firebase document
//     db
//         .doc(`/userDevices/${userDeviceId}`)
//         .get()
//         .then((doc) => {
//             let userDeviceData = doc.data();
//             let userHandle = userDeviceData.userHandle;
//             let nameOfDevice = userDeviceData.device.nameOfDevice;
//             // var with vars to pass through function
//             deviceId = `${userHandle}-${nameOfDevice}-${userDeviceId}`;
//             // project id
//             const projectId = 'sfdd-d8a16';
//             // id subs
//             const idOfSubscription = `state_${deviceId}`;
//             // sub name
//             const subscriptionNameToStateOfDevice = `projects/${projectId}/subscriptions/${idOfSubscription}`;
//             // Creates a client; cache this for further use
//             const pubSubClient = new PubSub();
//             // id device from messages
//             let rightDevice = ''; 
//             // function to listen messages from devices
//             function listenToStateMessages() {
//                 // References an existing subscription
//                 const subscriptionState = pubSubClient.subscription(subscriptionNameToStateOfDevice);
//                 // Create an event handler to handle messages
//                 const messageHandlerToSate = message => {
//                     console.log(`Received message ${message.id}:`);
//                     console.log('\tData:' + message.data);
//                     // to read
//                     let myJSONAtt = JSON.stringify(message.attributes);
//                     // print
//                     console.log(`\tAttributes: ${myJSONAtt}`);

//                     // create object with device data
//                     const payload = JSON.parse(message.data);
//                     // id device from messages
//                     rightDevice = payload.deviceId;
//                     const flag = payload.flag;
//                     console.log(`rightDevice: ${rightDevice} and ${flag}`);
//                     // "Ack" (acknowledge receipt of) the message
//                     message.ack();
//                 }
//                 // Listen for new messages until timeout is hit
//                 subscriptionState.on('message', messageHandlerToSate);
//             }
//             // run it
//             listenToStateMessages()
            
//         }).catch((err) => console.error(err));
// }    