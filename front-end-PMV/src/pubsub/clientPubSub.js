//global vars
let lat, lon
// get coords from client navigator 
const getCoordsFromNavigator = () => {
    // eval there is geolocation in browser
    if('geolocation' in navigator){
        console.log('geolocation available')
        // get coords form navigator
        navigator.geolocation.getCurrentPosition(async position => {
            try{
                lat = position.coords.latitude
                lon = position.coords.longitude
            } catch(error){
                console.error(error)
            }
            //post data in database
            const data = { lat, lon }
            return data
        })
    } else {
        console.log('geolocation not available')
    }
}

// meassure of changes of coords between the last sended and the new one
const toMeassure = (newOne,OldOne) =>{
    // logic to make the meassure part
    let R = 6371 // radius of the earth in km
    let dLat = (newOne.coords.lat - OldOne.coords.lat) * Math.PI / 180  // js functions in radian
    let dLon = (newOne.coords.lon - OldOne.coords.lon) * Math.PI / 180 
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(newOne.coords.lat * Math.PI / 180) * Math.cos(OldOne.coords.lat* Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2) 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    // distance in km 
    let d = R * c 
    // distance in m
    let distanceInMeters = d * 1000 
    return distanceInMeters
}

// distance thresshold to send coords data
const toSendDataCoordsToPubSub = () => {
    // more than 10 mts, so send the message
    if(toMeassure(getCoordsFromNavigator().data,) >= 10){
        // pubsub set part
    }
}

// messages sender
setInterval(toSendDataCoordsToPubSub(),5000)