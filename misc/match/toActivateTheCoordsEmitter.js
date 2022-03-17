// ** To know if its necessary send the new coords obj to the pubSub, in 2 user cases:

/*
1. try to stopped before actually sendend: from webaspp and/or thing. Client to server, 
something like meassure the last one sended Vs the new one. All about metters calculation.
*/

// ...

/*
2. try to stopped before update in DB: this could be every single meassure (coords obj) received for pubsub.
Somenthing like eval the meassure (dynamic Vs static - already) and just after reach the a specific limit, 
actually update the data in DB
*/

// coords of buyers (dynamics)
const coordsDynamicsToEval = [
    {
        coords:{
            lat: 0.1234,
            lon: -74.87389289
        }
    },
    {
        coords:{
            lat: 0.1234,
            lon: -74.87389289
        }
    },
    {
        coords:{
            lat: 0.1234,
            lon: -74.87389289
        }
    },
    {
        coords:{
            lat: 0.1234,
            lon: -74.87389289
        }
    },
    {
        coords:{
            lat: 0.1234,
            lon: -74.87389289
        }
    },
    {
        coords:{
            lat: 0.1234,
            lon: -74.87389289
        }
    },
]

// coords of vendors (statics)
const coordsStaticsToEval = {
    coords:{
        lat: 0.1234,
        lon: -74.87389289
    }
}

const toMeassure = (dynamics,static) =>{
    // loop over changing coords
    for(let i = 0; i < dynamics.length; i++){
        // logic to make the meassure part
        let R = 6371 // Radius of the earth in km
        let dLat = (dynamics[i].coords.lat - static.coords.lat) * Math.PI / 180  // Javascript functions in radian
        let dLon = (dynamics[i].coords.lon - static.coords.lon) * Math.PI / 180 
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(dynamics[i].coords.lat * Math.PI / 180) * Math.cos(static.coords.lat* Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2) 
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) 
        let d = R * c // Distance in km
        let distanceInMeters = d * 1000 // Distance in m
        return distanceInMeters
    }
}

