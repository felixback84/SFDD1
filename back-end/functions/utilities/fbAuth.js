const { admin, db } = require('./admin');

// middleware to auth private routes
module.exports = (req,res,next) => {
    let idToken;
    // check if there is a token in the req, or stop the logic
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return res.status(403).json({ Token: 'Body must not be empty' });
    }

    // check if the token in the request is provide for us
    admin
        .auth()
        .verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            console.log(decodedToken); //mirar que devuelve
            return db.collection('users')
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get();
        })
        .then((data) => {
            req.user.userHandle = data.docs[0].data().userHandle;
            req.user.imgUrl = data.docs[0].data().imgUrl;
            return next();
        })
        .catch((err) => {
            console.error('Error while verifying token ', err);
            return res.status(403).json(err);
        })
}