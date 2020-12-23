import React, { Component } from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import './App.css';
// pages
import home from './views/home';
import signup from './views/signup';
import login from './views/login';
import vlog from './views/vlog';
import myHome from './views/myHome';
import myWorldDevices from './views/myWorld/myWorldDevices';
import devices from './views/store/devices';
import userDevice from './views/userDevice/userDevice';
import profileDetails from './views/profile/profileDetails';
import addCart from './views/profile/addCart';
import buys from './views/profile/buys';

// Components
import Header from './components/Header/Header';
import HeaderLinks from "./components/Header/HeaderLinks.js";
//import AuthRoute from './utilities/AuthRoute';

// jwt 
import jwtDecode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// axios
import axios from 'axios';
axios.defaults.baseURL = 'https://us-central1-sfdd-d8a16.cloudfunctions.net/api';
//axios.defaults.baseURL = 'http://localhost:5000/sfdd-d8a16/us-central1/api';

// token decode check exp to redirect on AuthRoute
const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = '/login'; // dont work
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        // for user data
        store.dispatch(getUserData());
    }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div> 
          <Router>
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
                <Route exact path="/store/devices" component={devices} />
                <Route exact path="/blog" component={vlog} />
                {/* auth paths */}
                <Route exact path="/myhome" component={myHome} />
                <Route exact path="/myworld/devices" component={myWorldDevices} />
                <Route exact path="/userdevice" component={userDevice}/>
                <Route exact path="/profileDetails" component={profileDetails} />
                <Route exact path="/addcart" component={addCart} />
                <Route exact path="/buys" component={buys} />
              </Switch>
            </div>
            {/* Header */}
            <Header
              brand="SFDD-H"
              rightLinks={<HeaderLinks />}
              fixed
              color="transparent"
              changeColorOnScroll={{
                height: 400,
                color: "white"
              }}
              // {...rest}
            />
          </Router>
        </div>
      </Provider>
    )
  }
}

export default App;

