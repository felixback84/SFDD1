// firebase
const { db } = require('../utilities/admin');
const functions = require('firebase-functions');
// node fetch
const fetch = require('node-fetch');

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
exports.postDataCheckOutDevice = async (req, res) => {

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

                ///////////////////// SIDE SERVER FOR BUY WITH PAYU ////////////////////////////////
                
                // static global vars
                const language = "es";
                const command = "SUBMIT_TRANSACTION";
                const apiKey = functions.config().payu.apikey.key;
                const apiLogin = functions.config().payu.apilogin.key;
                const accountId = functions.config().payu.accountid.key;
                const notifyUrl = "http://www.tes.com/confirmation";
                const country = "CO";
                const paymentCountry = "CO";
                const currency = "COP";
                const type = "AUTHORIZATION_AND_CAPTURE";
                const postalCode = "000000";
                let signaturedEncoded;
                let merchantPayerId = 1;
                
                // data from client body
                const userData = {
                    // ...req.body
                    shippingAddress: {
                        street1: req.body.paymentData.shippingAddress.street1,
                        street2: req.body.paymentData.shippingAddress.street2,
                        city: req.body.paymentData.shippingAddress.city,
                        state: req.body.paymentData.shippingAddress.state,
                        phone: req.body.paymentData.shippingAddress.phone
                    },
                    billingAddress: {
                        street1: req.body.paymentData.billingAddress.street1,
                        street2: req.body.paymentData.billingAddress.street2,
                        city: req.body.paymentData.billingAddress.city,
                        state: req.body.paymentData.billingAddress.state,
                        phone: req.body.paymentData.billingAddress.phone
                    },
                    cc:{
                        number: req.body.paymentData.cc.number,
                        securityCode: req.body.paymentData.cc.securityCode, 
                        expirationDate: req.body.paymentData.cc.expirationDate, 
                        name: req.body.paymentData.cc.name,
                        paymentMethod: req.body.paymentData.cc.paymentMethod,
                        deviceSessionId: req.body.paymentData.cc.deviceSessionId,
                        cookie: req.body.paymentData.cc.cookie,
                        userAgent: req.body.paymentData.cc.userAgent,
                        ip: req.body.paymentData.cc.ip
                    }
                };    

                console.log(userData);

                //signature generation
                const signatureGen = {
                    apiKey: apiKey,
                    merchantId: accountId,
                    referenceCode: `${dataCheckout.device.nameOfDevice}:  ${dataCheckout.device.deviceId} - ${dataCheckout.user.userId}`,
                    tx_value: dataCheckout.device.price,
                    currency: currency
                }; 
                // md5
                const md5 = require('md5');
                const signatureString = `${signatureGen.apiKey}~${signatureGen.merchantId}~${signatureGen.referenceCode}~${signatureGen.tx_value}~${signatureGen.currency}`;
                signaturedEncoded = md5(signatureString);
                
                // data object to post in PAYU
                let allDataToPostInPayU = {
                    language: language, 
                    command: command, 
                    merchant: {
                        apiKey: apiKey, 
                        apiLogin: apiLogin 
                    },
                    transaction: {
                        order: {
                            accountId: accountId, 
                            referenceCode: `${dataCheckout.device.nameOfDevice}:  ${dataCheckout.device.deviceId} - ${dataCheckout.user.userId}`, 
                            description: `Buy of ${dataCheckout.device.nameOfDevice} device for ${dataCheckout.user.names} ${dataCheckout.user.lastname} with ID: ${dataCheckout.user.userId}`, 
                            language: language, 
                            signature: signaturedEncoded,
                            notifyUrl: notifyUrl, 
                            additionalValues: {
                                    TX_VALUE: {
                                        value: dataCheckout.device.price, 
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
                                merchantBuyerId: dataCheckout.user.userId,
                                fullName: `${dataCheckout.user.names} ${dataCheckout.user.lastname}`, 
                                emailAddress: dataCheckout.user.email, 
                                contactPhone: dataCheckout.user.phone, 
                                dniNumber: dataCheckout.user.userId,
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
                            merchantPayerId: merchantPayerId,
                            fullName: userData.cc.name, 
                            emailAddress: dataCheckout.user.email,
                            contactPhone: dataCheckout.user.phone,
                            dniNumber: "00000000",
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
                        deviceSessionId: userData.cc.deviceSessionId, 
                        ipAddress: userData.cc.ip, 
                        cookie: userData.cc.cookie,
                        userAgent: userData.cc.userAgent
                    },
                    test: false
                }

                //console.log(allDataToPostInPayU.transaction.order.additionalValues.TX_VALUE.value);
                //console.log(allDataToPostInPayU);
                //return res.json(allDataToPostInPayU);

                // post in payu
                let url = 'https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi';
                let options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(allDataToPostInPayU)
                }
                let response = await fetch(url, options);
                let succsses = await response.json(); // read response body and parse as JSON
                //return res.json(succsses);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
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