import React, { Component } from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import './App.css';
// pages
import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';
import myWorldDevices from './pages/myWorld/myWorldDevices';
import myWorldAdventures from './pages/myWorld/myWorldAdventures';
import storeDevices from './pages/store/storeDevices';
import storeAdventures from './pages/store/storeAdventures';
import userDevice from './pages/userDevice/userDevice';
import profile from './pages/profile/profile';
import addCart from './pages/profile/addCart';
import buys from './pages/profile/buys';

// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import themeObject from './utilities/theme';

// Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './utilities/AuthRoute';

// jwt 
import jwtDecode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// axios
import axios from 'axios';
import { createMuiTheme } from '@material-ui/core';
axios.defaults.baseURL = 'https://us-central1-sfdd-d8a16.cloudfunctions.net/api';
//axios.defaults.baseURL = 'http://localhost:5000/sfdd-d8a16/us-central1/api';

// theme
const theme = createMuiTheme(themeObject);

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
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div>
            <Router>
              <div className="container">
                <Switch>
                  <Route exact path="/login" component={login} />
                  <Route exact path="/signup" component={signup} />
                  <Route exact path="/" component={home} />
                  {/* auth paths */}
                  <Route exact path="/myworld/devices" component={myWorldDevices} />
                  <Route exact path="/myworld/adventures" component={myWorldAdventures} />
                  <Route exact path="/store/devices" component={storeDevices} />
                  <Route exact path="/store/adventures" component={storeAdventures} />
                  <Route exact path="/userdevice" component={userDevice}/>
                  <Route exact path="/profile" component={profile} />
                  <Route exact path="/addcart" component={addCart} />
                  <Route exact path="/buys" component={buys} />
                </Switch>
              </div>
              <Navbar/>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App;

