// firebase
const { admin, db } = require('../utilities/admin');
//_
const { forEach } = require('underscore');

// specific the mode of search
exports.heartbeatPostSearchingMode = (req,res) => {
    const searchingModeData = req.body;
    // db part
    // userDeviceId 
    const userDeviceId = searchingModeData.objSearchingModeData.thingId.split("-").slice(2);
    db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('liveDataSets')
        .doc(searchingModeData.objSearchingModeData.thingId)
        .update({ searchingMode: searchingModeData.objSearchingModeData.searchingMode, })
        .then(() => {
            console.log(`objWithProfileToSearchOfDynamic: ${searchingModeData}`)
            // res
            return res.json(searchingModeData);
        })            
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        }); 
}

///////////////////////////////////////////// SETTINGS TO THING FROM UX //////////////////////////////////////////////////
// pass data of statics users means profileToMatch
exports.postProfileToSearchUserDevices = (req,res) => {
    // profile of dynamic
    let profileToSearchOfDynamicData = req.body;
    // db part
    // userDeviceId 
    const userDeviceId = profileToSearchOfDynamicData.objWithProfileToSearchOfDynamic.thingId.split("-").slice(2);
    db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('liveDataSets')
        .doc(profileToSearchOfDynamicData.objWithProfileToSearchOfDynamic.thingId)
        .update({ 
            profileToMatch: profileToSearchOfDynamicData.objWithProfileToSearchOfDynamic.profileToMatch,
        })
        .then(() => {
            console.log(`objWithProfileToSearchOfDynamic: ${profileToSearchOfDynamicData}`)
            // res
            return res.json(profileToSearchOfDynamicData);
        })            
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });  
}



