// import { take, call, fork, all } from 'redux-saga/effects';
// import { put } from 'redux-saga/effects';
// import { eventChannel } from 'redux-saga';
// // import redux actions
// // import { rexSagaReduces } from '../../redux/actions/userDevicesActions'
// // import { rexSagaReducesOne } from '../../redux/actions/heartbeatUIActions'

// // firebase client libs
// import firebase from '../../fb/utilities/firebase'; 

// // to listen top5Tags data changes
// function createEventChannel() {
//     // listener
//     const listenerChannel = eventChannel(
//         (emmiter) => {
//             // ref db
//             const dataRef = firebase
//                 .firestore()
//                 .doc(`/userDevices/"PT44TQIpPyLJXRBqXZAQ"`) 
//                 .collection('top5Tags')
//                 .orderBy('meters', 'asc')
//                 .get()

//             // db observer
//             const observer = dataRef
//                 .onSnapshot({ includeMetadataChanges: true }, 
//                     (snapshot) => {
//                         const tagsMeters = snapshot
//                             .docChanges()
//                             .map((change) => ({
//                                 meters: change.meters,
//                             })
//                         )
//                         // checker if something change
//                         if (snapshot.docChanges().length !== 0){
//                             emmiter(tagsMeters);
//                         }
//                         // off emmiter return
//                         return () => (listenerChannel.off())
//                     }
//                 )       
//         }
//     );
//     return listenerChannel
// };

// // to update the changes in top5Tags
// export function* fetchMetersTop5Tags() {
//     const channel = yield call(createEventChannel)
//     try {
//         while(true){
//             const mtsData = yield take(channel)
//             yield put(rexSagaReduces(mtsData))
//         }
//     } catch {
//         console.log("error")
//     }
// }





// // to listen changes in liveDataSets
// function createEventChannelOne() {
//     // listener
//     const listenerChannelOne = eventChannel(
//         (emmiter) => {
//             // ref db
//             const dataRefOne = firebase
//                 .firestore()
//                 .doc(`/userDevices/"PT44TQIpPyLJXRBqXZAQ"`) 
//                 .collection('liveDataSets')
//                 .get()

//             // db observer
//             const observerOne = dataRefOne
//                 .onSnapshot({ includeMetadataChanges: true }, 
//                     (snapshot) => {
//                         const liveDataSetsChanges = snapshot
//                             .docChanges()
//                             .map((change) => ({
//                                 coords: change.coords,
//                                 colorValue: change.colorValue,
//                                 createdAt: change.createdAt, 
//                                 motorSpeed: change.motorSpeed
//                             })
//                         )
//                         // checker if something change
//                         if (snapshot.docChanges().length !== 0){
//                             emmiter(liveDataSetsChanges);
//                         }
//                         // off emmiter return
//                         return () => (listenerChannelOne.off())
//                     }
//                 )       
//         }
//     );
//     return listenerChannelOne
// };

// // to update the changes in top5Tags
// export function* fetchDataLiveDataSets() {
//     const channel = yield call(createEventChannelOne)
//     try {
//         while(true){
//             const liveDataSetsData = yield take(channel)
//             yield put(rexSagaReducesOne(liveDataSetsData))
//         }
//     } catch {
//         console.log("error")
//     }
// }

// export default function* rootSaga() {
//     yield fork(fetchMetersTop5Tags);
//     //yield fork(fetchDataLiveDataSets);
// }

