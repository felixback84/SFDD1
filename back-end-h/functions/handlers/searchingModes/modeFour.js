// firebase
const { db } = require('../../utilities/admin');

// search and mark a specific static devices to posterior meassure
exports.selectProductOfStaticDeviceToSearchByUserDevice = (req,res) => {
    const selectProfileToSearchData = req.body;
    // userDeviceId 
    const userDeviceId = selectProfileToSearchData.objSelectProfileToSearch.thingId.split("-").slice(2);
    // db part
    let infoInLiveDataSets = db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('liveDataSets')
        .doc(selectProfileToSearchData.objSelectProfileToSearch.thingId)
        
    infoInLiveDataSets
        .update({
            idOfSpecificProduct: selectProfileToSearchData.objSelectProfileToSearch.thingIdToSearch
        })
        .then(()=>{
            res.json("staticDevice porduct Mark")
        }).catch(err => {
            res.status(500, err);
        })
}

// meassure distance between dynamic user and specific product
exports.meassureOfMatchToEspecificProduct = async (inWait) => {
    // dp update part
    let userDeviceId = inWait.thingId.split("-").slice(2).toString();
    // var to hold mtsBetweenDevices
    let mtsBetweenUserDevicesAndProduct = [];
    // data from db after message income
    const dataEnter = inWait;
    // pick the last item in the arr
    const id = dataEnter.idOfSpecificUserDevice
    // init meassure
    console.log(`id of array to find - id:${id}`)
    async function checkDistance(args){
        console.log(`checking checkDistance to specific product`)
        // logic to make the meassure part
        let R = 6371; // Radius of the earth in km
        let dLat = (args.staticDevice.coords.lat - args.userDevice.coords.lat) * Math.PI / 180;  // Javascript functions in radians
        let dLon = (args.staticDevice.coords.lon - args.userDevice.coords.lon) * Math.PI / 180; 
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(args.staticDevice.coords.lat * Math.PI / 180) * Math.cos(args.userDevice.coords.lat* Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        let d = R * c; // Distance in km
        let distanceInMeters = d * 1000; // Distance in m
        // print
        console.log(`distanceInMeters to each comparasion: ${distanceInMeters}`);
        // run it
        // push data to mtsBetweenDevices var
        mtsBetweenUserDevicesAndProduct.push({
            meters: distanceInMeters
        })
        
        // db save mts results part
        const docRef = db
            .doc(`/userDevices/${userDeviceId}`)
            .collection('top5Products')
            .doc(inWait.docId)
        // update meters
        await docRef
            .update({
                meters:distanceInMeters
            })
            .catch(err => {
                res.status(500, err);
            })
    }

    // args to pass it
    const argz = {
        userDevice:{
            coords:inWait.coords
        },
        staticDevice:{
            coords:inWait.staticDeviceCoords
        }
    }
    // run it
    await checkDistance(argz);
    await metersRangeMatch(mtsBetweenDevices,dataEnter.thingId);
}