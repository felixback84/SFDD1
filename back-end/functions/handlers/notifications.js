const { db } = require("../utilities/admin");

// get active state of thing in activeUserDevices
const getActiveStateFromActiveUserDeviceCollection = async (userDeviceId) => {
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

const addNotificationOnDBOfActiveThingStateOfThing = async (
        dataToCretateNotification, 
        activeUserDocId, 
        activeThingState
    ) => {
        //vars
        const dataToCretateNotificationVar = dataToCretateNotification;
        const activeUserDocIdVar = activeUserDocId;
        const activeThingStateVar = activeThingState;

        // db part
        const activeUserDevices = db.collection('activeUserDevices').doc(activeUserDocIdVar.toString());
        const doc = await activeUserDevices.get();

        // check if there are any coincidence
        if (!doc.exists) {
            console.log('No matching documents.');
            return;
        }  else {
            // extract and return the results
            console.log('Document data:', doc.data());
            // update field
            const updateResult = await activeUserDevices.update({...activeThingStateVar});
        }

        // add data to notofocation collection   
        db
            .collection('notifications')
            .add({
                ...dataToCretateNotificationVar
            })
    }

const pickerNotificationToActiveStateOfThing = (objToPickerTheTypeOfNotification) => {
    
    // vars to pass data
    const messageaActiveFromThing = objToPickerTheTypeOfNotification.messageaActiveFromThing;
    const activeUserDevicesState = objToPickerTheTypeOfNotification.activeUserDevicesState;
    const dataToCretateNotification = objToPickerTheTypeOfNotification.dataToCretateNotification;
    const activeUserDevicesId = objToPickerTheTypeOfNotification.activeUserDevicesId;

    //check if run the notification to ON command
    if(messageaActiveFromThing == 'true'){
        if(activeUserDevicesState == false){
            // run the creation of the notification of ON
            addNotificationOnDBOfActiveThingStateOfThing(
                dataToCretateNotification, 
                activeUserDevicesId,
                {activeThing: true}
            );
        }
    }

    //check if run the notification to OFF command
    if(messageaActiveFromThing == 'false'){
        if(activeUserDevicesState == true){
            addNotificationOnDBOfActiveThingStateOfThing(
                dataToCretateNotification, 
                activeUserDevicesId,
                {activeThing: false}
            );
        }
    }
}

//////////////////////////////////////////////////////////// NOTIFICATIONS PART /////////////////////////////    
exports.initNotificationsToActiveStateOfThing = async (dataToNotificationOfStateOfThing) => {
    // run it and get the state of activeThing
    const getValueOnActiveStateOfThing = await getActiveStateFromActiveUserDeviceCollection(dataToNotificationOfStateOfThing.userDeviceId);
    const resultOfActiveState = await getValueOnActiveStateOfThing;

    // print result of state in activeThing
    console.log(`result of activeThing: ${resultOfActiveState.toString()}`);

    // obj to pass too the picker notification
    const objToPickerNotification = {
        messageaActiveFromThing: dataToNotificationOfStateOfThing.messageaActiveFromThing,
        dataToCretateNotification : dataToNotificationOfStateOfThing.dataToCretateNotification,
        activeUserDevicesId: resultOfActiveState.activeUserDevicesId,
        activeUserDevicesState: resultOfActiveState.activeThing
    }

    // run it
    pickerNotificationToActiveStateOfThing(objToPickerNotification);
}














