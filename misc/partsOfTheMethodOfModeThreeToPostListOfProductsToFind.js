// var to hold coords of statics
let resultOfCoords = []
// to hold the order obj
let arrWithCoordsKeysInOrder = []
// var to hold all
let allData = []

// coords of vendors
const toMakelistOfCoords = async () => {
    // arr for promise
    const searchPromises = [];
    // loop
    for(let i = 0; i < listOfProducts.length; i++){
        // staticDeviceId means id of property
        const staticDeviceId = listOfProducts[i].staticDeviceProperty.split("-").slice(2).toString()
        // dp liveDataSets part
        let searchPromise = db
            .doc(`/staticDevices/${staticDeviceId}`)
            .collection('liveDataSets')
            .doc(listOfProducts[i].staticDeviceProperty)
            .get()
            .then((doc)=>{
                // make a list in db with the coincidences like top5Coords
                resultOfCoords.push({
                    coords:doc.data().coords,
                    thingId:doc.data().thingId
                })
            })
            .catch(err => {
                res.status(500, err);
            })
            // push promise list
            searchPromises.push(searchPromise);
    }
    // promise
    Promise
        .all(searchPromises)
        .then(()=>{
            // print
            console.log(`resultOfCoords:${JSON.stringify(resultOfCoords)}`)
            // return raw data from db & map the unorder obj
            return resultOfCoords
        })
        .then(async(data)=>{
            // map the unorder obj
            data.map((resultOfCoord)=>{
                // vars
                let sortedCoordsKeys = {} 
                let keysOfCoords = []
                // loop to extract keys
                for (key in resultOfCoord.coords) {
                    if (resultOfCoord.coords.hasOwnProperty(key)) {
                        keysOfCoords.push(key);
                    }
                }
                // print
                console.log(`sort a:${keysOfCoords.sort()}`)
                // loop to make obj in order
                for (key = 0; key < keysOfCoords.length; key++) {
                    sortedCoordsKeys[keysOfCoords[key]] = resultOfCoord.coords[keysOfCoords[key]];
                }
                // to push the the final list
                arrWithCoordsKeysInOrder.push({
                    coords:sortedCoordsKeys,
                    thingId:resultOfCoord.thingId
                })
                // return sorted obj
                return arrWithCoordsKeysInOrder;
            })
            // print
            console.log(`arrWithCoordsKeysInOrder:${JSON.stringify(arrWithCoordsKeysInOrder)}`)
        })
        .then(()=>{
            //to eliminate duplicates of coords
            const removeDuplicates = async (arr) => {
                // print
                // console.log(`hi from duplicate: ${JSON.stringify(arr)}`)
                // to string
                const jsonObject = arr.map(JSON.stringify);
                // find repeats
                const uniqueSet = new Set(jsonObject);
                // write arr
                const uniqueArray = Array.from(uniqueSet).map(JSON.parse); 
                //print
                console.log(`uniqueArray:${JSON.stringify(uniqueArray)}`)   
                // return arr
                return uniqueArray
            }
            //run it & hold it to remove duplicates in coords
            let listUniqueObjCoords = removeDuplicates(arrWithCoordsKeysInOrder)
            // return result
            return listUniqueObjCoords
        })    
        .then((data)=>{
            // to find equals and create obj with the specific data
            const findEqual = (resultOfCoord) => {
                resultsOfMatchOfProducts.forEach((item) => {
                    if(resultOfCoord.thingId === item.staticDeviceProperty){
                        allData.push({
                            coords:resultOfCoord.coords,
                            products:item,
                            thingId:resultOfCoord.thingId,
                            meters:0
                        })
                        return allData
                    }
                })    
                // print
                console.log(`allData:${JSON.stringify(allData)}`)
            }
            // run find method to establish a relation between the two arrays (coords & products)
            data.find(findEqual)
        }) 
        .then(()=>{
            allData.forEach((item)=>{
                db
                    .doc(`/userDevices/${userDeviceId}`)
                    .collection('top5Productz')
                    .add({
                        ...item
                    })
                    .catch(err => {
                        res.status(500, err);
                    })
            })  
        })
        .catch(err => {
            res.status(500, err);
        })
}
// run it to begin
await toMakelistOfCoords()