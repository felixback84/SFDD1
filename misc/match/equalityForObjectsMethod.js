// find if exists a particular item(s) in an array inside an object
// let _ = require('underscore');

// const company = {
//     dcHeros:['Batman', 'Superman', 'Cyborg', 'Flash', 'Aquaman'],
//     luckyNumbers:[0,1,2,3,4,5,7,8,9],
//     animals:['cat','dog','rabbit','snake', 'hamster','spider','bird',],
//     fruits:['🍎', '🍋', '🍊', '🍇', '🍍', '🍐']
// }

// // obj user in move
// let bobaFett ={
//     dcHeros:["Batman", 'Cyborg'],
//     luckyNumbers:[1,5],
//     animals:['cat'],
//     fruits:['🍎', '🍍']
// }

// let one = _.intersection(company.dcHeros, bobaFett.dcHeros)
// let two = _.intersection(company.fruits, bobaFett.fruits)
// console.log(one);
// console.log(two);

// output
// ["Batman", 'Cyborg']
// ['🍎', '🍍']






// flat arrays
// flat arrays func
// function flattenArr(arr) {
//     var flat = [];
//     for (var i = 0; i < arr.length; i++) {
//         flat = flat.concat(arr[i]);
//     }
//     return flat;
// }
// // run it
// flattenArr(arraysToCheck) 





// //find if exists a particular item in an array inside an object
// const company = {
//     dcHeros:['Batman', 'Superman', 'Cyborg', 'Flash', 'Aquaman'],
//     luckyNumbers:[2,4,5,7,8,9],
//     animals:['cat','dog','rabbit','snake'],
//     fruits:['🍎', '🍋', '🍊', '🍇', '🍍', '🍐']
// }

// // obj user in move
// let bobaFett ={
//     animals:['cat'],
//     dcHeros:["Batman"],
//     luckyNumbers:[1,5],
//     fruits:['🍇', '🍍']
// }

// console.log(company.fruits.includes('🍇'));  
// console.log(company.dcHeros.includes('Superman'));  
// console.log(company.luckyNumbers.includes(2));





// *************************** with underscore
// let _ = require('underscore');

// let target = [ 'apple', 'orange', 'banana'];
// let fruit2 = [ 'apple', 'orange', 'mango'];
// let fruit3 = [ 'mango', 'lemon', 'pineapple'];
// let fruit4 = [ 'orange', 'lemon', 'grapes'];

// console.log(_.intersection(target, fruit2)); //returns [apple, orange]
// console.log(_.intersection(target, fruit3)); //returns []
// console.log(_.intersection(target, fruit4)); //returns [orange]




// ***************** find if two objects are exact
// // obj 1
// let bobaFett ={
//     cat: true,
//     dcHero: "Batman",
//     luckyNumber: 1
// }

// // obj 2
// let jangoFett ={
//     cat: true,
//     dcHero: "Batman",
//     luckyNumber: 1
// }

// function isEquivalent(a, b) {
//     // Create arrays of property names
//     let aProps = Object.getOwnPropertyNames(a);
//     let bProps = Object.getOwnPropertyNames(b);

//     // If number of properties is different,
//     // objects are not equivalent
//     if (aProps.length != bProps.length) {
//         return false;
//     }

//     for (let i = 0; i < aProps.length; i++) {
//         let propName = aProps[i];

//         // If values of same property are not equal,
//         // objects are not equivalent
//         if (a[propName] !== b[propName]) {
//             return false;
//         }
//     }

//     // If we made it this far, objects
//     // are considered equivalent
//     return true;
// }
// console.log(isEquivalent(bobaFett, jangoFett));

// // output 
// // true




// **************** just compare specific key pairs in an object
// // obj 1
// let bobaFett ={
//     cat: true,
//     dcHero: "Batman",
//     luckyNumber: 1
// }

// // obj 2
// let jangoFett ={
//     cat: true,
//     dcHero: "Batman",
//     luckyNumber: 1
// }

// function compare (a,b){ 
//     if(a.dcHero == b.dcHero && a.cat == b.cat ){
//         return true
//     } else {
//         return false
//     }
// }
// console.log(compare(bobaFett, jangoFett));

// // output
// // true




// *************** loop in every key-pair and extract the data
// const user = {
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     age: 25,
//     dob: '08/02/1989',
//     active: true
// };

// iterate over the user object
// for (const key in user) {
//     if (user.hasOwnProperty(key)) {
//         console.log(`${key}: ${user[key]}`);
//     }
// }

// output
// name: John Doe
// email: john.doe@example.com
// age: 25
// dob: 08/02/1989
// active: true
// jangoFett: [object Object]




// array length
// let arr = [{"match":[{"dcHeros":["Flash"]},{"fruits":["melon"]},{"luckyNumbers":[]},{"pets":["cat"]}],"thingId":""},{"match":[{"dcHeros":[]},{"fruits":[]},{"luckyNumbers":[]},{"pets":[]}],"thingId":""},{"match":[{"dcHeros":[]},{"fruits":["watermelon"]},{"luckyNumbers":[]},{"pets":[]}],"thingId":""},{"match":[{"dcHeros":[]},{"fruits":[]},{"luckyNumbers":[21]},{"pets":[]}],"thingId":""},{"match":[{"dcHeros":[]},{"fruits":[]},{"luckyNumbers":[]},{"pets":["fox"]}],"thingId":""},{"match":[{"dcHeros":["Flash"]},{"fruits":[]},{"luckyNumbers":[]},{"pets":["cat"]}],"thingId":""},{"match":[{"dcHeros":[]},{"fruits":["watermelon"]},{"luckyNumbers":[]},{"pets":["cat","fox"]}],"thingId":""},{"match":[{"dcHeros":[]},{"fruits":[]},{"luckyNumbers":[1]},{"pets":["cat"]}],"thingId":""},{"match":[{"dcHeros":["Flash"]},{"fruits":[]},{"luckyNumbers":[15]},{"pets":["cat"]}],"thingId":""},{"match":[{"dcHeros":["Flash"]},{"fruits":[]},{"luckyNumbers":[1]},{"pets":[]}],"thingId":""},{"match":[{"dcHeros":[]},{"fruits":[]},{"luckyNumbers":[1,21]},{"pets":[]}],"thingId":""},{"match":[{"dcHeros":["Flash"]},{"fruits":["melon"]},{"luckyNumbers":[]},{"pets":["cat"]}],"thingId":""},{"match":[{"dcHeros":[]},{"fruits":["melon"]},{"luckyNumbers":[21]},{"pets":["fox"]}],"thingId":""},{"match":[{"dcHeros":[]},{"fruits":["watermelon"]},{"luckyNumbers":[]},{"pets":[]}],"thingId":""}]
// console.log(arr.length);





// // to check the quantity of keys in an object
// let some = {something:{}}
// if(Object.entries(some).length == 0){
//     console.log("is empty")
// } else {
//     console.log("has something")
// }




// // to eliminate empty obj
// let arraysToCheck = [{initialMatches:{"dcHeros":["Flash"]}},{initialMatches:{}}]
// const myOutputArray = []
// const mySearchValue = {initialMatches:{}}

// for(let i = 0; i < arraysToCheck.length; i++){
//     if(arraysToCheck[i].initialMatches !== mySearchValue){
//         myOutputArray.push(arraysToCheck[i])
//     }
// }
// console.log(myOutputArray)




// check true
let coincidences = {};
if(coincidences === {}){
    console.log("true")
} else {
    console.log("false")
}





