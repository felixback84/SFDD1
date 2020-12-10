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
            activeThing = doc.data().activeThing;
            // print data of state
            console.log(`activeThing: ${activeThing}`);
        });
        // return result
        return activeThing
    }
}

// create notification in db
exports.createNotificationOfOnFromThing = (data) => {
    // connection with db to check if the thing is already active
    let activestateInCollectionActiveUserDevices =  db
        .collection('activeUserDevices')
        .where('userDeviceId','==', userDeviceId)
        .update({
            activeThing: true
        })
    // add data to notofocation collection   
    db
        .collection('notifications')
        .add({
            ...data
        })
}  