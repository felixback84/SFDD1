class MatchingHeartbeats{
    
    // constructor
    constructor() {
        // this.heartbeatInline = objInline;
        // this.otherHeartbeatsToCompare = arrayOfObj;
        // to hold returns
        this.top5Coords = []
        this.coordsInLiveDataSets = {}
        // vars to hold counters of matches in the specific gps range 
        this.counterGreen5Mts = 0;
        this.counterYellow10Mts = 0;
        this.counterRed15Mts = 0;
        this.counterFucsia20Mts = 0; 
        this.counterBlue25Mts = 0;
        // qualify match
        this.evaluationOfMatch = 0;
        // vars to count coincidence
        this.fullMatch = 0;
        this.midMatch = 0;
        this.bottomMatch = 0;
        this.noneMatch = 0;
    }

    // to meassure distance
    checkDistance(args){
        // print
        console.log(`args.coords: ${args.coords}`)
        console.log(`args: ${JSON.stringify(args)}`) 

        // logic to make the meassure part
        let R = 6371; // Radius of the earth in km
        let dLat = (args.coords.lat2 - args.coords.lat1) * Math.PI / 180;  // Javascript functions in radians
        let dLon = (args.coords.lon2 - args.coords.lon1) * Math.PI / 180; 
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(args.coords.lat1 * Math.PI / 180) * Math.cos(args.coords.lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        let d = R * c; // Distance in km
        let distanceInMeters = d * 100; // Distance in m

        // print
        console.log(`distanceInMeters to each comparasion: ${distanceInMeters}`)

        // make the array with the must close coords 
        if(distanceInMeters <= 25) {
            this.top5Coords.push({
                thingId: args.thingId, 
                coords: {
                    lat2: args.coords.lat2,
                    lon2: args.coords.lon2
                },
                profileToMatch: args.profileToMatch,
                meters: distanceInMeters
            }) 
        } 
        // return in meters
        return distanceInMeters
    }

    // to count user/devices/things in the range
    metersRangeCounter(meters){
        if(meters >= 0 && meters <= 5){
            counterGreen5Mts++
            console.log(`counterGreen5Mts: ${counterGreen5Mts}`)
        } else if (meters >= 5.1 && meters <= 10){
            counterYellow10Mts++
            console.log(`counterYellow10Mts: ${counterYellow10Mts}`)
        } else if (meters >= 10.1 && meters <= 15){
            counterRed15Mts++
            console.log(`counterRed15Mts: ${counterRed15Mts}`)
        } else if (meters >= 15.1 && meters <= 20){
            counterFucsia20Mts++
            console.log(`counterFucsia20Mts: ${counterFucsia20Mts}`)
        } else if (meters >= 20.1 && meters <= 25){
            counterBlue25Mts++
            console.log(`counterBlue25Mts: ${counterBlue25Mts}`)
        }    
    }

    // to eval the match in the selec ones of proximity
    toCompareProfileToMatch(labels){
        // vars to receive data
        const labelsToFind = labels.labelsToFind;
        const labelsToCheck = labels.labelsToCheck;
        
        // check a full coincidence first
        // 1-1-1
        if(labelsToFind == labelsToCheck){
            evaluationOfMatch += 3
            fullMatch++
        // 0 - 1 - 1    
        } else if(
            labelsToFind.luckyNumber != labelsToCheck.luckyNumber && 
            labelsToFind.dcHero == labelsToCheck.dcHero &&
            labelsToFind.cat == labelsToCheck.cat){
                evaluationOfMatch += 2
                midMatch++
        // 1 - 0 - 1 
        } else if(
            labelsToFind.luckyNumber == labelsToCheck.luckyNumber && 
            labelsToFind.dcHero != labelsToCheck.dcHero &&
            labelsToFind.cat == labelsToCheck.cat){
                evaluationOfMatch += 2
                midMatch++
        // 1 - 1 - 0         
        } else if(
            labelsToFind.luckyNumber == labelsToCheck.luckyNumber && 
            labelsToFind.dcHero == labelsToCheck.dcHero &&
            labelsToFind.cat != labelsToCheck.cat){
                evaluationOfMatch += 2
                midMatch++
        // 0 - 0 - 1    
        } else if(
            labelsToFind.luckyNumber != labelsToCheck.luckyNumber && 
            labelsToFind.dcHero != labelsToCheck.dcHero &&
            labelsToFind.cat == labelsToCheck.cat){
                evaluationOfMatch += 1
                bottomMatch++
        // 0 - 1 - 0     
        } else if(
            labelsToFind.luckyNumber != labelsToCheck.luckyNumber && 
            labelsToFind.dcHero == labelsToCheck.dcHero &&
            labelsToFind.cat != labelsToCheck.cat){
                evaluationOfMatch += 1
                bottomMatch++
        // 1 - 0 - 0         
        } else if(
            labelsToFind.luckyNumber == labelsToCheck.luckyNumber && 
            labelsToFind.dcHero != labelsToCheck.dcHero &&
            labelsToFind.cat != labelsToCheck.cat){
                evaluationOfMatch += 1
                bottomMatch++
        // 0 - 0 - 0        
        } else if(
            labelsToFind.luckyNumber != labelsToCheck.luckyNumber && 
            labelsToFind.dcHero != labelsToCheck.dcHero &&
            labelsToFind.cat != labelsToCheck.cat){
                evaluationOfMatch = 0
                noneMatch++
        }
    }

    // to send message
    async sendCommandGPSColor(colorObj){
        // global vars
        const cloudRegion = 'us-central1';
        const deviceId = dataInDBDoc.thingId;
        const string = JSON.stringify(colorObj);
        const commandMessage = string;
        const projectId = 'sfdd-d8a16';
        const registryId = 'Heartbeat';
        // lib iot core
        const iot = require('@google-cloud/iot');
        // client
        const iotClient = new iot.v1.DeviceManagerClient({
        // optional auth parameters.
        });
        // client and path of device
        const formattedName = iotClient.devicePath(
            projectId,
            cloudRegion,
            registryId,
            deviceId
        );
        // message data
        const binaryData = Buffer.from(commandMessage);
        // request
        const request = {
            name: formattedName,
            binaryData: binaryData,
        };

        try {
            const responses = await iotClient.sendCommandToDevice(request);
            console.log('Sent command: ', responses[0]);
            //res.json(responses[0])
        } catch (err) {
            console.error('Could not send command:', err);
            //res.json(err)
        }
    }

    // color to send to device
    colorPicker(){
        //x >= 0.001 && x <= 0.009
        if(countersObj.counterGreen5Mts >= 1){
            let colorToThingResponse = {
                colorValue:{r:1,g:2,b:3}, 
                colorName:"green", 
                profileMatchQualify: evaluationOfMatch
            }
            // command to thing -------------------> enviar solo cuando se haya recorrido las lista top5Coords
            sendCommandGPSColor(colorToThingResponse)
        } else if (countersObj.counterYellow10Mts >= 1){
            let colorToThingResponse = {
                colorValue:{r:4,g:5,b:6}, 
                colorName:"yellow", 
                profileMatchQualify: evaluationOfMatch
            }
            // command to thing
            sendCommandGPSColor(colorToThingResponse)
        } else if (countersObj.counterRed15Mts >= 1){
            let colorToThingResponse = {
                colorValue:{r:7,g:8,b:9}, 
                colorName:"red", 
                profileMatchQualify: evaluationOfMatch
            }
            // command to thing
            sendCommandGPSColor(colorToThingResponse)
        } else if (countersObj.counterFucsia20Mts >= 1){
            let colorToThingResponse = {
                colorValue:{r:10,g:11,b:12}, 
                colorName:"fucsia", 
                profileMatchQualify:  
                evaluationOfMatch
            }
            // command to thing
            sendCommandGPSColor(colorToThingResponse)
        } else if (countersObj.counterBlue25Mts >= 1){
            let colorToThingResponse = {
                colorValue:{r:13,g:14,b:15}, 
                colorName:"blue", 
                profileMatchQualify: evaluationOfMatch
            }
            // command to thing
            sendCommandGPSColor(colorToThingResponse)
        }
    }
        
}