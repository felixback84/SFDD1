const { db } = require("../utilities/admin");

// get active state of thing in activeUserDevices
exports.getActiveStateFromActiveUserDeviceCollection = async (userDeviceId) => {
    // connection with db to check if the thing is already active
    const activeUserDevices = db.collection('activeUserDevices');
    const snapshot = await activeUserDevices.where('userDeviceId', '==', userDeviceId).get();
    // check if there are any coincidence
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }  else {
        // var to hold state
        let activeThing = null;
        // extract and return the results
        snapshot.forEach(doc => {
            // print data
            console.log(doc.id, '=>', doc.data());
            // extract state on activeThing
            activeThingData = {
                activeThing: doc.data().activeThing,
                activeUserDevicesId: doc.id
            }
            // print data of state
            console.log(`activeThingData: ${activeThingData}`);
        });
        // return result
        return activeThingData
    }
}

// create notification in db
exports.createNotificationOfOnFromThing = async (data, docId) => {
    // db part
    const activeUserDevices = db.collection('activeUserDevices').doc(docId.toString());
    //const snapshot = await activeUserDevices.where('userDeviceId', '==', data.userDeviceId.toString()).get();
    const doc = await activeUserDevices.get();

    // check if there are any coincidence
    if (!doc.exists) {
        console.log('No matching documents.');
        return;
    }  else {
        // extract and return the results
        console.log('Document data:', doc.data());
        // update field
        const res = await activeUserDevices.update({activeThing: true});
    }

    // add data to notofocation collection   
    db
        .collection('notifications')
        .add({
            ...data
        })
}  