let admin = require("firebase-admin");
admin.initializeApp()
const db = admin.firestore()
// firebase db
const realDB = admin.database();
module.exports = { admin, db, realDB }; 
 