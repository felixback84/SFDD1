import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import './App.css';

// nodejs library that concatenates classes
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// pages
import landing from './views/landingPage/landing';
import signup from './views/signup';
import login from './views/login';
import vlog from './views/vlog';

import myHome from './views/myHome/myHome';
import devices from './views/store/devices';
import userDevice from './views/userDevice/userDevice'; 
import graphs from './views/userDevice/maps/graphs';
import dataSets from './views/userDevice/dataSets';
import profileDetails from './views/profile/profileDetails';
import addCart from './views/profile/addCart';
import buys from './views/profile/buys';



// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

// styles
import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";

// Components
import Header from './components/Header/Header';
import HeaderLinks from "./components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
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
const useStyles = landingPageStyle;

class App extends Component {
  render() {
    // classes to css
    const { classes } = this.props;
    return (
      <Provider store={store}>
        <div> 
          <Router> 
            <div className="container">
              <Switch>
                <Route exact path="/" component={landing} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
                <Route exact path="/store/devices" component={devices} />
                <Route exact path="/blog" component={vlog} />
                {/* auth paths */}
                <Route exact path="/myhome" component={myHome} />
                <Route exact path="/userdevice/userdevice" component={userDevice}/>
                <Route exact path="/userdevice/graphs" component={graphs}/>
                <Route exact path="/userdevice/datasets" component={dataSets}/>
                <Route exact path="/profile/profiledetails" component={profileDetails} />
                <Route exact path="/profile/addcart" component={addCart} />
                <Route exact path="/profile/buys" component={buys} />
              </Switch>
            </div>
            {/* Header */}
            <Header
              brand="SFDD-H"
              links={<HeaderLinks />}
              fixed
              color="transparent"
              changeColorOnScroll={{
                height: 200,
                color: "dark"
              }}
            />
            {/* footer */}
            <Footer 
              content={
                <div>
                  <div className={classes.left}>
                    <List className={classes.list}>
                      {/* LMF */}
                      <ListItem className={classes.inlineBlock}>
                        <a
                          href="https://www.creative-tim.com/?ref=mkpr-landing"
                          target="_blank"
                          className={classes.block}
                        >
                          LMF
                        </a>
                      </ListItem>
                      {/* About us */}
                      <ListItem className={classes.inlineBlock}>
                        <a
                          href="https://www.creative-tim.com/presentation?ref=mkpr-landing"
                          target="_blank"
                          className={classes.block}
                        >
                          About us
                        </a>
                      </ListItem>
                      {/* Blog */}
                      <ListItem className={classes.inlineBlock}>
                        <a href="//blog.creative-tim.com/" className={classes.block}>
                          Blog
                        </a>
                      </ListItem>
                      {/* Conditions */}
                      <ListItem className={classes.inlineBlock}>
                        <a
                          href="https://www.creative-tim.com/license?ref=mkpr-landing"
                          target="_blank"
                          className={classes.block}
                        >
                          Licenses
                        </a>
                      </ListItem>
                    </List>
                  </div>
                  {/* Credits */}
                  <div className={classes.right}>
                    &copy; {1900 + new Date().getYear()} , made with{" "}
                    <Favorite className={classes.icon} /> by{" "}
                    <a
                      href="https://www.creative-tim.com/?ref=mkpr-landing"
                      target="_blank"
                      style={{textDecoration: "none"}}
                    >
                      La Maleta de Félix SAS
                    </a>{" "}
                    for pure fun.
                  </div>
                </div>
              }
            />
          </Router>
        </div>
      </Provider>
    )
  }
}

export default (withStyles(useStyles)(App));


