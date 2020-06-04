// firebase
const { db } = require('../utilities/admin');

// get all checkouts
exports.getAllCheckouts = (req, res) => {
    
    db
        .collection('checkouts')
        .where('userHandle', '==', req.user.userHandle)
        .get()
        .then((data) => {
            let checkoutsData = [];
            data.forEach((doc) => {
                checkoutsData.push({
                    checkoutId: doc.id,
                    ...doc.data()
                });
            });
            return res.json(checkoutsData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

// get a specific checkout
exports.getCheckout = (req, res) => {
    let checkoutData;
    db
        .doc(`/checkouts/${req.params.checkoutId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'checkout not found' });
            }
            checkoutData = doc.data();
            checkoutData.checkoutId = doc.id;
            return res.json(checkoutData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

// post data for checkout to post in userDevices 
exports.postDataCheckOutDevice = (req, res) => {

    // global vars
    const language = "es";
    const command = "SUBMIT_TRANSACTION";
    const apiKey = "4Vj8eK4rloUd272L48hsrarnUA"; // .env
    const apiLogin = "pRRXKOl8ikMmt9u"; // .env
    const accountId = "512321"; // .env
    const notifyUrl = "http://www.tes.com/confirmation";
    const country = "CO";
    const paymentCountry = "CO";
    const currency = "COP";
    const type = "AUTHORIZATION_AND_CAPTURE";
    const postalCode = "000000";
    const userAgent = "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0";

    // data from client body
    const userData = {
        //...req.body
        shippingAddress: {
            street1: req.body.shippingAddress.street1,
            street2: req.body.shippingAddress.street2,
            city: req.body.shippingAddress.city,
            state: req.body.shippingAddress.state,
            phone: req.body.shippingAddress.phone
        },
        billingAddress: {
            street1: req.body.billingAddress.street1,
            street2: req.body.billingAddress.street2,
            city: req.body.billingAddress.city,
            state: req.body.billingAddress.state,
            phone: req.body.billingAddress.phone
        },
        cc:{
            number: req.body.cc.number,
            securityCode: req.body.cc.securityCode, 
            expirationDate: req.body.cc.expirationDate, 
            name: req.body.cc.name
        }
    };

    // data for post in PAYU
    const allDataToPostInPayU = {
        language: language, 
        command: command, 
        merchant: {
            apiKey: apiKey, 
            apiLogin: apiLogin 
        },
        transaction: {
            order: {
                accountId: accountId, 
                referenceCode: "TestPayU", 
                description: "payment test", 
                language: language, 
                signature: "7ee7cf808ce6a39b17481c54f2c57acc",
                notifyUrl: notifyUrl, 
                additionalValues: {
                        TX_VALUE: {
                        value: 20000, 
                        currency: "COP" 
                    },
                        TX_TAX: {
                        value: 3193, 
                        currency: currency 
                    },
                        TX_TAX_RETURN_BASE: { 
                        value: 16806,
                        currency: "COP"
                    }
                },
                buyer: {
                    merchantBuyerId: "1",
                    fullName: "First name and second buyer name", 
                    emailAddress: "buyer_test@test.com", 
                    contactPhone: "7563126", 
                    dniNumber: "5415668464654",
                    shippingAddress: {
                        street1: userData.shippingAddress.street1, 
                        street2: userData.shippingAddress.street2, 
                        city: userData.shippingAddress.city, 
                        state: userData.shippingAddress.state, 
                        country: country, 
                        postalCode: postalCode, 
                        phone: userData.shippingAddress.phone 
                    }
                },
                shippingAddress: {
                    street1: userData.shippingAddress.street1, 
                    street2: userData.shippingAddress.street2, 
                    city: userData.shippingAddress.city, 
                    state: userData.shippingAddress.state, 
                    country: country, 
                    postalCode: postalCode, 
                    phone: userData.shippingAddress.phone 
                }
            },
            payer: {
                merchantPayerId: "1",
                fullName: "First name and second payer name", 
                emailAddress: "payer_test@test.com",
                contactPhone: "7563126",
                dniType: "CC",
                dniNumber: "5415668464654",
                billingAddress: {
                    street1: userData.billingAddress.street1, 
                    street2: userData.billingAddress.street2, 
                    city: userData.billingAddress.city, 
                    state: userData.billingAddress.state, 
                    country: country, 
                    postalCode: postalCode, 
                    phone: userData.billingAddress.phone 
                }
            },
            creditCard: {
                number: "4097440000000004", 
                securityCode: "321", 
                expirationDate: "2022/12", 
                name: "REJECTED" 
            },
            extraParameters: {
                INSTALLMENTS_NUMBER: 1 
            },
            type: type, 
            paymentMethod: "VISA", 
            paymentCountry: paymentCountry, 
            deviceSessionId: "vghs6tvkcle931686k1900o6e1", 
            ipAddress: "127.0.0.1", 
            cookie: "pt1t38347bs6jc9ruv2ecpv7o2",
            userAgent: userAgent
        },
        test: false
    }

    // return res.json(userData);
    // console.log(userData);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // if(userData){
    //     // global var
    //     let dataCheckout = {};

    //     // put addiotional info for checkout
    //     let checkoutData = {
    //         userHandle: req.user.userHandle,
    //         createdAt: new Date().toISOString(),
    //         type: 'device',
    //         state:'pending'
    //     }
    //     dataCheckout = checkoutData;
        
    //     // address
    //     const newUserAdressToDelivery = {
    //         city: req.body.paymentData.shippingAddress.city, 
    //         addressToDelivery: req.body.paymentData.shippingAddress.address1
    //     };

    //     // add address to global var
    //     dataCheckout.address = newUserAdressToDelivery;
    //     // ask for user data
    //     db
    //         .doc(`/users/${req.user.userHandle}`)
    //         .get()
    //         .then((doc) => {
    //             let userDataFilter = {
    //                 names: doc.data().names,
    //                 lastname: doc.data().lastname,
    //                 email: doc.data().email
    //             }
    //             dataCheckout.user = userDataFilter;
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             res.status(500).json({ error: err.code });
    //         });
    //     // ask for device info
    //     db
    //         .doc(`/devices/${req.params.deviceId}`)
    //         .get()
    //         .then((doc) => {
    //             let deviceDataFilter = {
    //                 deviceId: req.params.deviceId,
    //                 nameOfDevice: doc.data().nameOfDevice,
    //                 price: doc.data().price
    //             };
    //                 dataCheckout.device = deviceDataFilter;
    //                 console.log(dataCheckout);
    //                 // add final object in db
    //                 db.collection('checkouts').add(dataCheckout);
    //                 // send response from server
    //                 return res.json('done with the checkout');
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             res.status(500).json({ error: err.code });
    //         });
    //     } else {

    //     }
}

// post data for checkout to post in userAdventures
exports.postDataCheckOutAdventure = (req, res) => {

    // global var
    let dataCheckout = {};

    // put addiotional info for checkout
    let checkoutData = {
        userHandle: req.user.userHandle,
        createdAt: new Date().toISOString(),
        type: 'adventure',
        state:'pending'
    }
    dataCheckout = checkoutData;
    
    // address
    const newUserAdressToDelivery = {
        city: req.body.city,
        addressToDelivery: req.body.addressToDelivery,
        plastic: req.body.plastic
    };

    // add address to global var
    dataCheckout.address = newUserAdressToDelivery;
    // ask for user data
    db
        .doc(`/users/${req.user.userHandle}`)
        .get()
        .then((doc) => {
            let userDataFilter = {
                names: doc.data().names,
                lastname: doc.data().lastname,
                email: doc.data().email
            }
            dataCheckout.user = userDataFilter;
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
    // ask for adventure info
    db
    .doc(`/adventures/${req.params.adventureId}`)
    .get()
    .then((doc) => {
        let adventureDataFilter = {
            adventureId: req.params.adventureId,
            title: doc.data().title,
            price: doc.data().price
        };
            dataCheckout.adventure = adventureDataFilter;
            console.log(dataCheckout);
            // add final object in db
            db.collection('checkouts').add(dataCheckout);
            // send response from server
            return res.json('done with the checkout');
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
    });
}