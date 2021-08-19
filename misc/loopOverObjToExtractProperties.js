const arrListOfTags = [
    {
        thingIdToSearch:"importantIdiot-staticHeartbeat-zJmAt6u03hXO5aTjD97f",
        top5TagDocId:"BDOk7ZFSzkegRi4YfNnb"
    }, 
    {
        thingIdToSearch:"importantIdiot-staticHeartbeat-zJmAt6u03hXO5aTjD97fffffff",
        top5TagDocId:"BDOk7ZFSzkegRi4YfNnbbbbbb"
    },
]

// loop
// for(let arrListOfTag in arrListOfTags){
        
//     // print
//     console.log(`arrListOfTag.top5TagDocId: ${arrListOfTag.top5TagDocId}`)

// }  

let result = arrListOfTags.map(a => a.thingIdToSearch);
console.log(`arrListOfTag.top5TagDocId: ${result}`)