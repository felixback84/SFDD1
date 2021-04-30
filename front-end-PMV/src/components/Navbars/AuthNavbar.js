import React from "react";
import { useLocation, Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Menu from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";
// @material-ui/icons components
import Clear from "@material-ui/icons/Clear";
import MenuIcon from "@material-ui/icons/Menu";
// routes
import routes from "routes.js";

// styles
import componentStyles from "assets/theme/components/auth-navbar.js";
const useStyles = makeStyles(componentStyles);

export default function AuthNavbar() {
  // setts
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // to open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // to close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // menu id
  const menuId = "responsive-menu-id";

  // loop to create list items
  const items = (routez) => {
    const authRoutes = routez.auth
    return authRoutes.map((prop,key)=>{
      if(prop.layout === "/auth" || prop.layout === ""){
        return(
          <ListItem
            component={Link}
            to={prop.layout + prop.path}
            onClick={handleMenuClose}
            classes={{
              root: classes.listItemRoot,
            }}
            selected={
              location.pathname === prop.layout + prop.path 
            }
            key={key}
          >
            <Box
              component={prop.icon}
              width="1.25rem!important"
              height="1.25rem!important"
              marginRight=".5rem!important"
            />
            {prop.name}
          </ListItem>
        )
      }
    })
  }

  // list items rag
  const ListObject = (
    <Box
      display="flex"
      alignItems="center"
      width="auto"
      component={List}
      className={classes.flexDirectionColumn}
    >
      {items(routes)}
    </Box>
  );

  return (
    <>
      <AppBar position="absolute" color="transparent" elevation={0}>
        <Toolbar>
          <Container
            display="flex!important"
            justifyContent="space-between"
            alignItems="center"
            marginTop=".75rem"
            component={Box}
            maxWidth="xl"
          >
            <Box
              alt="..."
              height="30px"
              component="img"
              className={classes.headerImg}
              src={require("assets/img/brand/argon-react-white.png").default}
            />
            {/* In md devices */}
            <Hidden mdUp implementation="css">
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleMenuOpen}
                aria-controls={menuId}
                aria-haspopup="true"
              >
                <Box
                  component={MenuIcon}
                  color={theme.palette.white.main}
                  width="2rem!important"
                  height="2rem!important"
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={handleMenuClose}
                classes={{ paper: classes.menuPaper }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  paddingLeft="1.25rem"
                  paddingRight="1.25rem"
                  paddingBottom="1rem"
                  className={classes.outlineNone}
                >
                  <Box
                    alt="..."
                    height="36px"
                    component="img"
                    className={classes.headerImg}
                    src={require("assets/img/brand/argon-react.png").default}
                  />
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleMenuClose}
                    aria-controls={menuId}
                    aria-haspopup="true"
                  >
                    <Box
                      component={Clear}
                      width="2rem!important"
                      height="2rem!important"
                    />
                  </IconButton>
                </Box>
                <Box
                  component={Divider}
                  marginBottom="1rem!important"
                  marginLeft="1.25rem!important"
                  marginRight="1.25rem!important"
                />
                {/* Auth menu */}
                {ListObject}
              </Menu>
            </Hidden>
            {/* in sm devices */}
            <Hidden smDown implementation="css">
              {/* Auth menu */}
              {ListObject}
            </Hidden>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
