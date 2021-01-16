// firebase
const { db } = require('../utilities/admin');

exports.detectGPSCoordsProximityRangeForStaticsAndDynamics = (req,res) => {
    // profile of dynamic
    let objProfileDataOfDynamic = req.body.objProfileDataOfDynamic
    // var to hold coors object in an array of the rest
    let profilesInLiveDataSets = [];
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
            // hold var
            let arraysToCheck = [];
            // underscore
            let _ = require('underscore');
            // loop the results on the array
            for(let i = 0; i < profilesInLiveDataSets.length; i++){
                // func to check the match
                function checkProfilesStaicsVsDynamics(args){
                    // obj to extract key names
                    let keyNames = args.dynamics;
                    // var to hold coincidences
                    let coincidences = {};
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
                arraysToCheck.push({
                    initialMatches: checkProfilesStaicsVsDynamics(argz),
                    coords: profilesInLiveDataSets[i].coords,
                    thingId: profilesInLiveDataSets[i].thingId,
                });
            }
            // print results
            console.log(`arraysToCheck result --> ${JSON.stringify(arraysToCheck)}`);
            //[{"initialMatches":{"dcHeros":["Flash"],"fruits":["melon"],"pets":["cat"]}},{"initialMatches":{}},{"initialMatches":{"fruits":["watermelon"]}},{"initialMatches":{"luckyNumbers":[21]}},{"initialMatches":{"pets":["fox"]}},{"initialMatches":{"dcHeros":["Flash"],"pets":["cat"]}},{"initialMatches":{"fruits":["watermelon"],"pets":["cat","fox"]}},{"initialMatches":{"luckyNumbers":[1],"pets":["cat"]}},{"initialMatches":{"dcHeros":["Flash"],"luckyNumbers":[15],"pets":["cat"]}},{"initialMatches":{"dcHeros":["Flash"],"luckyNumbers":[1]}},{"initialMatches":{"luckyNumbers":[1,21]}},{"initialMatches":{"dcHeros":["Flash"],"fruits":["melon"],"pets":["cat"]}},{"initialMatches":{"fruits":["melon"],"luckyNumbers":[21],"pets":["fox"]}},{"initialMatches":{"fruits":["watermelon"]}}]
        })
}


