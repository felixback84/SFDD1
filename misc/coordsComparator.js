// range 05
let coordsOneInFive = {
    lat: 4.634481,
    lon: -74.070564
}

let coordsTwoInFive ={
    lat: 4.634503,
    lon: -74.070544
}

// rest
let restLatsInFive = coordsOneInFive.lat - coordsTwoInFive.lat; 
let restLonsInFive = coordsOneInFive.lon - coordsTwoInFive.lon;
console.log(`lats diference in range 5: ${restLatsInFive} & lons diference: ${restLonsInFive}`);

// range 04
let coordsOneInFour = {
    lat: 4.634481,
    lon: -74.070564
}

let coordsTwoInFour ={
    lat: 4.634503,
    lon: -74.070544
}

// rest
let restLatsInFour = coordsOneInFour.lat - coordsTwoInFour.lat; 
let restLonsInFour = coordsOneInFour.lon - coordsTwoInFour.lon;
console.log(`lats diference in range 4: ${restLatsInFour} & lons diference: ${restLonsInFour}`);

// range 03
let coordsOneInThree = {
    lat: 4.634481,
    lon: -74.070564
}

let coordsTwoInThree ={
    lat: 4.634503,
    lon: -74.070544
}

// rest
let restLatsInThree = coordsOneInThree.lat - coordsTwoInThree.lat; 
let restLonsInThree = coordsOneInThree.lon - coordsTwoInThree.lon;
console.log(`lats diference in range 3: ${restLatsInThree} & lons diference: ${restLonsInThree}`);

// range 02
let coordsOneInTwo = {
    lat: 4.634481,
    lon: -74.070564
}

let coordsTwoInTwo ={
    lat: 4.634503,
    lon: -74.070544
}

// rest
let restLatsInTwo = coordsOneInTwo.lat - coordsTwoInTwo.lat; 
let restLonsInTwo = coordsOneInTwo.lon - coordsTwoInTwo.lon;
console.log(`lats diference in range 2: ${restLatsInTwo} & lons diference: ${restLonsInTwo}`);

// range 01
let coordsOneInOne = {
    lat: 4.634481,
    lon: -74.070564
}

let coordsTwoInOne ={
    lat: 4.634503,
    lon: -74.070544
}

// rest
let restLatsInOne = coordsOneInOne.lat - coordsTwoInOne.lat; 
let restLonsInOne = coordsOneInOne.lon - coordsTwoInOne.lon;
console.log(`lats diference in range 1: ${restLatsInOne} & lons diference: ${restLonsInOne}`);

function CheckDistance(lon1, lat1, lon2, lat2) {
    let R = 6371; // Radius of the earth in km
    let dLat = (lat2-lat1).toRad();  // Javascript functions in radians
    let dLon = (lon2-lon1).toRad(); 
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; // Distance in km
    return d;
}
  
/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
        Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}

console.log(
    'hi' + CheckDistance(4.634481,-74.070544,4.6345030,-74.070564)
  );

  
//   window.navigator.geolocation.getCurrentPosition(function(pos) {
//     console.log(pos); 
//     console.log(
//       distance(pos.coords.longitude, pos.coords.latitude, 42.37, 71.03)
//     ); 
//   });

// etoile gps finder
// class Etolie {
    
//     constructor({others, messageData, n5Value}) {
//         // user 0 pos init
//         this.dataCoordsUser = messageData;
//         // to compare
//         this.dataCoordsOthers = others;
//         // start module gps etoile
//         this.start = {
            
//             n:{
//                 n5: n5Value,
//                 n4: n4Value,
//                 n3: n3Value,
//                 n2: n2Value,
//                 n1: n1Value,
//             },
//             no:{
//                 no5: no5Value,
//                 no4: no4Value,
//                 no3: no3Value,
//                 no2: no2Value,
//                 no1: no1Value
//             },
//             o:{
//                 o5: o5Value,
//                 o4: o4Value,
//                 o3: o3Value,
//                 o2: o2Value,
//                 o1: o1Value
//             },
//             so:{
//                 so5: so5Value,
//                 so4: so4Value,
//                 so3: so3Value,
//                 so2: so2Value,
//                 so1: so1Value
//             },
//             s:{
//                 s5: s5Value,
//                 s4: s4Value,
//                 s3: s3Value,
//                 s2: s2Value,
//                 s1: s1Value,
//             }

//         }

//         // this.name = name;
//         // this.year = year;
//     }
// }