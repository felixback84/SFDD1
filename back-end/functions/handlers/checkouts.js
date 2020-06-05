// firebase
const { db } = require('../utilities/admin');
require('dotenv').config();
const fetch = require('node-fetch');
const md5 = require('md5');

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

    // static global vars
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
    const clientIp;

    // ip address of client
    const ipAddressOfClient = async () => {
        // app.get('http://gd.geobytes.com/GetCityDetails')
        // .then((res)=>{
        //     res.data.geobytesremoteip
        // }) 
        const ipUrl = `http://gd.geobytes.com/GetCityDetails`;
        const ipResponse = await fetch(ipUrl);
        const ipJsonData = await ipResponse.json(); 
        clientIp = ipJsonData.geobytesremoteip
    };

    // userAgent detection
    const UA = navigator.userAgent;

    // signature generation
    const signature = {
        apiKey: apiKey,
        merchantId: accountId,
        referenceCode: `${checkoutData.device.nameOfDevice}:  ${checkoutData.device.deviceId} - ${checkoutData.user.userId} `,
        tx_value: checkoutData.device.price,
        currency: currency,
    }; 

    const signatureGen = (signature) =>{
        const signatureString = `${signature.apiKey} ~ `;
        md5(signatureString);
    }

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
            name: req.body.cc.name,
            paymentMethod: req.body.cc.paymentMethod,
            dniType: req.body.cc.dniType,
            dniNumber: req.body.cc.dniNumber
        }
    };

    // ask to Firebase
    const dataCheckout = {}
    // ask for userCredentials
    db
        .doc(`/users/${req.user.userHandle}`)
        .get()
        .then((doc) => {
            let userDataFilter = {
                names: doc.data().names,
                lastname: doc.data().lastname,
                email: doc.data().email,
                phone:doc.data().phone,
                userId: doc.data().userId
            }
            dataCheckout.user = userDataFilter;
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
    // ask for device info
    db
        .doc(`/devices/${req.params.deviceId}`)
        .get()
        .then((doc) => {
            let deviceDataFilter = {
                deviceId: req.params.deviceId,
                nameOfDevice: doc.data().nameOfDevice,
                price: doc.data().price
            };
                dataCheckout.device = deviceDataFilter;
                console.log(dataCheckout);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });

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
                referenceCode: `${checkoutData.device.nameOfDevice}:  ${checkoutData.device.deviceId} - ${checkoutData.user.userId} `, 
                description: `Buy of ${checkoutData.device.nameOfDevice} device for ${checkoutData.user.names} ${checkoutData.user.lastname} with ID: ${checkoutData.user.userId}`, 
                language: language, 
                signature: signatureGen,
                notifyUrl: notifyUrl, 
                additionalValues: {
                        TX_VALUE: {
                        value: checkoutData.device.price, 
                        currency: currency 
                    },
                        TX_TAX: {
                        value: 0, 
                        currency: currency 
                    },
                        TX_TAX_RETURN_BASE: { 
                        value: 0,
                        currency: currency
                    }
                },
                buyer: {
                    merchantBuyerId: checkoutData.user.userId,
                    fullName: `${checkoutData.user.names} ${checkoutData.user.lastname}`, 
                    emailAddress: checkoutData.user.email, 
                    contactPhone: checkoutData.user.phone, 
                    dniNumber: checkoutData.user.userId,
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
                fullName: userData.cc.name, 
                emailAddress: userData.billing.email,
                contactPhone: userData.billing.phone,
                dniType :userData.cc.dniType,
                dniNumber: userData.cc.dniNumber,
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
                number: userData.cc.number, 
                securityCode: userData.cc.securityCode, 
                expirationDate: userData.cc.expirationDate, 
                name: userData.cc.name 
            },
            extraParameters: {
                INSTALLMENTS_NUMBER: 1 
            },
            type: type, 
            paymentMethod: userData.cc.paymentMethod, 
            paymentCountry: paymentCountry, 
            deviceSessionId: "vghs6tvkcle931686k1900o6e1", 
            ipAddress: clientIp, 
            cookie: "pt1t38347bs6jc9ruv2ecpv7o2",
            userAgent: UA
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