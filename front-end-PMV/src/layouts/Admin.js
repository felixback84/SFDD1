import React, { useState } from 'react';
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
// import FormControl from "@material-ui/core/FormControl";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import InputLabel from "@material-ui/core/InputLabel";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// @material-ui/icons components
// import Search from "@material-ui/icons/Search";

// Redux stuff
import { connect } from 'react-redux';

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import NavbarDropdown from "components/Dropdowns/NavbarDropdown.js";

// routes
import routes from "routes.js";

// styles
import componentStyles from "assets/theme/layouts/admin.js";
const useStyles = makeStyles(componentStyles);

const Admin = (props) => {

  // setts & style
  const classes = useStyles();
  const location = useLocation();

  // scroll
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // mainContent.current.scrollTop = 0;
  }, [location]);

	// routes
  const getRoutesAdmin = (routes) => {
		const adminRoutes = routes.admin
    return adminRoutes.map((prop, key) => {
      if (prop.layout === "/admin") {
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

  const getRoutesProfile = (routes) => {
		const adminProfileRoutes = routes.profile
    return adminProfileRoutes.map((prop, key) => {
      if (prop.layout === "/admin") {
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

	// brand
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  }; 
  
  // menu admin parts to sidebar
  const adminRoutes = {
    admin: routes.admin,
    social: routes.social
  }
  
  // check if the user is auth
  const resultLayoutUserDevicesAdmin = () => {
    if(props.authenticated === true && props.credentials.type === "dynamic"){
      return (
        <>
          <>
            {/* the sibebar */}
            <Sidebar
              routes={adminRoutes}
              logo={{
                innerLink: "/admin/index",
                imgSrc: require("../assets/img/brand/argon-react.png").default,
                imgAlt: "...",
              }}
              dropdown={<NavbarDropdown/>}
                //input={
                //   // search box
                //   <FormControl variant="outlined" fullWidth>
                //     <InputLabel htmlFor="outlined-adornment-search-responsive">
                //       Search
                //     </InputLabel> 
                //     <OutlinedInput
                //       id="outlined-adornment-search-responsive"
                //       type="text"
                //       endAdornment={
                //         <InputAdornment position="end">
                //           <Box
                //             component={Search}
                //             width="1.25rem!important"
                //             height="1.25rem!important"
                //           />
                //         </InputAdornment>
                //       }
                //       labelWidth={70}
                //     />
                //   </FormControl> 
                // }
            />
            {/* the content */}
            <Box position="relative" className={classes.mainContent}>
              {/* Navbar Admin*/} 
              <AdminNavbar 
                brandText={getBrandText(location.pathname)} 
              />
              {/* Routes */}
              <Switch>
                {getRoutesAdmin(routes)}
                {getRoutesProfile(routes)} 
                {/* <Redirect from="*" to="/admin/index" /> */}
              </Switch>
              <Container
                maxWidth={false}
                component={Box}
                classes={{ root: classes.containerRoot }}
              >
                {/* Footer */}
                <AdminFooter />
              </Container>
            </Box>
          </>
        </>
      );
    }
  } 

  // final after authentication
  return(
    <>
      {resultLayoutUserDevicesAdmin()}
    </>
  )
};

// redux state
const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  credentials: state.user.credentials
})

export default connect(mapStateToProps)(Admin);
