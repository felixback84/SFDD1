// firebase
const { db } = require('../utilities/admin')
//_
const { forEach } = require('underscore');

// get a specific top5Tag
exports.getTop5TagFromUserDevice = (req,res) => {
    // userDeviceId
    const userDeviceId = req.params.userDeviceId
    // doc id
    const top5TagId = req.params.top5tagId
    console.log({userDeviceId},{top5TagId})

    // db part
    const docRef = db
    .doc(`/userDevices/${userDeviceId}`) 
    .collection('top5Tags')
    .doc(top5TagId)
    .get()
    .then((doc)=>{
        const data = {...doc.data(), top5TagId:doc.id}
        console.log(`res top5TagId:${JSON.stringify(data.top5TagId)}`)
        res.json(data)
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
    });

    // func
    // const getTop5Tag = async ({...dataIds},res) => {
    //     console.log(JSON.stringify(dataIds))
    //     let data = {}
        

    //     console.log(`docRef:${JSON.stringify(docRef)}`)    

    //     // // data result
    //     // const docu = await docRef.get()
    //     // // check
    //     // if(docu.exists){
    //     //     data = await docu.data().text
    //     //     // print
    //     //     console.log({data})
    //     //     return data
    //     // }
    //     // res
    //     res.json(data)
    // }   
    
    // // run it & catch it
    // try {
    //     await getTop5Tag({userDeviceId,top5TagId},res)
    // } catch (err) {
    //     console.log('Error getting documents', err)
    // }
}



