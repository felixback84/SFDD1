const routes = {
    //////////////////////////////////////////////////// guest
    guest:[
        {
        path: "/",
        name: "Landing Page",
        icon: "HomeRoundedIcon",
        component: "landingPage",
        layout: "/guess",
        submenu: false,
        single: false
        },
        {
        path: "/store/devices",
        name: "Devices Store",
        icon: "StoreRoundedIcon",
        component: "devices",
        layout: "/guess",
        submenu: true,
        single: false
        },
        {
        path: "/blog",
        name: "Icons",
        icon: "TocRoundedIcon",
        component: "vlog",
        layout: "/guess",
        submenu: false,
        single: false
        }
    ],
    ///////////////////////////////////////////// auth
    auth:[
        {
        path: "/login",
        name: "LogIn",
        icon: "LockOpenRoundedIcon",
        component: "login",
        layout: "/auth",
        submenu: false,
        single: false
        },
        {
        path: "/signup",
        name: "SignUp",
        icon: "AssignmentRoundedIcon",
        component: "signup",
        layout: "/auth",
        submenu: false,
        single: false
        }
    ],
    ///////////////////////////////////////////// admin
    admin:[
        // dash
        {
        path: "/dashboard",
        name: "Maps",
        icon: "Dashboard",
        component: "dashboard",
        layout: "/admin",
        submenu: false,
        single: false
        },

        // user device
        {
        divider: true,
        },
        {
        title: "Device",
        },
        {
        path: "/userdevice",
        name: "Device",
        icon: "SettingsCellRoundedIcon",
        component: "userDevice",
        layout: "/admin",
        submenu: false,
        single: true
        },

        // finder
        {
        divider: true,
        },
        {
        title: "Finder",
        },
        {
        name: "Finder",
        icon: "SearchRoundedIcon",
        },
        {
        path: "/finder/byproducts",
        name: "Products Finder",
        icon: "ExtensionRoundedIcon",
        component: "byStaticDevicesProducts",
        layout: "/admin",
        submenu: true,
        single: false
        },
        {
        path: "/finder/bytags",
        name: "Tags Finder",
        icon: "StoreRoundedIcon",
        component: "byStaticDevicesTags",
        layout: "/admin",
        submenu: true,
        single: false
        },
        {
        path: "/finder/bytagsrange",
        name: "Mts Range Tags Finder",
        icon: "FlipToBackRoundedIcon",
        component: "byTagsStaticDevicesMtsRange",
        layout: "/admin",
        submenu: true,
        single: false
        },
        {
        path: "/finder/byproductsrange",
        name: "Mts Range Products Finder",
        icon: "FlipToBackRoundedIcon",
        component: "byProductsStaticDevicesMtsRange",
        layout: "/admin",
        submenu: true,
        single: false
        },

        // graphs
        {
        path: "/charts",
        name: "Stadistical charts",
        icon: "DonutSmallRoundedIcon",
        component: "charts",
        layout: "/admin",
        submenu: false,
        single: false
        },

        // notifications
        {
        divider: true,
        },
        {
        title: "Notifications",
        },
        {
        name: "Notifications",
        icon: "NotificationsActiveRoundedIcon",
        },
        {
        path: "/notifications/user",
        name: "User Notifications",
        icon: "FaceRoundedIcon",
        component: "notificationsFromUser",
        layout: "/admin",
        submenu: true,
        single: false
        },
        {
        path: "/notifications/statics",
        name: "Statics Notifications",
        icon: "StoreRoundedIcon",
        component: "notificationsFromStatics",
        layout: "/admin",
        submenu: true,
        single: false
        },
        {
        path: "/notifications/products",
        name: "Porducts Notifications",
        icon: "ExtensionRoundedIcon",
        component: "notificationsFromStaticsProducts",
        layout: "/admin",
        submenu: true,
        single: false
        },
        {
        path: "/notifications/userdevice",
        name: "User Device Notifications",
        icon: "SettingsCellRoundedIcon",
        component: "notificationsFromUserDevice",
        layout: "/admin",
        submenu: true,
        single: false
        },

        // shopping cart
        {
        divider: true,
        },
        {
        title: "Shopping Cart",
        },
        {
        path: "/shoppingcart",
        name: "Shopping Cart",
        icon: "ShoppingCartRoundedIcon",
        component: "shoppingCart",
        layout: "/admin",
        submenu: false,
        single: true
        },
    ],

    // profile
    profile:[
        {
        path: "/profiledetails",
        name: "Profile Details",
        icon: "AssignmentIndRoundedIcon",
        component: "profileDetails",
        layout: "/admin/profile",
        submenu: true,
        single: false
        },
        {
        path: "/addcardbyuser",
        name: "Profile Details",
        icon: "PaymentRoundedIcon",
        component: "addCardByUser",
        layout: "/admin/profile",
        submenu: true,
        single: false
        },
        {
        path: "/buysbyuser",
        name: "Buys Details",
        icon: "AccountBalanceWalletRoundedIcon",
        component: "buysByUser",
        layout: "/admin/profile",
        submenu: true,
        single: false
        },
        {
        divider: true,
        },
        {
        name: "Logout",
        icon: "DirectionsRun",
        layout: "/admin/profile",
        submenu: true,
        single: false
        }
    ],

    // social
    social:[
        {
        divider: true,
        },
        {
        title: "Social",
        },
        {
        href:
            "https://www.creative-tim.com/learning-lab/material-ui/overview/argon-dashboard?ref=admui-admin-sidebar",
        name: "Getting started",
        icon: "FlashOn",
        },
    ]
};

// const admin = routes.admin
// const profile = routes.profile

// admin.map((props)=>{
//     console.log(`admin:${JSON.stringify(props)}`)
// })

// profile.map((props)=>{
//     console.log(`profile:${JSON.stringify(props)}`)
// })

const createLinks = (routez) => {
    for(let item in routez){
        // checker
        if(routez.hasOwnProperty(item)){
            // loop in arr
            routez[item].map((prop, key) => { 
                // print
                //console.log(`routez[item]:${routez[item]}`)
                // visual style checker
                if (console.log(`divider btn: ${prop.divider}`)) {
                    console.log(`divider btn print: ${prop.divider}`)
                } else if (console.log(`prop.title: ${prop.title}`)) {
                    console.log(`prop.title print: ${prop.title}`)
                } else if (console.log(`prop.path: ${prop.path}`)) {
                    console.log(`prop.path print: ${prop.path}`)
                } else if (console.log(`prop.name: ${prop.name}`)) {
                    console.log(`prop.name print: ${prop.name}`)
                } else if (console.log(`prop.icon: ${prop.icon}`)) {
                    console.log(`prop.icon print: ${prop.icon}`)
                } else if (console.log(`prop.component: ${prop.component}`)) {
                    console.log(`prop.component print: ${prop.component}`)
                } else if (console.log(`prop.layout: ${prop.layout}`)) {
                    console.log(`prop.layout print: ${prop.layout}`)
                } else if (console.log(`prop.submenu: ${prop.submenu}`)) {
                    console.log(`prop.submenu print: ${prop.submenu}`)
                } else if (console.log(`prop.single: ${prop.single}`)) {
                    console.log(`prop.single print: ${prop.single}`)
                } else if (console.log(`prop.href: ${prop.href}`)) {
                    console.log(`prop.href print: ${prop.href}`)
                }
        
            })
        }    
    }
}    

createLinks(routes)

divider btn: undefined
prop.title: undefined
prop.path: /
prop.name: Landing Page
prop.icon: HomeRoundedIcon
prop.component: landingPage
prop.layout: /guess
prop.submenu: false
prop.single: false
prop.href: undefined

divider btn: undefined
prop.title: undefined
prop.path: /store/devices
prop.name: Devices Store
prop.icon: StoreRoundedIcon
prop.component: devices
prop.layout: /guess
prop.submenu: true
prop.single: false
prop.href: undefined

divider btn: undefined
prop.title: undefined
prop.path: /blog
prop.name: Icons
prop.icon: TocRoundedIcon
prop.component: vlog
prop.layout: /guess
prop.submenu: false
prop.single: false
prop.href: undefined


divider btn: undefined
prop.title: undefined
prop.path: /login
prop.name: LogIn
prop.icon: LockOpenRoundedIcon
prop.component: login
prop.layout: /auth
prop.submenu: false
prop.single: false
prop.href: undefined

divider btn: undefined
prop.title: undefined
prop.path: /signup
prop.name: SignUp
prop.icon: AssignmentRoundedIcon
prop.component: signup
prop.layout: /auth
prop.submenu: false
prop.single: false
prop.href: undefined


divider btn: undefined
prop.title: undefined
prop.path: /dashboard
prop.name: Maps
prop.icon: Dashboard
prop.component: dashboard
prop.layout: /admin
prop.submenu: false
prop.single: false
prop.href: undefined

divider btn: true
prop.title: undefined
prop.path: undefined
prop.name: undefined
prop.icon: undefined
prop.component: undefined
prop.layout: undefined
prop.submenu: undefined
prop.single: undefined
prop.href: undefined

divider btn: undefined
prop.title: Device
prop.path: undefined
prop.name: undefined
prop.icon: undefined
prop.component: undefined
prop.layout: undefined
prop.submenu: undefined
prop.single: undefined
prop.href: undefined

divider btn: undefined
prop.title: undefined
prop.path: /userdevice
prop.name: Device
prop.icon: SettingsCellRoundedIcon
prop.component: userDevice
prop.layout: /admin
prop.submenu: false
prop.single: true
prop.href: undefined

divider btn: true
prop.title: undefined
prop.path: undefined
prop.name: undefined
prop.icon: undefined
prop.component: undefined
prop.layout: undefined
prop.submenu: undefined
prop.single: undefined
prop.href: undefined

divider btn: undefined
prop.title: Finder
prop.path: undefined
prop.name: undefined
prop.icon: undefined
prop.component: undefined
prop.layout: undefined
prop.submenu: undefined
prop.single: undefined
prop.href: undefined

divider btn: undefined
prop.title: undefined
prop.path: undefined
prop.name: Finder
prop.icon: SearchRoundedIcon
prop.component: undefined
prop.layout: undefined
prop.submenu: undefined
prop.single: undefined
prop.href: undefined

divider btn: undefined
prop.title: undefined
prop.path: /finder/byproducts
prop.name: Products Finder
prop.icon: ExtensionRoundedIcon
prop.component: byStaticDevicesProducts
prop.layout: /admin
prop.submenu: true
prop.single: false
prop.href: undefined

divider btn: undefined
prop.title: undefined
prop.path: /finder/bytags
prop.name: Tags Finder
prop.icon: StoreRoundedIcon
prop.component: byStaticDevicesTags
prop.layout: /admin
prop.submenu: true
prop.single: false
prop.href: undefined

divider btn: undefined
prop.title: undefined
prop.path: /finder/bytagsrange
prop.name: Mts Range Tags Finder
prop.icon: FlipToBackRoundedIcon
prop.component: byTagsStaticDevicesMtsRange
prop.layout: /admin
prop.submenu: true
prop.single: false
prop.href: undefined

divider btn: undefined
prop.title: undefined
prop.path: /finder/byproductsrange
prop.name: Mts Range Products Finder
prop.icon: FlipToBackRoundedIcon
prop.component: byProductsStaticDevicesMtsRange
prop.layout: /admin
prop.submenu: true
prop.single: false
prop.href: undefined

divider btn: undefined
prop.title: undefined
prop.path: /charts
prop.name: Stadistical charts
prop.icon: DonutSmallRoundedIcon
prop.component: charts
prop.layout: /admin
prop.submenu: false
prop.single: false
prop.href: undefined

divider btn: true
prop.title: undefined
prop.path: undefined
prop.name: undefined
prop.icon: undefined
prop.component: undefined
prop.layout: undefined
prop.submenu: undefined
prop.single: undefined
prop.href: undefined

divider btn: undefined
prop.title: Notifications
prop.path: undefined
prop.name: undefined
prop.icon: undefined
prop.component: undefined
prop.layout: undefined
prop.submenu: undefined
prop.single: undefined
prop.href: undefined

divider btn: undefined
prop.title: undefined
prop.path: undefined
prop.name: Notifications
prop.icon: NotificationsActiveRoundedIcon
prop.component: undefined
prop.layout: undefined
prop.submenu: undefined
prop.single: undefined
prop.href: undefined

divider btn: undefined
prop.title: undefined
prop.path: /notifications/user
prop.name: User Notifications
prop.icon: FaceRoundedIcon
prop.component: notificationsFromUser
prop.layout: /admin
prop.submenu: true
prop.single: false
prop.href: undefined
divider btn: undefined
prop.title: undefined
prop.path: /notifications/statics
prop.name: Statics Notifications
prop.icon: StoreRoundedIcon
prop.component: notificationsFromStatics
prop.layout: /admin
prop.submenu: true
prop.single: false
prop.href: undefined
divider btn: undefined
prop.title: undefined
prop.path: /notifications/products
prop.name: Porducts Notifications
prop.icon: ExtensionRoundedIcon
prop.component: notificationsFromStaticsProducts
prop.layout: /admin
prop.submenu: true
prop.single: false
prop.href: undefined
divider btn: undefined
prop.title: undefined
prop.path: /notifications/userdevice
prop.name: User Device Notifications
prop.icon: SettingsCellRoundedIcon
prop.component: notificationsFromUserDevice
prop.layout: /admin
prop.submenu: true
prop.single: false
prop.href: undefined
divider btn: true
prop.title: undefined
prop.path: undefined
prop.name: undefined
prop.icon: undefined
prop.component: undefined
prop.layout: undefined
prop.submenu: undefined
prop.single: undefined
prop.href: undefined
divider btn: undefined
prop.title: Shopping Cart
prop.path: undefined
prop.name: undefined
prop.icon: undefined
prop.component: undefined
prop.layout: undefined
prop.submenu: undefined
prop.single: undefined
prop.href: undefined
divider btn: undefined
prop.title: undefined
prop.path: /shoppingcart
prop.name: Shopping Cart
prop.icon: ShoppingCartRoundedIcon
prop.component: shoppingCart
prop.layout: /admin
prop.submenu: false
prop.single: true
prop.href: undefined
divider btn: undefined
prop.title: undefined
prop.path: /profiledetails
prop.name: Profile Details
prop.icon: AssignmentIndRoundedIcon
prop.component: profileDetails
prop.layout: /admin/profile
prop.submenu: true
prop.single: false
prop.href: undefined
divider btn: undefined
prop.title: undefined
prop.path: /addcardbyuser
prop.name: Profile Details
prop.icon: PaymentRoundedIcon
prop.component: addCardByUser
prop.layout: /admin/profile
prop.submenu: true
prop.single: false
prop.href: undefined
divider btn: undefined
prop.title: undefined
prop.path: /buysbyuser
prop.name: Buys Details
prop.icon: AccountBalanceWalletRoundedIcon
prop.component: buysByUser
prop.layout: /admin/profile
prop.submenu: true
prop.single: false
prop.href: undefined
divider btn: true
prop.title: undefined
prop.path: undefined
prop.name: undefined
prop.icon: undefined
prop.component: undefined
prop.layout: undefined
prop.submenu: undefined
prop.single: undefined
prop.href: undefined
divider btn: undefined
prop.title: undefined
prop.path: undefined
prop.name: Logout
prop.icon: DirectionsRun
prop.component: undefined
prop.layout: /admin/profile
prop.submenu: true
prop.single: false
prop.href: undefined
divider btn: true
prop.title: undefined
prop.path: undefined
prop.name: undefined
prop.icon: undefined
prop.component: undefined
prop.layout: undefined
prop.submenu: undefined
prop.single: undefined
prop.href: undefined
divider btn: undefined
prop.title: Social
prop.path: undefined
prop.name: undefined
prop.icon: undefined
prop.component: undefined
prop.layout: undefined
prop.submenu: undefined
prop.single: undefined
prop.href: undefined
divider btn: undefined
prop.title: undefined
prop.path: undefined
prop.name: Getting started
prop.icon: FlashOn
prop.component: undefined
prop.layout: undefined
prop.submenu: undefined
prop.single: undefined
prop.href: https://www.creative-tim.com/learning-lab/material-ui/overview/argon-dashboard?ref=admui-admin-sidebar
