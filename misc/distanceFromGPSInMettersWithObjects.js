//sample
// let dataInDBDoc = {
//     thingId: 'lmf20-Heartbeat-x9IyL0KqUH4f6QAmjnIU',
//     coords:{
//         lat: 4.6352991,
//         lon: -74.0705712
//     }
// }

// global for hold base object
let dataInDBDoc = {}
// state
let state = false;
// list top 5
let top5Coord = [];

// rest
const coordsInLiveDataSets = [
    {
        coords:{
            lon: -74.0705712,
            lat: 4.6352991
        },
        thingId: 'Capeto85-Heartbeat-Zhiu9bjYV4WvUl2GjKVE'
    },
    {
        coords:{
            lon: -74.0709387,
            lat: 4.6348353
        },
        thingId: 'CarlosTal84-Heartbeat-PT44TQIpPyLJXRBqXZAQ'
    },
    {
        coords:{
            lon: -74.0709233,
            lat: 4.6348059
        },
        thingId: 'catjPuj-Heartbeat-IoVMbxEtp7iSsfOwzk4l'
    },
    {
        coords:{
            lon: -74.0699704,
            lat: 4.6351481
        },
        thingId: 'Glorita56-Heartbeat-dunSsOb7kCkypz6saf51'
    }
]

// loop fot the base var
// function loopToBaseCoords(){
//     // for(let i = 0; i < coordsInLiveDataSets.length; i++){
//     //     //sample
//     //     dataInDBDoc = {
//     //         thingId: coordsInLiveDataSets[i].thingId,
//     //         coords:{
//     //             lat: coordsInLiveDataSets[i].coords.lat,
//     //             lon: coordsInLiveDataSets[i].coords.lon
//     //         }
//     //     }
//     //     // return data 
//     //     // console.log(dataInDBDoc)
//     // }
//     // // run it
//     // loopToBaseCoords()
//     let i = 0
//     return dataInDBDoc = {
//         thingId: coordsInLiveDataSets[i++].thingId,
//         coords:{
//             lat: coordsInLiveDataSets[i++].coords.lat,
//             lon: coordsInLiveDataSets[i++].coords.lon
//         }
//     }
// } 

// loop the results on the array
for(let i = 0; i < coordsInLiveDataSets.length; i++){
    // run it
    // loopToBaseCoords()
    
    function method(args){
        console.log(`args: ${JSON.stringify(args)}`)
        let R = 6371; // Radius of the earth in km
        let dLat = (args.coords.lat2-args.coords.lat1).toRad();  // Javascript functions in radians
        let dLon = (args.coords.lon2-args.coords.lon1).toRad(); 
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(args.coords.lat1.toRad()) * Math.cos(args.coords.lat2.toRad()) * 
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
    let latUserInLine = coordsInLiveDataSets[Math.floor(Math.random() * coordsInLiveDataSets.length)].coords.lat;
    let lonUserInLine = coordsInLiveDataSets[Math.floor(Math.random() * coordsInLiveDataSets.length)].coords.lon;

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
    method(argz)
    // print result
    // console.log(`top5Coord: ${JSON.stringify(top5Coord)}`);
}

// print result
console.log(`top5CoordLast: ${JSON.stringify(top5Coord)}`);






