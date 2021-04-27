import React from "react";
import { Route} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
// routes
import routes from "routes.js";
// styles
import componentStyles from "assets/theme/components/navbar-dropdown.js";
const useStyles = makeStyles(componentStyles);

export default function NavbarDropdown() {

  // setts
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // routes
  const getRoutes = (routez) => {
    return routez.map((prop, key) => {
      if (prop.layout === "/admin/profile") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  // items menu
  const getItems = (routez) => {
    return routez.map((prop, key) => {
      return( 
        <Box
          display="flex!important"
          alignItems="center!important"
          component={MenuItem}
          onClick={handleMenuClose}
          key={key}
        >
          <Box
            component={prop.icon}
            width="1.25rem!important"
            height="1.25rem!important"
            marginRight="1rem"
            key={key}
          />
          <span>{prop.name}</span>
        </Box>
      )
    })
  }

  // to open
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // to close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // menu id
  const menuId = "primary-search-account-menu"; 

  // menu
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* routes */}
      {getRoutes(routes.profile)}
      {/* menu items ux */}
      <Typography
        variant="h6"
        component="h6"
        classes={{ root: classes.menuTitle }}
      >
        Welcome Lala
      </Typography>
      {/* menu items */}
      {getItems(routes.profile)}
    </Menu>
  );

  return (
    <>
      <Button
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
        classes={{
          label: classes.buttonLabel,
          root: classes.buttonRoot,
        }}
      >
        <Avatar
          alt="..."
          src={require("assets/img/theme/team-4-800x800.jpg").default}
          classes={{
            root: classes.avatarRoot,
          }}
        />
        <Hidden smDown>Jessica Jones</Hidden>
      </Button>
      {routes && renderMenu}
    </>
  );
}
