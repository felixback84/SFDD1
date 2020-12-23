/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { CloudDownload } from "@material-ui/icons";
import FaceIcon from '@material-ui/icons/Face';

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
          buttonIcon={FaceIcon}
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
            <Link to="/store/devices" className={classes.dropdownLink}>
              <CloudDownload className={classes.icons} /> Devices
            </Link>
          </Button>
      </ListItem>
      {/* vlog */}
      <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
          >
            <Link to="/store/devices" className={classes.dropdownLink}>
              <CloudDownload className={classes.icons} /> Vlog
            </Link>
          </Button>
      </ListItem>
      {/*  --------- social --------- */}
      {/* twitter */}
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      {/* facebook */}
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      {/* ig */}
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
