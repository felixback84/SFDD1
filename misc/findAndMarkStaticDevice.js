// search and marck a specific static devices to posterior meassure
// exports.selectStaticDeviceToSearchByUserDevice = (req,res) => {
//     const dataToSelectProfileToSearch = req.body.thingId;
//     // userDeviceId 
//     const userDeviceId = dataToSelectProfileToSearch.thingId.split("-").slice(2);
//     // db part
//     db
//         .doc(`/userDevices/${userDeviceId}`)
//         .collection('liveDataSets')
//         .doc(dataToSelectProfileToSearch.thingId)
//         .update({
//             top5Coords: firebase.firestore.FieldValue.arrayUnion(dataToSelectProfileToSearch.thingIdToSearch)
//         })
//         .then(() => {
//             console.log(`dataToSelectProfileToSearch: ${dataToSelectProfileToSearch}`)
//             // res
//             return res.json(dataToSelectProfileToSearch);
//         })            
//         .catch((err) => {
//             console.error(err);
//             res.status(500).json({ error: err.code });
//         }); 
// }