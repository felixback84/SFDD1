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
exports.objFromDBToMeassureProcess = async (mode,doc) => {
    if(mode === "modeOne"){
        return {
            thingId:doc.thingId,
            coords:doc.coords,
            top5Coords:doc.top5Coords,
        }
    } else if(mode === "modeTwo"){
        return {
            thingId:doc.thingId,
            coords:doc.coords,
            top5Coords:doc.top5Coords,
        }
    } else if(mode === "modeThree"){
        return {
            thingId:doc.thingId,
            coords:doc.coords,
            top5Products:doc.top5Products,
        }
    }
}

