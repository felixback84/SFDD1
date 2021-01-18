// firebase
const { db } = require('../utilities/admin');

exports.detectGPSCoordsProximityRangeForDynamicsVsStatics = (req,res) => {
    // profile of dynamic
    let objProfileDataOfDynamic = req.body.objProfileDataOfDynamic
    // var to hold coors object in an array of the rest
    let profilesInLiveDataSets = [];
    // hold var
    let arraysToCheck = [];
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
            console.log(`Number of statics with data in db (profilesInLiveDataSets): ${profilesInLiveDataSets.length} & 
                Data result on the statics connected: ${JSON.stringify(profilesInLiveDataSets)}`); 
                // quantity of objects & [{...},{...}
        })
        .then(()=>{
            // underscore
            let _ = require('underscore');
            // loop the results on the array
            for(let i = 0; i < profilesInLiveDataSets.length; i++){
                // var to hold coincidences
                let coincidences = {};
                // func to check the match
                function checkProfilesStaicsVsDynamics(args){
                    // obj to extract key names
                    let keyNames = args.dynamics;
                    // loop
                    for (let key in keyNames) {
                        if (keyNames.hasOwnProperty(key)) {
                            // print
                            console.log(`to compare --> statics: ${args.statics[key]} & dynamic: ${args.dynamics[key]}`)
                            // passing the keys
                            let statics = args.statics[key];
                            let dynamics = args.dynamics[key];
                            // isntersector
                            let intersection = _.intersection(statics, dynamics)
                            // check if is empty
                            if(intersection.length != 0){
                                // pass data to var obj
                                coincidences[key] = intersection;
                                // print
                                console.log(`coincidences: ${JSON.stringify(coincidences)}`)
                            }
                        }
                    }
                    // return data results
                    return coincidences;
                }

                // data to pass 
                let argz = {
                    statics: profilesInLiveDataSets[i].profileToSearch,
                    dynamics: objProfileDataOfDynamic.profileToMatch,
                };
                
                // run it & push it
                let test = checkProfilesStaicsVsDynamics(argz);
                if(Object.entries(test).length !== 0){
                    arraysToCheck.push({
                        initialMatches: test,
                        coords: profilesInLiveDataSets[i].coords,
                        thingId: profilesInLiveDataSets[i].thingId,
                    });
                }
            }
            // print results
            console.log(`arraysToCheck result before empty ones filter --> 
                ${JSON.stringify(arraysToCheck)}`);
        })
        // .then(()=>{
        //     // filter empty objects
        //     for(let i = 0; i < arraysToCheck.length; i++){
        //         const hi = arraysToCheck[i].initialMatches;
        //         const arraysToCheckresult = hi.filter(emptyObj => Object.keys(emptyObj).length !== 0);
        //         // print results
        //         console.log(`arraysToCheckresult after empty ones filter --> 
        //             ${JSON.stringify(arraysToCheckresult)}`);
        //     }
        // })
        // .then(()=>{
        //     // func to save data of top5Coords in liveDataSets of dynamics
        //     function savaDataOfDynamicDeviceOnLiveDataSetsDoc(dataToSave){
        //         // userDeviceId 
        //         const userDeviceId = objProfileDataOfDynamic.thingId.split("-").slice(2);
        //         db
        //             .doc(`/userDevices/${userDeviceId}`)
        //             .collection('liveDataSets')
        //             .doc(objProfileDataOfDynamic.thingId)
        //             .update({ top5Coords: dataToSave })
        //             .then(() => {
        //                 console.log(`final response to the user: ${dataToSave}`);
        //                 return res.json(dataToSave);
        //             })            
        //             .catch((err) => {
        //                 console.error(err);
        //                 res.status(500).json({ error: err.code });
        //             });                
        //     }
        //     // run it
        //     savaDataOfDynamicDeviceOnLiveDataSetsDoc(arraysToCheckresult)
        // })
        .catch((err) => console.error(err));
}


