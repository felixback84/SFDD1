import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
// components
// import SearchEngine from "../../views/dashboard/components/utils/SearchEngine/SearchEngine"

// routes
import routes from "routes.js";

// @material-ui/icons components
import SearchIcon from "@material-ui/icons/Search";

// styles
import NavbarDropdown from "components/Dropdowns/NavbarDropdown.js";
import componentStyles from "assets/theme/components/admin-navbar.js";
const useStyles = makeStyles(componentStyles);

export default function AdminNavbar({ brandText }) {
  // styles classes
  const classes = useStyles();

  // mains menu items generator
  const createLinks = (routez) => {
    const singleLinks = routez.admin
    // loop obj
    return singleLinks.map((prop, key) => {
      if(prop.single){
        return(
          <IconButton 
            color="primary" 
            aria-label="upload picture"  
            component={Link} 
            to={prop.layout + prop.path}
            key={key}
          >
            <Box
              width="1.5rem!important"
              height="1.5rem!important"
              component={prop.icon}
            />
          </IconButton>
        )
      }
    }) 
  }

  return (
    <>
      <AppBar
        position="absolute"
        color="transparent"
        elevation={0}
        classes={{ root: classes.appBarRoot }}
      >
        <Toolbar disableGutters>
          <Container
            maxWidth={false}
            component={Box}
            classes={{ root: classes.containerRoot }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              marginTop="0.5rem"
            >
              <div>
                <Typography
                  className={classes.brandTitle}
                  variant="h4"
                  component="a"
                >
                  {brandText}
                </Typography>
              </div>
              <Box 
                display="flex" 
                alignItems="baseline" 
                width="auto"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  width="auto"
                  marginRight="1rem"
                  classes={{
                    root: classes.searchBox,
                  }}
                >
                  {/* search */}
                  {/* <SearchIcon className={classes.searchIcon} />
                  <InputBase
                    placeholder="Search"
                    classes={{
                      input: classes.searchInput,
                    }}
                  /> */}
                </Box>
                {/* mains menu items */}
                <Box 
                  paddingLeft="1.25rem"  
                >
                  {/* links */}
                  {createLinks(routes)}
                  {/* profile menu */}
                  <NavbarDropdown />
                </Box>
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
