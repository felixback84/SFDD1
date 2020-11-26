// to get top5Coords for app
exports.heartbeatTop5CoordsData = async (req, res) => {
    const thingId = req.body.thingId
    // userDeviceId 
    const userDeviceId = thingId.split("-").slice(2);
    // nameOfDevice
    const nameOfDevice = thingId.split("-").slice(1,2);
    // print 
    console.log(`nameOfDevice: ${nameOfDevice}`);
    console.log(`userDeviceId: ${userDeviceId}`);
    // to hold user inline
    let dataDB = {};
    // var to hold coors object in an array
    let dataInLiveDataSets = [];
    // list top 5
    let top5Coords = [];
    //db part
    let dbUserInlineDataFromLiveDataSets = db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('liveDataSets')
        .doc(thingId)
        .get()    
        .then((doc)=>{
            dataDB = doc.data()
            console.log(dataDB)
            
        })
        .then(()=>{
            // observer group collection part
            db
            .collectionGroup('liveDataSets')
            //.where('thingId', '!=', thingId) // a cause of the other devices
            .where('nameOfDevice','==','heartbeat')
            .get()
            .then((querySnapshot) => {
                // Do something with these reviews!
                querySnapshot.forEach((doc) => {
                    // push data to array
                    dataInLiveDataSets.push({
                        coords: doc.data().coords,
                        thingId: doc.data().thingId,
                        profileToMatch: doc.data().profileToMatch //////////////////////////////////////////// to check
                    })
                })
                // print
                console.log(`Number of devices with data in db (coordsInLiveDataSets): ${coordsInLiveDataSets.length}`); // quantity of objects
                console.log(`Data result on the devices connected: ${JSON.stringify(coordsInLiveDataSets)}`); // [{...},{...}]
            })
            // meassure gps coords of all the users involve
            .then(()=>{
                // loop the results on the array
                for(let i = 0; i < dataInLiveDataSets.length; i++){
                    // data to pass
                    let argz = {
                        coords:{
                            lon1:dataDB.coords.lon,     
                            lat1:dataDB.coords.lat, 
                            lon2:dataInLiveDataSets[i].coords.lon, 
                            lat2:dataInLiveDataSets[i].coords.lat
                        },
                        profileToMatch: dataInLiveDataSets[i].profileToMatch,
                        thingId:dataInLiveDataSets[i].thingId
                    }
                    // run it
                    checkDistance(argz)
                }
            })
            .then(()=>{
                // res
                res.json(top5Coords)
            })
            .catch((err) => {
                console.error(err);
            }); 
        })
    }

// to measure the distance between users
exports.checkDistance = (args) => {
    // print
    console.log(`args.coords: ${args.coords}`)
    console.log(`args: ${JSON.stringify(args)}`) 

    // logic to make the meassure part
    let R = 6371; // Radius of the earth in km
    let dLat = (args.coords.lat2 - args.coords.lat1) * Math.PI / 180;  // Javascript functions in radians
    let dLon = (args.coords.lon2 - args.coords.lon1) * Math.PI / 180; 
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(args.coords.lat1 * Math.PI / 180) * Math.cos(args.coords.lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; // Distance in km
    let distanceInMeters = d * 100; // Distance in m

    // print
    console.log(`distanceInMeters to each comparasion: ${distanceInMeters}`)

    // make the array with the must close coords 
    if(distanceInMeters <= 25) {
        top5Coords.push({
            thingId: args.thingId, 
            coords: {
                lat2: args.coords.lat2,
                lon2: args.coords.lon2
            },
            profileToMatch: args.profileToMatch,
            meters: distanceInMeters
        }) 
    } 
    // return in meters
    return distanceInMeters
}