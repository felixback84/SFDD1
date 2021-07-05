// firebase
const { db } = require('../utilities/admin');

///////////////////////////////////////////// SETTINGS TO THING FROM UX  //////////////////////////////////////////////////
// pass data of statics users means coords 
exports.postCoordsStaticDevices = (req, res) => {
    // geofire
    const geofire = require('geofire-common');
    // profile of dynamic
    let objWithCoordsOfStatic = req.body.objWithCoordsOfStatic;
    // db part
    // userDeviceId 
    const staticDeviceId = objWithCoordsOfStatic.thingId.split("-").slice(2);
    db
        .doc(`/staticDevices/${staticDeviceId}`)
        .collection('liveDataSets')
        .doc(objWithCoordsOfStatic.thingId)
        .update(
            { 
                thingId: objWithCoordsOfStatic.thingId,
                coords:{
                    lat:objWithCoordsOfStatic.coords.lat,
                    lon:objWithCoordsOfStatic.coords.lon,
                    hash: geofire.geohashForLocation([
                            objWithCoordsOfStatic.coords.lat,
                            objWithCoordsOfStatic.coords.lon
                        ])
                }
            }
        )
        .then(() => {
            console.log(objWithCoordsOfStatic)
            // res
            return res.json(objWithCoordsOfStatic);
        })            
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });   
}

// pass data of statics users means profile
exports.postProfileToSearchStaticDevices = (req, res) => {
    // profile of dynamic
    let objWithProfileToSearchOfStatic = req.body.objWithProfileToSearchOfStatic;
    // db part
    // userDeviceId 
    const staticDeviceId = objWithProfileToSearchOfStatic.thingId.split("-").slice(2);
    db
        .doc(`/staticDevices/${staticDeviceId}`)
        .collection('liveDataSets')
        .doc(objWithProfileToSearchOfStatic.thingId)
        .update({ profileToSearch: objWithProfileToSearchOfStatic.profileToSearch, })
        .then(() => {
            console.log(objWithProfileToSearchOfStatic)
            // res
            return res.json(objWithProfileToSearchOfStatic);
        })            
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });  
}