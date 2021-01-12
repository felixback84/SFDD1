
// to get top5Coords for app
// exports.heartbeatTop5CoordsData = async (req, res) => {
//     db
//         .doc(`/userDevices/${req.params.userDeviceId}`)
//         .collection('topMatches')
//         .get()
//         .then((data) => {
//             let topMatches = [];
//             data.forEach((doc) => {
//                 topMatches.push({
//                     topMatchesId: doc.id,
//                     ...doc.data()
//                 });
//             });
//             return res.json(topMatches);
//         })
//         .catch((err) => console.error(err));   
// }