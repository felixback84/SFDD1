// firebase
const { admin, db } = require('../utilities/admin');
const config = require('../utilities/config');
const firebase = require('firebase');
firebase.initializeApp(config);

// validate data
const { 
    validateSignupData, 
    validateLoginData,  
    reduceUserDetails 
} = require('../utilities/validation');

// signup
exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
        confirmPassword: req.body.confirmPassword,
        userHandle: req.body.userHandle
    };

    // data validation before logic
    // const { valid, errors } = validateSignupData(newUser);
    // if(!valid) return res.status(400).json(errors);

    // default image of user profile
    const noImg = 'no-img.png';

    // db consult
    let token, userId;

    db 
        .doc(`/users/${newUser.userHandle}`)
        .get()
        .then((doc) => {
            // check if the handle exists
            if(doc.exists){
                return res.status(400).json({userHandle: 'this handle is already taken'});
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        // db with user user credentials
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                userHandle: newUser.userHandle,
                email: newUser.email,
                type: newUser.type,
                createdAt: new Date().toISOString(),
                imgUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
                userId
            };
            return db
                    .doc(`/users/${newUser.userHandle}`)
                    .set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch((err) => {
            console.error(err);
            // check if the email exists
            if(err.code === 'auth/email-already-in-use'){
                    return res.status(400).json({ email: 'Email is already in use' })
                } else {
                    return res.status(500).json({ general: 'Something went wrong, please try again'})
                }
        });
}

// login 
exports.login = (req,res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    //const { valid, errors } = validateLoginData(user);
    //if(!valid) return res.status(400).json(errors);

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.json({ token });
        })
        .catch((err) => {
            console.error(err);
            // auth/wrong-password
            // auth/user-not-found
            return res
                .status(403)
                .json({ general: 'Wrong credentials, please try again' });
        });
}

// Add user details 
exports.addUserDetails = (req, res) => {
    
    let userDetails = reduceUserDetails(req.body)
    
    db.doc(`/users/${req.user.userHandle}`)
        .update(userDetails)
        .then(() => {
            return res.json({ message: 'Details added successfully' })
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code })
        })
};

// add corportaive details just for statics-vendors
exports.addCompanyDetails = (req,res) => {
    // company data with validation
    //let companyDetails = reduceUserDetails(req.body)
    let companyDetails = req.body
    // db part
    db.doc(`/users/${req.user.userHandle}`)
        .collection('companyData')
        .add(companyDetails)
        .then(() => {
            return res.json({ message: 'Details added successfully' })
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code })
        })
}

// upload user image
exports.uploadUserImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new BusBoy({ headers: req.headers });

    let imageToBeUploaded = {};
    let imageFileName;

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log(fieldname, file, filename, encoding, mimetype);
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            return res.status(400).json({ error: 'Wrong file type submitted' });
        }
        // my.image.png => ['my', 'image', 'png']
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        // 32756238461724837.png
        imageFileName = `${Math.round(Math.random() * 1000000000000).toString()}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on('finish', () => {
        admin
            .storage()
            .bucket()
            .upload(imageToBeUploaded.filepath, {
                resumable: false,
                metadata: {
                    metadata: {
                    contentType: imageToBeUploaded.mimetype
                    }
                }
            })  
            .then(() => {
                const imgUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
                return db.doc(`/users/${req.user.userHandle}`).update({ imgUrl });
            })
            .then(() => {
                return res.json({ message: 'image uploaded successfully' });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({ error: 'something went wrong' });
            });
    });
    busboy.end(req.rawBody);
};

// get all user info (auth)
exports.getAuthenticatedUser = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.user.userHandle}`)
        .get()
        // credentials
        .then((doc) => {
            if (doc.exists) {
                userData.credentials = doc.data();
                return db
                    .collection('likes')
                    .where('userHandle', '==', req.user.userHandle)
                    .get()
            }
        }) 
        // likes
        .then((data) => {
            userData.likes = [];
            data.forEach((doc) => {
                userData.likes.push(doc.data());
            });
            return db
                .collection('activeUserDevices')
                .where('userHandle', '==', req.user.userHandle)
                .get()  
        })
        // active userDevices
        .then((data) => {
            userData.activeUserDevices = [];
            data.forEach((doc) => {
                userData.activeUserDevices.push(doc.data());
            });
            return db
                .collection('notifications')
                .where('userHandle', '==', req.user.userHandle)
                .get() 
        })
        // notifications
        .then((data) => {
            userData.notifications = [];
            data.forEach((doc) => {
                userData.notifications.push({
                    ...doc.data(),
                    notificationId: doc.id
                });
            });
            return res.json(userData);
        })        
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};  

// mark if the notifications was read 
exports.markDevicesNotificationsRead = (req, res) => {
    let batch = db.batch();
    req.body.forEach((notificationId) => {
        const notification = db.doc(`/notifications/${notificationId}`);
            batch.update(notification, { read: true });
    });
    batch
        .commit()
        .then(() => {
            return res.json({ message: 'Notifications marked read' });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
}; 







