// firebase
const { db } = require('../utilities/admin');

// get all userAdventures
exports.getAllUserAdventures = (req, res) => {
    let userAdventures = [];
    db
        .collection('userAdventures')
        .where('userHandle', '==', req.user.userHandle)
        .get()
        .then((data)=> {
            data.forEach((doc) => {
                userAdventures.push({
                    userAdventureId: doc.id,
                    userHandle: doc.data().userHandle,
                    active: doc.data().active,
                    createdAt: doc.data().createdAt,
                    adventure: doc.data().adventure,
                    advetureId: doc.data().advetureId
                });
            });
            return res.json(userAdventures);
        })    
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

// get one userAdventure
exports.getUserAdventure = (req, res) => {
    let userAdventureData = {};
    db
        .doc(`/userAdventures/${req.params.userAdventureId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'userAdventure not found' });
            }
            userAdventureData = doc.data();
            userAdventureData.userAdventureId = doc.id;
            return res.json(userAdventureData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

// get active useradventure
exports.getActiveUserAdventures = (req, res) => {
    const activeUserAdventureDocument = db
        .collection('activeUserAdventures')
        .where('userHandle', '==', req.user.userHandle)
        .where('active', '==', true)
        .limit(1)

    // ask for device
    const userAdventureDocument = db.doc(`/userAdventures/${req.params.userAdventureId}`); 
    // global var to hold all data
    let userAdventureData;
    // ask if exists this device
    userAdventureDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                userAdventureData = doc.data();
                userAdventureData.userAdventureId = doc.id;
                return activeUserAdventureDocument.get();
            } else {
                return res.status(404).json({ error: 'useAdventure not found' });
            }
        })
        // check if is empty this kind of item in the activeDevices collection
        .then((data) => {
            if (data.empty) {
              //console.log(data);
                return db
                    // add data to it
                    .collection('activeUserAdventures')
                    .add({
                        userAdventureId: req.params.userAdventureId,
                        userHandle: req.user.userHandle,
                        createdAt: new Date().toISOString(),
                        active: true
                    })
                    .then(() => {
                        return userAdventureDocument.update({ active: true });
                    })
                    .then(() => {
                        //console.log(res);
                        console.log(userAdventureData);
                        return res.json(userAdventureData);
                    
                    });
            } else {
                return res.status(400).json({ error: 'userAdventure already active' });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });   
}

// get inactive adventure
exports.getInactiveUserAdventures = (req, res) => {
    const activeUserAdventureDocument = db
            .collection('activeUserAdventures')
            .where('userHandle', '==', req.user.userHandle)
            .where('userAdventureId', '==', req.params.userAdventureId)
            .where('active', '==', true)
            .limit(1);

    const userAdventuresDocument = db.doc(`/userAdventures/${req.params.userAdventureId}`);
    let userAdventuresData;
    
    userAdventuresDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                userAdventuresData = doc.data();
                userAdventuresData.userAdventureId = doc.id;
                return activeUserAdventureDocument.get();
            } else {
                return res.status(404).json({ error: 'userAdventure not found' });
            }
        })
        .then((data) => {
            if (data.empty) {
                return res.status(400).json({ error: 'Adventure not active' });
            } else {
                return db
                    .doc(`/activeUserAdventures/${data.docs[0].id}`)
                    .delete()
                    .then(() => {
                        return userAdventuresDocument.update({ active: false });
                    })
                    .then(() => {
                        res.json(userAdventuresData);
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });   
}