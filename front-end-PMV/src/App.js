import React, { Component } from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import './App.css';

// styles
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "assets/theme/theme.js";

// plugins
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

// Components
import Auth from './layouts/Auth.js'
import Admin from './layouts/Admin.js'
import Guest from './layouts/Guest.js'
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

// styles
//const useStyles = landingPageStyle;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <div> 
            <Router> 
              <div className="container">
                <Switch>
                  <Route path="/guest" render={(props) => <Guest {...props} />} />
                  <Route path="/auth" render={(props) => <Auth {...props} />} />
                  <Route path="/admin" render={(props) => <Admin {...props} />} />
                </Switch> 
              </div>
            </Router>
          </div>
        </Provider>
      </ThemeProvider>
    )
  }
}

export default App;


