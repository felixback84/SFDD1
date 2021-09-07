// firebase
const { db } = require('../utilities/admin');
// thing commands
const { 
    sendCommandGPSColor,   
} = require('./forThingsHeartbeats');

// color and motor in db
const colorAndMotorInDb = async (thingId,data) => {
    // userDeviceId
    let userDeviceId = thingId.split("-").slice(2).toString();
    // print
    console.log(`color db func data: ${thingId} - ${data}`)
    // db save mts results part
    db
        .doc(`/userDevices/${userDeviceId}`)
        .collection('liveDataSets')
        .doc(thingId)
        .update({
            colorValue:data.colorValue,
            motorSpeed: data.motorSpeed
        })
        .catch(err => {
            res.status(500, err);
        })
}

// to pick wich color message send to the device
exports.metersRangeMatchColor = async (metersArr,thingId) => {
    // sort arr asc
    let arrSort = metersArr.sort((a, b) => {
        return a.meters - b.meters;
    });
    // print
    console.log(`Order now mtsBetweenDevices: ${JSON.stringify(arrSort)}`)
    // loop
    for(let i = 0; i < arrSort.length; i++){
        // check ranges
        if(arrSort[i].meters >= 0 && arrSort[i].meters <= 5){
            let colorAndMotorValuesToThingResponse = {
                colorValue:{r:76,g:175,b:80}, 
                colorName:"green", 
                motorSpeed: 100
            }
            console.log("hi from meters range match: 0-5");
            // color & motor in db
            await colorAndMotorInDb(thingId,colorAndMotorValuesToThingResponse);
            // command to thing
            await sendCommandGPSColor(colorAndMotorValuesToThingResponse,thingId);
            return
        } else if (arrSort[i].meters >= 5.1 && arrSort[i].meters <= 10){
            let colorAndMotorValuesToThingResponse = {
                colorValue:{r:255,g:235,b:59}, 
                colorName:"yellow", 
                motorSpeed: 75
            }
            console.log("hi from meters range match: 5-10");
            // color & motor in db
            await colorAndMotorInDb(thingId,colorAndMotorValuesToThingResponse);
            // command to thing
            sendCommandGPSColor(colorAndMotorValuesToThingResponse,thingId);
            return
        } else if (arrSort[i].meters >= 10.1 && arrSort[i].meters <= 15){
            let colorAndMotorValuesToThingResponse = {
                colorValue:{r:244,g:67,b:54}, 
                colorName:"red", 
                motorSpeed: 50
            }
            console.log("hi from meters range match: 10-15");
            // color & motor in db
            await colorAndMotorInDb(thingId,colorAndMotorValuesToThingResponse);
            // command to thing
            sendCommandGPSColor(colorAndMotorValuesToThingResponse,thingId);
            return
        } else if (arrSort[i].meters >= 15.1 && arrSort[i].meters <= 20){
            let colorAndMotorValuesToThingResponse = {
                colorValue:{r:233,g:30,b:99}, 
                colorName:"fucsia", 
                motorSpeed: 25
            }
            console.log("hi from meters range match: 15-20");
            // color & motor in db
            await colorAndMotorInDb(thingId,colorAndMotorValuesToThingResponse);
            // command to thing
            sendCommandGPSColor(colorAndMotorValuesToThingResponse,thingId);
            return
        } else if (arrSort[i].meters >= 20.1 && arrSort[i].meters <= 25){
            let colorAndMotorValuesToThingResponse = {
                colorValue:{r:33,g:150,b:243}, 
                colorName:"blue", 
                motorSpeed: 5
            }
            console.log("hi from meters range match: 20-25");
            // color & motor in db
            await colorAndMotorInDb(thingId,colorAndMotorValuesToThingResponse);
            // command to thing
            sendCommandGPSColor(colorAndMotorValuesToThingResponse,thingId);
            return
        }  
    }
}

// to make the object that pass through the meassure function
exports.objFromDBToMeassureProcess = async (mode,doc,userDeviceId) => {
    if(mode === "modeOne"){
        // to selected and match with tags             
        // list with statics
        let top5Coords = []
        // db part
        const tagsRef = db
            .doc(`/userDevices/${userDeviceId}`)
            .collection('top5Tags')

        const snapshot = await tagsRef.get();

        snapshot.forEach(doc => {
            // push data in arr
            top5Coords.push({
                docId: doc.id,
                ...doc.data(),
            })
        });
        
        return {
            // userDevice data
            thingId:doc.thingId,
            coords:doc.coords,
            // arr
            top5Coords:top5Coords,
        }

    } else if(mode === "modeTwo"){
        // to specifics staticDevice (vendors)
        // var to count items 
        let itemsPass = 0
        // var to hold the list
        let selectedStaticDevicesToSeek = []
        // loop 
        for (let i = 0, len = doc.idOfSpecificStaticDevices.length; i < len; i++) {
            // print
            console.log(`idOfSpecificStaticDevices:${doc.idOfSpecificStaticDevices[i].thingIdToSearch}`)
            // db part
            const ref = await db
                .doc(`/userDevices/${userDeviceId}`)
                .collection('top5Tags')
                .where('thingId','==', doc.idOfSpecificStaticDevices[i].thingIdToSearch)
                .get()
            // lopp to extract data    
            for (const doc of ref.docs) {
                selectedStaticDevicesToSeek.push({
                    coords:doc.data().coords,
                    docId:doc.id
                })
                // print
                console.log(`coords middleware: ${JSON.stringify(selectedStaticDevicesToSeek)}`)
            }
            // counter increment
            itemsPass++
            // checker
            if(doc.idOfSpecificStaticDevices.length === itemsPass){
                return{
                    // userDevice data
                    thingId:doc.thingId,
                    coords:doc.coords,
                    // statics data
                    staticDevicesCoords:selectedStaticDevicesToSeek,
                } 
            }
        }

    } else if(mode === "modeThree"){
        // to selected products
        // list with statics
        let top5Products = []
        // db part
        const tagsRef = db
            .doc(`/userDevices/${userDeviceId}`)
            .collection('top5Products')

        const snapshot = await tagsRef.get();

        snapshot.forEach(doc => {
            // push data in arr
            top5Products.push({
                docId: doc.id,
                ...doc.data(),
            })
        });

        return {
            thingId:doc.thingId,
            coords:doc.coords,
            // arr
            top5Products:top5Products,
        }

    } else if(mode === "modeFour"){
        // to specific product
        // db part
        const tagsRef = db
            .doc(`/userDevices/${userDeviceId}`)
            .collection('top5Products')
            .doc(doc.idOfSpecificStaticDevice)
            .get('coords')

        return {
            thingId:doc.thingId,
            coords:doc.coords,
            docId:doc.idOfSpecificProduct,
            staticDeviceCoords:tagsRef,
        }

    } else if(mode === "modeFive"){
        // to selected and match with tags             
        // list with statics
        let top5Coords = []
        // db part
        const tagsRef = db
            .doc(`/userDevices/${userDeviceId}`)
            .collection('top5Tags')

        const snapshot = await tagsRef.get();

        // top5Coords became top5Tags
        snapshot.forEach(doc => {
            // push data in arr
            top5Coords.push({
                docId: doc.id,
                ...doc.data(),
            })
        });
        
        return {
            // userDevice data
            thingId:doc.thingId,
            coords:doc.coords,
            // arr
            top5Coords,
        }
    }
}

// to delete collections to start in a blank collection 
exports.deleteAllDocsInTop5TagsCollectionOfUserDeviceId = async (db,pathToCollection) => {

    // data to pass
    let dbConnect = db
    let path = pathToCollection
    
    // to set the process of docs deletion
    async function deleteCollection(db, collectionPath) {
        // collection path
        const collectionRef = db.collection(collectionPath);
        // query ref
        const query = collectionRef
        
        // promise of deletion process
        return new Promise((resolve, reject) => {
            deleteQueryBatch(db, query, resolve).catch(reject);
        });
    }
    
    // to erase doc of the collection
    async function deleteQueryBatch(db, query, resolve) {
        // extract data
        const snapshot = await query.get();
        // length data
        const batchSize = snapshot.size;
        // check if is empty
        if (batchSize === 0) {
            // When there are no documents left, we are done
            resolve();
            return;
        }
        // Delete documents in a batch
        const batch = db.batch();
        // one by one delete
        snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });
        // finish
        await batch.commit();
        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
            deleteQueryBatch(db, query, resolve);
        });
    }

    // run it
    deleteCollection(dbConnect,path)
}

// to divide values and get the closer to zero - find the quality of match
exports.findMatchValueQuality = async (a,b) => {
    // val default  
    // let resultRaw = 0
    // listOne.forEach((item,i)=>{
        //const divider = (a,b) => {
            let resultRaw = a / b
            let resultRounded = Math.round(resultRaw)
        //}
        // divider(item,listTwo[i])
        // print
        console.log(`raw:${resultRaw} - rounded:${resultRounded}`)
        
        // the match could be the number closer to zero
        switch(resultRounded){
            case 1:
                console.log(`one - green:${resultRounded}`)
                return(
                    {r:76,g:175,b:80}
                )
                break
            case 2:
                console.log(`two - yellow:${resultRounded}`)
                return(
                    {r:255,g:235,b:59}
                )
                break
            case 3:
                console.log(`three - red:${resultRounded}`)
                return(
                    {r:244,g:67,b:54}
                )
                break  
            case 4:
                console.log(`four - fucsia:${resultRounded}`)
                return(
                    {r:233,g:30,b:99}
                )
                break
            case 5:
                console.log(`five - blue:${resultRounded}`)
                return(
                    {r:33,g:150,b:243}
                )
                break
            default:    
                console.log("none value")  
                return(
                    "none value"
                )
        }
    //})
}

