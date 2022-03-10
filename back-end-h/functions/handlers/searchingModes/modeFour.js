// firebase
const { admin, db } = require('../../utilities/admin');

// search and mark a specific static devices to posterior meassure
exports.selectProductOfStaticDeviceToSearchByUserDevice = (req,res) => {
    // to deal with arr
    const FieldValue = admin.firestore.FieldValue
    // data from client
    const selectProfileToSearchData = req.body
    // userDeviceId 
    const userDeviceId = selectProfileToSearchData.objSelectProfileToSearch.thingId.split("-").slice(2)
    // obj to update arr
    const newTop5Product = [{
        thingIdToSearch:selectProfileToSearchData.objSelectProfileToSearch.thingIdToSearch,
        top5ProductDocId:selectProfileToSearchData.objSelectProfileToSearch.top5ProductDocId
    }]
    // db part
    let infoInLiveDataSets = db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('liveDataSets')
        .doc(selectProfileToSearchData.objSelectProfileToSearch.thingId)
        
    infoInLiveDataSets
        .update({
            idOfSpecificProduct:FieldValue.arrayUnion(...newTop5Product)
        })
        .then(()=>{
            res.json("staticDevice product Mark")
        }).catch(err => {
            res.status(500, err);
        })
} 

// meassure distance between dynamic user and specifics products
exports.meassureOfMatchToEspecificProduct = async (inWait) => {
    // data from db after message income
    const dataEnter = inWait;
    // print
    console.log(`inWait: ${JSON.stringify(inWait)}`)
    // dp update part
    let userDeviceId = dataEnter.thingId.split("-").slice(2).toString();
    // let userDeviceId = "CarlosTal84-Heartbeat-PT44TQIpPyLJXRBqXZAQ"
    // var to hold mtsBetweenDevices
    let mtsBetweenDevicesAndHisProducts = [];
    // init meassure
    console.log(`staticDevicesCoords: ${dataEnter.staticDevicesCoords}`)
    // func
    async function checkDistance(args){
        console.log(`checking checkDistance to specific statics Vs dynamic`)
        // loop over staics selected to seek
        for(let i = 0; i < args.staticDevicesCoords.length; i++){
            // logic to make the meassure part
            let R = 6371; // Radius of the earth in km
            let dLat = (args.staticDevicesCoords[i].coords.lat - args.coords.lat) * Math.PI / 180;  // Javascript functions in radians
            let dLon = (args.staticDevicesCoords[i].coords.lon - args.coords.lon) * Math.PI / 180; 
            let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(args.staticDevicesCoords[i].coords.lat * Math.PI / 180) * Math.cos(args.coords.lat* Math.PI / 180) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
            let d = R * c; // Distance in km
            let distanceInMeters = d * 1000; // Distance in m
            // print
            console.log(`distanceInMeters to each comparasion: ${distanceInMeters}`);
            // push data to mtsBetweenDevices var
            mtsBetweenDevicesAndHisProducts.push({
                meters:distanceInMeters,
                thingId:args.staticDevicesCoords[i].docId
            })
            // db save mts results part
            const docRef = db
                .doc(`/userDevices/${userDeviceId}`)
                .collection('top5Products')
                .doc(args.staticDevicesCoords[i].docId)
                
            // update meters
            await docRef
                .update({
                    meters:distanceInMeters
                })
                .catch((err) => {
                    console.error(err);
                });
        }    
        // print
        console.log(`Unorder yet mtsBetweenDevices: ${JSON.stringify(mtsBetweenDevices)}`)
        return mtsBetweenDevices
    }
    // import    
    const {
        metersRangeMatchColor,
    } = require('../utilsForThings');
    // run it
    await checkDistance(dataEnter);
    await metersRangeMatchColor(mtsBetweenDevices,dataEnter.thingId);
}






