// firebase
const { db } = require('../utilities/admin');

exports.detectGPSCoordsProximityRangeForStaticsAndDynamics = (req,res) => {
    // profile of dynamic
    let objProfileDataOfDynamic = req.body.objProfileDataOfDynamic
    // var to hold coors object in an array of the rest
    let profilesInLiveDataSets = [];
    // var to hold the results of the intersections
    let dataWithMatches = [];
    // db part
    db  
        .collectionGroup('liveDataSets')
        .where('nameOfDevice','==','staticHeartbeat')
        .get()
        .then((querySnapshot) => { 
            // Do something with these reviews!
            querySnapshot.forEach((doc) => {
                // push data to an array
                profilesInLiveDataSets.push({
                    coords: doc.data().coords,
                    thingId: doc.data().thingId,
                    profileToSearch: doc.data().profileToSearch //////////////////////////////////////////// to check
                })
            })
            // print
            console.log(`Number of statics with data in db (profilesInLiveDataSets): ${profilesInLiveDataSets.length}`); // quantity of objects
            console.log(`Data result on the statics connected: ${JSON.stringify(profilesInLiveDataSets)}`); // [{...},{...}
        })
        .then(()=>{
            // loop the results on the array
            for(let i = 0; i < profilesInLiveDataSets.length; i++){
                let arraysToCheck = [];
                // func to check the match
                function checkProfilesStaicsVsDynamics(args){
                    // underscore
                    let _ = require('underscore');
                    // obj to extract key names
                    let keyNames = args.dynamics;
                    // iterate over the user object
                    for (const key in keyNames) {
                        if (keyNames.hasOwnProperty(key)) {
                            // print
                            console.log(`key names: ${key}`);
                            // print
                            console.log(`statics: ${args.statics[key]} - dynamic: ${args.dynamics[key]}`)
                            // pass the key
                            let statics = args.statics[key]; 
                            let dynamics = args.dynamics[key]; 
                            // isntersector
                            arraysToCheck = _.intersection(
                                statics, dynamics
                            );
                            // print
                            console.log(`arraysToCheck -> ${key}: ${arraysToCheck}`)
                        }
                    }   
                    return arraysToCheck
                }
                // push the results 
                function saveObj(){
                    if(arraysToCheck.length != 0){
                        dataWithMatches.push({
                            thingId: args.thingId,
                            coords: args.coords,
                            arraysToCheck: arraysToCheck
                        })
                    }
                }
                // pass the rest of the data
                // dataWithMatches = profilesInLiveDataSets.coords;
                // dataWithMatches = profilesInLiveDataSets.thingId;
                // dataWithMatches = profilesInLiveDataSets.profileToMatch;
                // data to pass 
                let argz = {
                    statics: profilesInLiveDataSets[i].profileToSearch,
                    thingId: profilesInLiveDataSets[i].thingId,
                    coords: profilesInLiveDataSets[i].coords,
                    dynamics: objProfileDataOfDynamic.profileToMatch
                };
                // run it
                checkProfilesStaicsVsDynamics(argz);
                
                // // func to save data of top5Coords
                // function savaData(dataToSave){
                //     // userDeviceId 
                //     const staticDeviceId = objProfileDataOfDynamic.thingId.split("-").slice(2);
                //     db
                //         .doc(`/userDevices/${staticDeviceId}`)
                //         .collection('liveDataSets')
                //         .doc(objProfileDataOfDynamic.thingId)
                //         .update({ top5Coords: dataToSave })
                //         .then(() => {
                //             // print
                //             console.log(dataToSave);
                //         })            
                //         .catch((err) => {
                //             console.error(err);
                //             res.status(500).json({ error: err.code });
                //         });                
                // }
                // // run it
            }
            // savaData(dataWithMatches);
            // res
            // return res.json(dataWithMatches);
            console.log(`dataWithMatches --> ${JSON.stringify(dataWithMatches)}`);
        })
}


