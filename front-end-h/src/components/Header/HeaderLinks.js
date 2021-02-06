import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";

// components
import MenuUserDevices from "./MenuUserDevices";
import MenuStaticDevices from "./MenuStaticDevices";
import MenuUnthenticatedUsers from "./MenuUnthenticatedUsers";

// Redux stuff
import { connect } from 'react-redux';

// styles
import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
const useStyles = styles;

class HeaderLinks extends Component {
  render(){
    // redux state
    const { 
      classes,
      authenticated,  
      credentials:
        {
          imgUrl, 
          names, 
          lastname,
          type
        }
    } = this.props;

    {/*  --------- not logged users --------- */} 
    if(!authenticated){
      let menuUnthenticatedUsers = 
      <List className={classes.list + " " + classes.mlAuto}>
        <MenuUnthenticatedUsers/>
      </List>
        return(menuUnthenticatedUsers); 
    } else {
      {/*  --------- logged users --------- */} 
      switch(type){
        case "dynamic":
          let menuUserDevices =  
          <List className={classes.list + " " + classes.mlAuto}>
            <MenuUserDevices 
              names={names} 
              lastname={lastname} 
              imgurl={imgUrl}
            />
          </List>
          return(menuUserDevices);
        case "static":
          let menuStaticDevices = 
          <List className={classes.list + " " + classes.mlAuto}>
            <MenuStaticDevices 
              names={names} 
              lastname={lastname} 
              imgurl={imgUrl}
            />
          </List>
          return(menuStaticDevices);
        default:
          return null;
      }
    }
  }  
}

// proptypes
HeaderLinks.protoTypes = {
  authenticated: PropTypes.bool.isRequired
}  

// redux state
const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  credentials: state.user.credentials
})

export default connect(mapStateToProps)(withStyles(useStyles)(HeaderLinks));

