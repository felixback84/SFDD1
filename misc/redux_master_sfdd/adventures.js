// firebase
const { db } = require('../utilities/admin');

// gat all adventures
exports.getAllAdventures = (req,res) => { 
    db
        .collection('adventures')
        //.orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let adventures = [];
            data.forEach((doc) => {
                adventures.push({
                    adventureId: doc.id,
                    title: doc.data().title,
                    description: doc.data().description,
                    imgUrl: doc.data().imgUrl,
                    videoUrl: doc.data().videoUrl,
                    createdAt: doc.data().createdAt,
                    price: doc.data().price,
                    duration: doc.data().duration,
                    tags: doc.data().tags,
                    language: doc.data().language,
                    audioUrl: doc.data().audioUrl,
                    likesCount: doc.data().likesCount,
                    commentsCount: doc.data().commentsCount,
                    device: {
                        nameOfDevice: doc.data().device.nameOfDevice,
                        badgeUrl: doc.data().device.badgeUrl
                    },
                    coverUrl: doc.data().coverUrl
                });
            });
            return res.json(adventures);
        })
        .catch((err) => console.error(err));
}

// get a specific adventure with it's comments and likes
exports.getAdventure = (req, res) => {
    let adventureData = {};
    db
        .doc(`/adventures/${req.params.adventureId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Adventure not found' });
            }
            adventureData = doc.data();
            adventureData.adventureId = doc.id;
            return db
                    .collection('comments')
                    //.orderBy('createdAt', 'desc')
                    .where('adventureId', '==', req.params.adventureId)
                    .get();
        })
        .then((data) => {
            adventureData.comments = [];
            data.forEach((doc) => {
                adventureData.comments.push(doc.data());
            });
            // return res.json(deviceData);
        })
    // ask for likes - check if this is usefull in ux
    db
        .doc(`/adventures/${req.params.adventureId}`)
        .get()
        .then((doc) => {
            adventureData = doc.data();
            adventureData.adventureId = doc.id;
            return db
                    .collection('likes')
                    //.orderBy('createdAt', 'desc')
                    .where('adventureId', '==', req.params.adventureId)
                    .get();
        })
        .then((data) => {
            adventureData.likes = [];
            data.forEach((doc) => {
                adventureData.likes.push(doc.data());
            })
            // all res of server
            return res.json(adventureData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

// Like an adventure
exports.likeAdventure = (req, res) => {
    const likeDocument = db
        .collection('likes')
        .where('userHandle', '==', req.user.userHandle)
        .where('adventureId', '==', req.params.adventureId)
        .limit(1);

    const adventureDocument = db.doc(`/adventures/${req.params.adventureId}`);
    let adventureData;
    adventureDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                adventureData = doc.data();
                adventureData.adventureId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({ error: 'Adventure not found' });
            }
        })
        .then((data) => {
            if (data.empty) {
                //console.log(data);
                return db
                    .collection('likes')
                    .add({
                        adventureId: req.params.adventureId,
                        userHandle: req.user.userHandle,
                        type: "adventures"
                    })
                    .then(() => {
                        adventureData.likesCount++;
                        return adventureDocument.update({ likesCount: adventureData.likesCount });
                    })
                    .then(() => {
                        return res.json(adventureData);
                    });
            } else {
                return res.status(400).json({ error: 'Adventure already liked' });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });         
};

// Unlike an adventure
exports.unlikeAdventure = (req, res) => { 
    const likeDocument = db
    .collection('likes')
    .where('userHandle', '==', req.user.userHandle)
    .where('adventureId', '==', req.params.adventureId)
    .limit(1);

    const adventureDocument = db.doc(`/adventures/${req.params.adventureId}`);
    let adventureData;
    adventureDocument
        .get()
        .then((doc) => {
            if (doc.exists) {
                adventureData = doc.data();
                adventureData.adventureId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({ error: 'Adventure not found' });
            }
        })
        .then((data) => {
            if (data.empty) {
                return res.status(400).json({ error: 'Adventure not liked' });
            } else {
                return db
                    .doc(`/likes/${data.docs[0].id}`)
                    .delete()
                    .then(() => {
                        adventureData.likesCount--;
                        return adventureDocument.update({ likesCount: adventureData.likesCount });
                    })
                    .then(() => {
                        res.json(adventureData);
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });   
}

// Comment on an adventure
exports.postAdventureComment = (req, res) => {
    if (req.body.bodyComment.trim() === '')
    return res.status(400).json({ comment: 'Must not be empty' });
    const newCommentAdventure = {
        bodyComment: req.body.bodyComment,
        createdAt: new Date().toISOString(),
        adventureId: req.params.adventureId,
        userHandle: req.user.userHandle,
        userImage: req.user.imgUrl,
        type: "adventures"
    };

    db
        .doc(`/adventures/${req.params.adventureId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Adventure not found' });
            }
            return doc.ref.update({ commentsCount: doc.data().commentsCount + 1 });
        }) 
        .then(() => {
            return db.collection('comments').add(newCommentAdventure);
        })
        .then(() => {
            res.json(newCommentAdventure);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
};
