// notification logic    
        // dbDataFromLiveDataSets
        //     .get()    
        //     .then((doc)=>{
        //         let dataDB = doc.data() 
        //         // check if run the notification to ON command
        //         if(dataDB.active != false){
        //             if(getActiveStateFromActiveUserDeviceCollection(userDeviceId) == false){
        //                 // obj to notification doc to ON command
        //                 const dataToNotification = {
        //                     read: false,
        //                     active: obj.active,
        //                     userDeviceId: userDeviceId,
        //                     thingId: thingId,
        //                     createdAt: obj.createdAt,
        //                     nameOfDevice: nameOfDevice,
        //                     userHandle: userHandle,
        //                 } 
        //                 createNotificationOfOnFromThing(dataToNotification);
        //             }
        //         }
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });


        //
// exports.createNotificationOfOnFromThing = functions.pubsub.topic('events').onPublish(
//     (message, context) => {
//         // all data
//         let data = message.data;        
//         // create a buffer decoding with base64
//         const buff = Buffer.from(data, 'base64');
//         // decode buffer as UTF-8
//         const str = buff.toString('utf-8');
//         // print normal string
//         console.log(`string: ${str}`);
//         // str to obj
//         let obj = JSON.parse(str); 
//         // check active status
//         if (obj.active !== 'false') {
//             // pick from userDeviceId -- CarlosTal84-Halo-8n4ohAo247H1W5SsxY9s
//             const thingId = obj.thingId;
//             // print object
//             console.log(`obj: ${obj.createdAt} - ${thingId}`);
//             // userDeviceId 
//             const userDeviceId = thingId.split("-").slice(2);
//             // print userDeviceId
//             console.log(`userDeviceId: ${userDeviceId}`);

//             // connection with db to check if the thing is already active
//             let activestateInCollectionActiveUserDevices =  db
//                 .collection('activeUserDevices')
//                 .where('userDeviceId','==', userDeviceId)
//                 .get()

//             // var to hold active thing state
//             let activeThingState = false

//             // get if the activeThing state is already active
//             activestateInCollectionActiveUserDevices
//                 .get()
//                 .then((doc)=>{
//                     activeThingState = doc.data().activeThing
//                 })
//                 .catch((err) => {
//                     console.error(err);
//                 });
            
//             // check the recent state of activeThing
//             if(activeThingState == false){
//                 // nameOfDevice
//                 const nameOfDevice = thingId.split("-").slice(1,2);
//                 // userHandle
//                 const userHandle = thingId.split("-").slice(0,1);
//                 // print 
//                 console.log(`nameOfDevice: ${nameOfDevice}`);
//                 // create notification object for of ON to thing 
//                 const dataToNotification = {
//                     read: false,
//                     active: obj.active,
//                     userDeviceId: userDeviceId,
//                     thingId: thingId,
//                     createdAt: obj.createdAt,
//                     nameOfDevice: nameOfDevice,
//                     userHandle: userHandle,
//                 }

//                 // perform desired operations ...
//                 let messageDataToNotofications = db
//                     .collection('notifications')
//                     .add({
//                         ...dataToNotification
//                     })
//                     .catch((err) => {
//                         console.error(err);
//                     });
//             }
            
//         }    
//     }
// )

// // trigger db "notifications" when the user image is changed 
// exports.createNotificationOfOnFromThing = (userDeviceId,liveDataSetId) => {  
//     functions.firestore
//     .document(`userDevices/${userDeviceId}/liveDataSets/${liveDataSetId}`)
//     //.document(`/liveDataSets/${liveDataSetsId}`)
//     //.document(`/userDevices/${userDevicesId}`) 
//     //.collection(`userDevices/${userDevicesId}`)
//     //.collection('liveDataSets')
//     //.document(thingId)
//     .onWrite((change) => {
//         // print
//         console.log(`before change: ${change.before.data()}`);
//         console.log(`after data: ${change.after.data()}`);
//         // check if the field change
//         if (change.before.data().active !== change.after.data().active) {
//             // print
//             console.log('the activation status just change');
//             // Get an object representing the document
//             const newValue = change.after.data();
//             // access a particular field as you would any JS property
//             const active = newValue.active;
//             const thingId = newValue.thingId;
//             // userDeviceId 
//             const userDeviceId = thingId.split("-").slice(2);
//             // nameOfDevice
//             const nameOfDevice = thingId.split("-").slice(1,2);
//             // userHandle
//             const userHandle = thingId.split("-").slice(0,1);
//             // create notification of ON to thing 
//             const dataToNotification = {
//                 read: false,
//                 active: active,
//                 userDeviceId: userDeviceId,
//                 thingId: thingId,
//                 createdAt: newValue.createdAt,
//                 nameOfDevice: nameOfDevice,
//                 userHandle: userHandle,
//                 notificationId: doc.id           
//             }
            
//             // perform desired operations ...
//             let messageDataToNotofications = db
//                 .collection('notifications')
//                 .add({
//                     ...dataToNotification
//                 })
//                 .catch((err) => {
//                     console.error(err);
//                 });
//         } 
//     })
// }