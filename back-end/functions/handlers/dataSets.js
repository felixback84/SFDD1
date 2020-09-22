// firebase
const { db } = require('../utilities/admin');

// post in dataSets in user devices
exports.postInDataSetsUserDevice = (req, res) => {
    let dataSetModel;
    let dataSetId;
    db
        .doc(`/userDevices/${req.params.userDeviceId}`)
        .get()
        .then((doc) => {
            dataSetModel = doc.data().device.dataSets;
            dataSetId = doc.id;
        })
        .then(() => {
            let dataSetModel = {
                ...req.body, 
                createdAt: new Date().toISOString(), 
                dataSetId: dataSetId
            };  
            return db
                .doc(`/userDevices/${req.params.userDeviceId}`)
                .collection('dataSets')
                .add(dataSetModel)
                .then(() => {
                    return res.json(dataSetModel);
                })            
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ error: err.code });
                });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

// get all dataSets in user device 
exports.getAllDataSetsUserDevice = (req, res) => {
    db
        .doc(`/userDevices/${req.params.userDeviceId}`)
        .collection('dataSets')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let dataSets = [];
            data.forEach((doc) => {
                dataSets.push({
                    dataSetId: doc.id,
                    ...doc.data()
                });
            });
            return res.json(dataSets);
        })
        .catch((err) => console.error(err));   
}

// get one dataSets in user device
exports.getDataSetUserDevice = (req, res) => {
    
    let dataSetInfo = db
        .collection('userDevices')
        .doc(req.params.userDeviceId)
        .collection('dataSets')
        .doc(req.params.dataSetId)
        .get()
        .then((doc) => {
            let dataSet = doc.data();
            dataSet.dataSetId = doc.id;
            //console.log(dataSet);
            return res.json(dataSet);
        })
        .catch((err) => {
                console.error(err);
                res.status(500).json({ error: err.code });
        });
}