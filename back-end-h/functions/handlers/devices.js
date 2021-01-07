// firebase
const { db } = require('../utilities/admin');

// get all devices
exports.getAllDevices = (req,res) => { 
    db
        .collection('devices')
        //.orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let devices = [];
            data.forEach((doc) => {
                devices.push({
                    deviceId: doc.id,
                    nameOfDevice: doc.data().nameOfDevice,
                    description: doc.data().description,
                    imgUrl: doc.data().imgUrl,
                    videoUrl: doc.data().videoUrl,
                    badgeUrl: doc.data().badgeUrl,
                    createdAt: doc.data().createdAt,
                    price: doc.data().price,
                    likesCount: doc.data().likesCount,
                    commentsCount: doc.data().commentsCount,
                    dataSets: doc.data().dataSets
                });
            });
            return res.json(devices);
        })
        .catch((err) => console.error(err));
}

// get a specific device with it's comments and likes
exports.getDevice = (req, res) => {
    let deviceData = {};
    db
        .doc(`/devices/${req.params.deviceId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Device not found' });
            }
            deviceData = doc.data();
            deviceData.deviceId = doc.id;
            return db
                    .collection('comments')
                    //.orderBy('createdAt', 'desc')
                    .where('deviceId', '==', req.params.deviceId)
                    .get();
        })
        .then((data) => {
            deviceData.comments = [];
            data.forEach((doc) => {
                deviceData.comments.push(doc.data());
            });
            return res.json(deviceData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

// Like a device
exports.likeDevice = (req, res) => {
    const likeDocument = db
        .collection('likes')
        .where('userHandle', '==', req.user.userHandle)
        .where('deviceId', '==', req.params.deviceId)
        .limit(1);

    const deviceDocument = db.doc(`/devices/${req.params.deviceId}`);
    let deviceData;
    deviceDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                deviceData = doc.data();
                deviceData.deviceId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({ error: 'Device not found' });
            }
        })
        .then((data) => {
            if (data.empty) {
                //console.log(data);
                return db
                    .collection('likes')
                    .add({
                        deviceId: req.params.deviceId,
                        userHandle: req.user.userHandle,
                        type: "devices"
                    })
                    .then(() => {
                        deviceData.likesCount++;
                        return deviceDocument.update({ likesCount: deviceData.likesCount });
                    })
                    .then(() => {
                        return res.json(deviceData);
                    });
            } else {
                return res.status(400).json({ error: 'Device already liked' });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });         
};

// Unlike a device
exports.unlikeDevice = (req, res) => { 
    const likeDocument = db
        .collection('likes')
        .where('userHandle', '==', req.user.userHandle)
        .where('deviceId', '==', req.params.deviceId)
        .limit(1);

    const deviceDocument = db.doc(`/devices/${req.params.deviceId}`);
    let deviceData;
    deviceDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                deviceData = doc.data();
                deviceData.deviceId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({ error: 'Device not found' });
            }
        })
        .then((data) => {
            if (data.empty) {
                return res.status(400).json({ error: 'Device not liked' });
            } else {
                return db
                    .doc(`/likes/${data.docs[0].id}`)
                    .delete()
                    .then(() => {
                        deviceData.likesCount--;
                        return deviceDocument.update({ likesCount: deviceData.likesCount });
                    })
                    .then(() => {
                        res.json(deviceData);
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });   
}

// Comment on a device
exports.postDeviceComment = (req, res) => {
    if (req.body.bodyComment.trim() === '')
    return res.status(400).json({ comment: 'Must not be empty' });
    const newCommentDevice = {
        bodyComment: req.body.bodyComment,
        createdAt: new Date().toISOString(),
        deviceId: req.params.deviceId,
        userHandle: req.user.userHandle,
        userImage: req.user.imgUrl,
        type: "devices"
    };

    db
        .doc(`/devices/${req.params.deviceId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Device not found' });
            }
            return doc.ref.update({ commentsCount: doc.data().commentsCount + 1 });
        }) 
        .then(() => {
            return db.collection('comments').add(newCommentDevice);
        })
        .then(() => {
            res.json(newCommentDevice);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
};