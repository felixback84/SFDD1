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

const Guest = () => {
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
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/guest") {
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

  return (
    <>
      <div className="main-content" ref={mainContent}>
        
      </div>
      
    </>
  );
};

export default Guest;
