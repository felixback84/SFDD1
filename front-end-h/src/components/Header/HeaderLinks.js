/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import FaceIcon from '@material-ui/icons/Face';
import GamesIcon from '@material-ui/icons/Games';
import NotificationsIcon from '@material-ui/icons/Notifications';
import StorefrontIcon from '@material-ui/icons/Storefront';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
// styles
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  // styles
  const classes = useStyles();
  return (
    // welcome to sfdd
    <List className={classes.list}>
      {/*  --------- not logged users --------- */}
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
            color="transparent"
            className={classes.navLink}
          >
            <Link to="/store/devices" className={classes.link}>
              <StorefrontIcon className={classes.icons} /> Devices
            </Link>
          </Button>
      </ListItem>
      {/*  --------- logged in users --------- */}
      {/* myHome */}
      <ListItem className={classes.listItem} to="/myhome">
          <Button
            color="transparent"
            className={classes.navLink}
          >
            <Link to="/myhome" className={classes.link}>
              <HomeIcon className={classes.icons} /> My Home
            </Link>
          </Button>
      </ListItem>
      {/* userDevice */}
      <ListItem className={classes.listItem}>
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
      {/* notifications */}
      <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
          >
            <NotificationsIcon className={classes.icons} />
            Notifications
          </Button>
      </ListItem>
      {/* myProfile */}
      <ListItem className={classes.listItem}>
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
              My Profile 
            </Link>,
            <Link to="/profile/addcart" className={classes.dropdownLink}>
              Add Cart
            </Link>,
            <Link to="profile/buys" className={classes.dropdownLink}>
              My Buys
            </Link>,
          ]}
        />
      </ListItem>
    </List>
  );
}
