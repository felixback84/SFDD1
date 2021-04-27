// for client side
//const firebase = require("firebase/app");
import firebase from 'firebase/app';
import 'firebase/firestore';

// config
const config = {
    apiKey: "AIzaSyCvNH7li6Sx1GDcYYYGeMm0civ9hZyH6q4",
    authDomain: "sfdd-d8a16.firebaseapp.com",
    databaseURL: "https://sfdd-d8a16.firebaseio.com",
    projectId: "sfdd-d8a16",
    storageBucket: "sfdd-d8a16.appspot.com",
    messagingSenderId: "291987807609",
    appId: "1:291987807609:web:84354fafa7125298ff23a8",
    measurementId: "G-Q90235LDXM"
    
}
// init
firebase.initializeApp(config);
//const db = require("firebase/firestore");

export default firebase;
 