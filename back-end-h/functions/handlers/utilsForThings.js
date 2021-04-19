// firebase
const { db } = require('../utilities/admin');
// thing commands
const { 
    sendCommandGPSColor,   
} = require('./forThingsHeartbeats');
const { forEach } = require('underscore');

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
            thingId:doc.thingId,
            coords:doc.coords,
            // arr
            top5Coords:top5Coords,
        }

    } else if(mode === "modeTwo"){
        // to specific staticDevice (vendors)
        // db part
        const tagsRef = db
            .doc(`/userDevices/${userDeviceId}`)
            .collection('top5Tags')
            .doc(doc.idOfSpecificStaticDevice)
            .get('coords')

        return {
            thingId:doc.thingId,
            coords:doc.coords,
            docId:doc.idOfSpecificStaticDevice,
            staticDeviceCoords:tagsRef,
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
    }
}

