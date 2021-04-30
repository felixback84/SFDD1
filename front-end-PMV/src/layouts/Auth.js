import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthHeader from "components/Headers/AuthHeader.js";
import AuthFooter from "components/Footers/AuthFooter.js";

// routes
import routes from "routes.js";

// styles
import componentStyles from "assets/theme/layouts/auth.js";
const useStyles = makeStyles(componentStyles);

const Auth = (props) => {
  const classes = useStyles();
  const mainContent = React.useRef(null);
  const location = useLocation(); 

  React.useEffect(() => {
    document.body.classList.add(classes.bgDefault);
    return () => {
      document.body.classList.remove(classes.bgDefault);
    };
  });
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routez) => {
    const authRoutes = routez.auth
    return authRoutes.map((prop, key) => {
      if (prop.layout === "/auth" || prop.layout === "") {
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

  // check if the user is auth
  const resultLayoutUserDevicesAdmin = () => {
    if(!props.authenticated){
      return (
        <>
          <div className="main-content" ref={mainContent}>
            {/* navbar to guest */}
            <AuthNavbar />
            {/* header to guest */}
            <AuthHeader />
            {/* Page content */}
            <Container
              component={Box}
              maxWidth="xl"
              marginTop="-8rem"
              paddingBottom="3rem"
              position="relative"
              zIndex="101"
            >
              <Box component={Grid} container justifyContent="center">
                <Switch>
                  {/* routes */}
                  {getRoutes(routes)}
                  <Redirect from="*" to="/auth/login" />
                </Switch>
              </Box>
            </Container>
          </div>
          {/* footer */}
          <AuthFooter />
        </>
      );
    }
  }

  // final return
  return(
    <>
      {resultLayoutUserDevicesAdmin()}
    </>
  )
};

export default Auth;

