// // create notification in db
// exports.createNotificationOfOnFromThing = async (data, docId) => {
//     // db part
//     const activeUserDevices = db.collection('activeUserDevices').doc(docId.toString());
//     //const snapshot = await activeUserDevices.where('userDeviceId', '==', data.userDeviceId.toString()).get();
//     const doc = await activeUserDevices.get();

//     // check if there are any coincidence
//     if (!doc.exists) {
//         console.log('No matching documents.');
//         return;
//     }  else {
//         // extract and return the results
//         console.log('Document data:', doc.data());
//         // update field
//         const res = await activeUserDevices.update({activeThing: true});
//     }

//     // add data to notofocation collection   
//     db
//         .collection('notifications')
//         .add({
//             ...data
//         })
// }  

// // create notification in db
// exports.createNotificationOfOffFromThing = async (data, docId) => {
//     // db part
//     const activeUserDevices = db.collection('activeUserDevices').doc(docId.toString());
//     //const snapshot = await activeUserDevices.where('userDeviceId', '==', data.userDeviceId.toString()).get();
//     const doc = await activeUserDevices.get();

//     // check if there are any coincidence
//     if (!doc.exists) {
//         console.log('No matching documents.');
//         return;
//     }  else {
//         // extract and return the results
//         console.log('Document data:', doc.data());
//         // update field
//         const res = await activeUserDevices.update({activeThing: false});
//     }

//     // add data to notofocation collection   
//     db
//         .collection('notifications')
//         .add({
//             ...data
//         })
// }  