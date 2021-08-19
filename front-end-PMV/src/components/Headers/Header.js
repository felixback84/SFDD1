import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
// components
import SearchingModeCardModeOne from '../../views/dashboard/components/modeOne/SearchingModeCardModeOne'
import SearchingModeCardModeTwo from '../../views/dashboard/components/modeTwo/SearchingModeCardModeTwo'
// import SearchingModeCardModeThree from '../../views/dashboard/components/modeThree/SearchingModeCardModeThree'
// import SearchingModeCardModeFour from '../../views/dashboard/components/modeFour/SearchingModeCardModeFour'
import SearchEngine from "../../views/dashboard/components/utils/SearchEngine/SearchEngine"

// icons
import GroupAdd from "@material-ui/icons/GroupAdd";
// styles
import componentStyles from "assets/theme/components/header.js";
const useStyles = makeStyles(componentStyles);

const Header = (props) => {
  // styles
  const classes = useStyles();
  
  return ( 
    <>
      <div className={classes.header}>
        <Container
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <div>
            <Grid container>
              <Grid item xl={3} lg={3} xs={12}>
                {/* modeOne */}
                <SearchingModeCardModeOne 
                  title="modeOne"
                  icon={GroupAdd}
                  mode="modeOne" 
                  thingid={props.thingid}
                /> 
              </Grid>
              <Grid item xl={3} lg={3} xs={12}>
                {/* modeTwo */}
                <SearchingModeCardModeTwo
                  title="modeTwo"
                  icon={GroupAdd}
                  mode="modeTwo"
                  thingid={props.thingid}
                  // idofspecificstaticdevice={props.idofspecificstaticdevice}
					        // idofspecificproduct={props.idofspecificproduct}
                />
              </Grid>
              <Grid item xl={3} lg={3} xs={12}>
                {/* modeThree */}
                {/* <SearchingModeCardModeThree
                  title="modeThree"
                  icon={GroupAdd}
                  mode="modeThree"
                /> */}
              </Grid>
              <Grid item xl={3} lg={3} xs={12}>
                {/* modeFour */}
                {/* <SearchingModeCardModeFour
                  title="modeFour"
                  icon={GroupAdd}
                  mode="modeFour"
                  idofspecificstaticdevice={props.idofspecificstaticdevice}
					        idofspecificproduct={props.idofspecificproduct}
                /> */}
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
