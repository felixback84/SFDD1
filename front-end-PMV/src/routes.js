// @material-ui/icons
// unauth icons
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import StoreRoundedIcon from '@material-ui/icons/StoreRounded';
import TocRoundedIcon from '@material-ui/icons/TocRounded';
// auth icos
import Dashboard from "@material-ui/icons/Dashboard";
// search
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ExtensionRoundedIcon from '@material-ui/icons/ExtensionRounded';
import FlipToBackRoundedIcon from '@material-ui/icons/FlipToBackRounded';
// graphs
import DonutSmallRoundedIcon from '@material-ui/icons/DonutSmallRounded';
// notifs
import NotificationsActiveRoundedIcon from '@material-ui/icons/NotificationsActiveRounded';
import SettingsCellRoundedIcon from '@material-ui/icons/SettingsCellRounded';
// user
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import PaymentRoundedIcon from '@material-ui/icons/PaymentRounded';
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import DirectionsRun from "@material-ui/icons/DirectionsRun";
// shopping car
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
// social
import FlashOn from "@material-ui/icons/FlashOn";

/////////////// views
// unauthenticated views
import landingPage from './views/landingPage/landingPage';
import devices from './views/store/devices';
import signup from './views/signup/signup';
import login from './views/login/login';
import vlog from './views/vlog/vlog';

// authenticates views
// dashboard
import dashboard from './views/dashboard/dashboard';
// user device
import userDevice from './views/userDevice/userDevice'
// finder 
import byStaticDevicesProducts from './views/finder/byStaticDevicesProducts'
import byStaticDevicesTags from './views/finder/byStaticDevicesTags'
import byTagsStaticDevicesMtsRange from './views/finder/byTagsStaticDevicesMtsRange'
import byProductsStaticDevicesMtsRange from './views/finder/byProductsStaticDevicesMtsRange'
// charts
import charts from './views/charts/charts'
// notifications
import notificationsFromUser from './views/notifications/notificationsFromUser'
import notificationsFromStatics from './views/notifications/notificationsFromStatics'
import notificationsFromStaticsProducts from './views/notifications/notificationsFromStaticsProducts'
import notificationsFromUserDevice from './views/notifications/notificationsFromUserDevice'
// profile
import profileDetails from './views/profile/profileDetails';
import addCardByUser from './views/profile/addCardByUser';
import buysByUser from './views/profile/buysByUser';
// shopping cart
import shoppingCart from './views/shoppingCart/shoppingCart';

const routes = {
  //////////////////////////////////////////////////// guest
  guest:[
    {
      path: "/",
      name: "Landing Page",
      icon: HomeRoundedIcon,
      component: landingPage,
      layout: "/guess",
      submenu: false,
      single: false
    },
    {
      path: "/store/devices",
      name: "Devices Store",
      icon: StoreRoundedIcon,
      component: devices,
      layout: "/guess",
      submenu: true,
      single: false
    },
    {
      path: "/blog",
      name: "Vlog",
      icon: TocRoundedIcon,
      component: vlog,
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
      icon: LockOpenRoundedIcon,
      component: login,
      layout: "/auth",
      submenu: false,
      single: false
    },
    {
      path: "/signup",
      name: "SignUp",
      icon: AssignmentRoundedIcon,
      component: signup,
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
      name: "Dashboard",
      icon: Dashboard,
      component: dashboard,
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
      icon: SettingsCellRoundedIcon,
      component: userDevice,
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
      icon: SearchRoundedIcon,
    },
    {
      path: "/finder/byproducts",
      name: "Products Finder",
      icon: ExtensionRoundedIcon,
      component: byStaticDevicesProducts,
      layout: "/admin",
      submenu: true,
      single: false
    },
    {
      path: "/finder/bytags",
      name: "Tags Finder",
      icon: StoreRoundedIcon,
      component: byStaticDevicesTags,
      layout: "/admin",
      submenu: true,
      single: false
    },
    {
      path: "/finder/bytagsrange",
      name: "Mts Range Tags Finder",
      icon: FlipToBackRoundedIcon,
      component: byTagsStaticDevicesMtsRange,
      layout: "/admin",
      submenu: true,
      single: false
    },
    {
      path: "/finder/byproductsrange",
      name: "Mts Range Products Finder",
      icon: FlipToBackRoundedIcon,
      component: byProductsStaticDevicesMtsRange,
      layout: "/admin",
      submenu: true,
      single: false
    },

    // graphs
    {
      divider: true,
    },
    {
      title: "Charts",
    },
    {
      path: "/charts",
      name: "Stadistical charts",
      icon: DonutSmallRoundedIcon,
      component: charts,
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
      icon: NotificationsActiveRoundedIcon,
    },
    {
      path: "/notifications/user",
      name: "User Notifications",
      icon: FaceRoundedIcon,
      component: notificationsFromUser,
      layout: "/admin",
      submenu: true,
      single: false
    },
    {
      path: "/notifications/statics",
      name: "Statics Notifications",
      icon: StoreRoundedIcon,
      component: notificationsFromStatics,
      layout: "/admin",
      submenu: true,
      single: false
    },
    {
      path: "/notifications/products",
      name: "Porducts Notifications",
      icon: ExtensionRoundedIcon,
      component: notificationsFromStaticsProducts,
      layout: "/admin",
      submenu: true,
      single: false
    },
    {
      path: "/notifications/userdevice",
      name: "User Device Notifications",
      icon: SettingsCellRoundedIcon,
      component: notificationsFromUserDevice,
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
      icon: ShoppingCartRoundedIcon,
      component: shoppingCart,
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
      icon: AssignmentIndRoundedIcon,
      component: profileDetails,
      layout: "/admin/profile",
      submenu: true,
      single: false
    },
    {
      path: "/addcardbyuser",
      name: "Profile Details",
      icon: PaymentRoundedIcon,
      component: addCardByUser,
      layout: "/admin/profile",
      submenu: true,
      single: false
    },
    {
      path: "/buysbyuser",
      name: "Buys Details",
      icon: AccountBalanceWalletRoundedIcon,
      component: buysByUser,
      layout: "/admin/profile",
      submenu: true,
      single: false
    },
    {
      divider: true,
    },
    {
      name: "Logout",
      icon: DirectionsRun,
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
      name: "Facebook",
      href:
        "https://www.creative-tim.com/learning-lab/material-ui/overview/argon-dashboard?ref=admui-admin-sidebar",
      name: "Getting started",
      icon: FlashOn,
    },
  ]
};

export default routes;
