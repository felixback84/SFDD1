import React, { Component, Fragment } from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

// @material-ui/icons
import FaceIcon from '@material-ui/icons/Face';
import GamesIcon from '@material-ui/icons/Games';
import NotificationsIcon from '@material-ui/icons/Notifications';
import StorefrontIcon from '@material-ui/icons/Storefront';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

// Redux stuff
import { connect } from 'react-redux';

// styles
import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
const useStyles = styles;

class HeaderLinks extends Component {
  render(){
    // redux state
    const { classes ,authenticated,  
      credentials:
        {
            imgUrl, 
            names, 
            lastname
        }
    } = this.props;

    return(
      <List className={classes.list + " " + classes.mlAuto}>
        {/*  --------- not logged users --------- */}
        {!authenticated ? (
          <Fragment>
            {/* welcome to sfdd */}
            <ListItem className={classes.listItem}>
              <CustomDropdown
                noLiPadding
                buttonText="Welcome to SFDD"
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent"
                }}
                buttonIcon={VpnKeyIcon}
                dropdownList={[
                  <Link to="/signup" className={classes.dropdownLink}>
                    Signup
                  </Link>,
                  <Link to="/login" className={classes.dropdownLink}>
                    Login
                  </Link>
                ]}
              />
            </ListItem> 
            {/* devices */}
            <ListItem className={classes.listItem}>
              <Button
                round
                color="rose"
                className={classes.navLink}
              >
                <Link to="/store/devices" className={classes.link} style={{textDecoration: "none", color:"white"}}>
                  <StorefrontIcon className={classes.icons} /> Devices
                </Link>
              </Button>
            </ListItem>
          </Fragment>
        ) : (
          <Fragment>
            <ListItem className={classes.listItem} to="/myhome">
              {/* myHome */}
              <Button
                color="transparent"
                className={classes.navLink}
              >
                <Link to="/myhome" className={classes.link} style={{textDecoration: "none", color:"white"}}>
                  <HomeIcon className={classes.icons} /> My Home
                </Link>
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
            {/* userDevice */}
              <CustomDropdown
                noLiPadding
                buttonText="My Device"
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent"
                }}
                buttonIcon={GamesIcon}
                dropdownList={[
                  <Link to="/userdevice/userdevice" className={classes.dropdownLink}>
                    My Device
                  </Link>,
                  <Link to="/userdevice/graphs" className={classes.dropdownLink}>
                    My Graphs
                  </Link>,
                  <Link to="/userdevice/datasets" className={classes.dropdownLink}>
                    My Data Sets
                  </Link>,
                ]}
              />
            </ListItem>
            <ListItem className={classes.listItem}>
            {/* notifications */}
              <Button
                color="transparent"
                className={classes.navLink}
              >
                <NotificationsIcon className={classes.icons} />
                Notifications
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
            {/* myProfile */}
              <CustomDropdown
                noLiPadding
                buttonText="My Profile"
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent"
                }}
                buttonIcon={FaceIcon}
                dropdownList={[
                  <Link to="/profile/profiledetails" className={classes.dropdownLink}>
                    <Chip
                      avatar={<Avatar alt={`${names} ${lastname}`} src={imgUrl} />}
                      label={`${names} ${lastname}`}
                      clickable
                      color="white"
                      variant="outlined"
                    />
                  </Link>,
                  <Link to="/profile/addcart" className={classes.dropdownLink}>
                    Add Cart
                  </Link>,
                  <Link to="profile/buys" className={classes.dropdownLink}>
                    My Buys
                  </Link>
                ]}
              />
            </ListItem>
          </Fragment>
        )}
      </List>
    );
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

