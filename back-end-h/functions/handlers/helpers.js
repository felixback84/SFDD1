// firebase
const { db } = require('../utilities/admin');

//////////////////////////////////////////////////////////////////////////////////////////
// post coords points from app in userDevice geoCoords collection and liveDataSets and many more
exports.postGeoCoordsUserDeviceAppAndStopTelemetryFromThingAndUpdateLiveDataSetsPlus = (req,res)=>{
    // geofire
    const geofire = require('geofire-common');
    // geo data in req body
    let geoData = req.body.geoData
    // thingId
    const userDeviceId = geoData.thingId.split("-").slice(2).toString();
    // counter
    let counterOfGPSPoints = 0
    // db part to save all data in geoCoords
    db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('geoCoords')
        .add({
            createdAt: new Date().toISOString(),
            coords: {
                        longitude: geoData.coords.lon, 
                        latitude: geoData.coords.lat,
                        hash: geofire.geohashForLocation([geoData.coords.lat,geoData.coords.lon]),
                        nameOfPoint: `coordsFromApp-${counterOfGPSPoints++}`
                    }
        })
        .then(async()=>{
            // let it know trouhgt a command send to the thing the disable data publish
            await heartbeatPostToDisablePublishTelemetry(true,geoData.thingId)
            // res of server
            // res.json("disabled command send to thing");
            // update data in liveDataSets on specific field for this to see the user position
            const liveDataSetsData = db
                .doc(`/userDevices/${userDeviceId}`)
                .collection('liveDataSets')
                .doc(geoData.thingId)
            // update in liveDataSets coords field
            liveDataSetsData
                .update({
                    coords: {
                        lat:geoData.coords.lat,
                        lon:geoData.coords.lon,
                        nameOfPoint:geoData.coords.nameOfPoint,
                        hash:geofire.geohashForLocation([geoData.coords.lat,geoData.coords.lon])
                    },
                    createdAt: new Date().toISOString(),
                })
                .then(()=>{
                    // print
                    console.log("Coords update in liveDataSets from UX")
                    // create a method that extract from liveDataSets and return (dataDB) 
                    // the data to the funtion to meassure function
                    return liveDataSetsData
                    .get()
                    .then(async(doc)=>{
                        // var to hold the active state of the device
                        let active = doc.data().active
                        // check if is turn on or turn off
                        if(active == 'true'){
                            // run it meassure GPS coords for the userDevice and all the matches statics
                            let dataDB = {
                                thingId:doc.data().thingId,
                                coords:doc.data().coords,
                                top5Coords:doc.data().top5Coords,
                                searchingMode:doc.data().searchingMode,
                            }
                            // same cycle already achieve for the device
                            //////////////////////////////////////////////////// GPS MEASSURE MODES /////////////////////////////////////////////////////
                            if(dataDB.searchingMode[0] === "modeOne"){
                                // import module
                                const { 
                                    detectGPSCoordsProximityRangeForUserDeviceVsStaticDevices 
                                } = require('./searchingModes/modeOne');
                                // run it meassure GPS coords for the userDevice and all the matches statics
                                await detectGPSCoordsProximityRangeForUserDeviceVsStaticDevices(dataDB); 
                                // print
                                console.log("say hello to my little friend from app modeOne")
                            } else if(dataDB.searchingMode[0] === "modeTwo"){
                                // import module
                                const { 
                                    detectGPSCoordsProximityRangeForUserDeviceVsSpecificStaticDevice 
                                } = require('./userDevices');
                                // run it meassure GPS for a specific static device pick by the user
                                await detectGPSCoordsProximityRangeForUserDeviceVsSpecificStaticDevice(dataDB);
                                // print
                                console.log("say hello to my little friend from app modeTwo")
                            }  
                            // look the timestamp in the collection geoCoords or in leveDataSets and check 
                            // if the time go up some specific ammount of millis
                            // how i can check if a variable don't change in a specific amount of time in js
                            // Set the date we're counting down to 25 secs
                            let countDownDate = new Date().getTime() + 25000; 
                            // print
                            console.log(`countDownDate: ${countDownDate}`)
                            // Update the count down every 1 second
                            let x = setInterval(async()=>{
                                // Get today's date and time
                                let now = new Date().getTime();
                                // Find the distance between now and the count down date
                                let distance = countDownDate - now;
                                // check if countDown fall to zero
                                if(distance < 0){
                                    // print
                                    console.log(`distance: ${distance}`)
                                    // clear interval
                                    clearInterval(x);
                                    // trigger command to thing to reactivate telemetry
                                    await heartbeatPostToEneablePublishTelemetry(false,geoData.thingId)
                                }
                            }, 1000)
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ error: err.code });
                });  
        })
        
}