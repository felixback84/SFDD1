// firebase
const { db } = require('../utilities/admin');

exports.detectGPSCoordsProximityRange = (inWait) => {
    
    // var to hold coors object in an array
    let coordsInLiveDataSets = [];
    // list top 5
    let top5Coord = [];
    // print
    console.log(`inWait.coords: ${inWait.coords}`)
    console.log(`inWait: ${JSON.stringify(inWait)}`)
    
    // coords of the user inline
    let dataInDBDoc = {
        thingId: inWait.thingId,
        coords:{
            lat: inWait.coords.lat,
            lon: inWait.coords.lon
        }
    }
    // print
    console.log(`coords.lat: ${dataInDBDoc.coords.lat}, coords.thingId: ${dataInDBDoc.thingId}`); 
    //////////////////////////////////////////////////////////////// extract data from the rest of users
    // observer group collection part
    db
        .collectionGroup('liveDataSets')
        //.where('thingId', '!=', thingId)
        .where('deviceId','==','heartbeat')
        .get()
        .then((querySnapshot) => {
            // Do something with these reviews!
            querySnapshot.forEach((doc) => {
                // push data to array
                coordsInLiveDataSets.push({
                    coords: doc.data().coords,
                    thingId: doc.data().thingId
                })
            })
            // print
            console.log(`coordsInLiveDataSets: ${coordsInLiveDataSets.length}`); // quantity of objects
            console.log(JSON.stringify(coordsInLiveDataSets)); // [{...},{...}]
        })
        .then(()=>{
            // meassure gps coords of all the users involve
            // loop the results on the array
            for(let i = 0; i < coordsInLiveDataSets.length; i++){
                function checkDistance(args){
                    // print
                    console.log(`args.coords: ${args.coords}`)
                    console.log(`args: ${JSON.stringify(args)}`) ///////////--------------> hasta aca

                    // logic to make the meassure part
                    let R = 6371; // Radius of the earth in km
                    // let dLat = (args.coords.lat2 - args.coords.lat1).toRad();  // Javascript functions in radians
                    // let dLon = (args.coords.lon2 - args.coords.lon1).toRad(); 
                    let dLat = (args.coords.lat2 - args.coords.lat1) * Math.PI / 180;  // Javascript functions in radians
                    let dLon = (args.coords.lon2 - args.coords.lon1) * Math.PI / 180; 
                    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos(args.coords.lat1 * Math.PI / 180) * Math.cos(args.coords.lat2 * Math.PI / 180) * 
                        Math.sin(dLon/2) * Math.sin(dLon/2); 
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                    let d = R * c; // Distance in km
                    let distanceInMeters = d * 100; // Distance in m

                    // print
                    console.log(`distanceInMeters: ${distanceInMeters}`)

                    // make the array with the must close coords
                    if(distanceInMeters <= 5) {
                        top5Coord.push({
                            thingId: args.thingId, 
                            coords: args.coords,
                            meters: distanceInMeters
                        })
                        
                    } else if(distanceInMeters <= 10) {
                        top5Coord.push({
                            thingId: args.thingId, 
                            coords: args.coords,
                            meters: distanceInMeters
                        })
                        
                    } else if(distanceInMeters <= 15) {
                        top5Coord.push({
                            thingId: args.thingId, 
                            coords: args.coords,
                            meters: distanceInMeters
                        })
                        
                    } else if(distanceInMeters <= 20) {
                        top5Coord.push({
                            thingId: args.thingId, 
                            coords: args.coords,
                            meters: distanceInMeters
                        })
                    
                    } else if(distanceInMeters <= 25) {
                        top5Coord.push({
                            thingId: args.thingId, 
                            coords: args.coords,
                            meters: distanceInMeters
                        })
                        
                    }
                }

                // Converts numeric degrees to radians */
                if (typeof(Number.prototype.toRad) === "undefined") {
                        Number.prototype.toRad = function() {
                        return this * Math.PI / 180;
                    }
                } 
                
                // vars the user in line data
                // let latUserInLine = coordsInLiveDataSets[Math.floor(Math.random() * coordsInLiveDataSets.length)].coords.lat;
                // let lonUserInLine = coordsInLiveDataSets[Math.floor(Math.random() * coordsInLiveDataSets.length)].coords.lon;
                let latUserInLine = dataInDBDoc.coords.lat;
                let lonUserInLine = dataInDBDoc.coords.lon;

                // user whait for answer
                let latArrayCoordsInDB = coordsInLiveDataSets[i].coords.lat;
                let lonArrayCoordsInDB = coordsInLiveDataSets[i].coords.lon;
                let thingIdCloseUser = coordsInLiveDataSets[i].thingId;

                // data to pass
                let argz = {
                    coords:{
                        lon1:lonUserInLine,     
                        lat1:latUserInLine, 
                        lon2:lonArrayCoordsInDB, 
                        lat2:latArrayCoordsInDB
                    },
                    thingId:thingIdCloseUser
                }
                // run it
                checkDistance(argz)
            }
            // print result
            console.log(`top5CoordLast: ${JSON.stringify(top5Coord)}`);
        })
        .catch((err) => {
            console.error(err);
        });     
}

