export default userData =   {
        personalInfo: {  
            _idUser: 123456789,
            name: "Ana Camila",
            lastname: "Arias Diaz",
            username: "AnaCamila",
            email: "ana.camila.hi@gmail.com",
            password: "eyJ0eXAiOiJKV1QiLCJhbsciOiJIUzI1NiJ9.eyJzdWIiOiIWeRtU2ZWMyYjUyNjgxNzE2YmXiNz",
            bio: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
            birthdate: 1580219792080,
            location: "Bogotá D.C"
            
        },
        medicalInfo: {  
            state: true, 
            typeOfMeals:{
                veggies: true,
                meats: true
            },  
            typeOfActivities:{
                inSchool: true,
                inWork: false,
                onOpenAir: true,
                inDoor: true,
            },       
        },
        tutorsInfo:{
            state: true,
            relatives:{
                mom:{
                    state: true,
                    name: "Laura Valeria",
                    lastname: "Garcia Amador",
                    email: "laura.garcia.amador@yahoo.com",
                    phone: 5713005256068
                },
                dad:{
                    state: true,
                    name: "Carlos Alberto",
                    lastname: "Talero Jácome",
                    email: "carlos.talero.jacome@gmail.com",
                    phone: 5713005256024
                },
                other:{
                    state: false,
                    relationship: "",
                    name: "",
                    lastname: "",
                    email: "",
                    phone: null
                },
            }
        },
        premiunContentSubs: {
            state: true,
            devices:[
                "hilda"
            ],
            categories:[
                "vegetarian",
                "in work", 
                "te para tres"
            ],
            favs:[
                "happy with less", 
                "Start always in good mood",
                "Kiss it all"
            ]
        },
        devicesSubs: {
            devices:[
                hilda
            ],
            hildaInfo: {
                registerOfDevice: {
                    _idDevice: 1234567890,
                    modelRef: 1234,
                    tokenDevice: "YjUyNjgxNzE2YmXiNzAxMzIiLCJpYXQiOjE0Mj10MjA0OT",
                    customName: "Mi Hilda del corazón"
                },
                battery:{
                    batteryCurrentState:100,
                    batteryCycles:[
                        1580219792080, 15802197920
                    ]
                },
                statesOfDevice: {
                    historyOfSessions:[
                        1580219792080, 1580219792080
                    ],
                    historyOfhibernations:[
                        1580219792080, 1580219792080
                    ]
                },  
                valuableData: {   
                    tempature:{
                        currentTemp:"70ºC",
                        historyOfTemps:[
                            1580219792080, 1580219792080
                        ]
                    },
                    cycles: {
                        cycle_1: {
                            msInfo: {
                                overviewDate: {
                                    beginDate: 1580219792080,
                                    endDate: 1580219792080,
                                },
                                symptoms: {
                                    headPain:{
                                        pain: true,
                                        painLevel: 5,
                                        red: true,
                                        datesOfPain:[
                                            1580219792080,
                                        ]
                                    },
                                    neckPain:{
                                        pain: false,
                                        painLevel: null,
                                        orange: false,
                                        datesOfPain:[]
                                    },    
                                    upperStomachPain:{
                                        pain: false,
                                        painLevel: null,
                                        yellow: true,
                                        datesOfPain:[]
                                    },
                                    lowerStomachpain: {
                                        pain: true,
                                        painLevel: 4,
                                        green: true,
                                        datesOfPain:[
                                            1580219792080
                                        ]
                                    },
                                    upperBackPain:{
                                        pain: false,
                                        painLevel: null,
                                        bluemarine: true,
                                        datesOfPain:[]
                                    },
                                    lowerBackPain:{
                                        pain: false,
                                        painLevel: null,
                                        purple: false,
                                        datesOfPain:[]
                                    },  
                                    feetsPain:{
                                        pain: false,
                                        painLevel: null,
                                        blue: false,
                                        datesOfPain:[]
                                    }    
                                }
                            }
                        }     
                    }   
                }    
            }
        }
    }