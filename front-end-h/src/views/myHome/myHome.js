import React, { Component } from 'react'
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Skeleton from "components/Loaders/Skeleton.js";
// components
import ProfileData from "./ProfileData";
import UserDeviceData from "./UserDeviceData";
import TitleSection from "./TitleSection";
// Redux stuff
import { connect } from 'react-redux';
import { getUserDevices } from '../../redux/actions/userDevicesActions';
// styles
import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";

const useStyles = {
    landingPageStyle,
    
  };

class myHome extends Component {

  // trigger redux action
  componentDidMount() {
    this.props.getUserDevices(); 
  }

  render() {
    
    // redux state
    const {
      classes, 
      loading, 
      userDevices
    } = this.props;

    // map the list of one device
    let mapUserDeviceHeader = userDevices.map(userDevice => 
      <Parallax filter image={require("assets/img/bg0.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              {/* title */}
              <TitleSection/>
            </GridItem>
            <GridItem xs={6} sm={6} md={6}>
              {/* user relevant data */}
              <ProfileData/>
            </GridItem>
            <GridItem xs={6} sm={6} md={6}>
              {/* device relevant data */}
              <UserDeviceData userdevice={userDevice}/>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
    );

    // markup of my home
    let myHome = !loading ? (
      <div>
        {/* Header */}
        {mapUserDeviceHeader}
      </div> 
    ) : (
      <Skeleton/>
    );

    return (
      <div>
        {myHome}
      </div>
    )
  }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
  userDevices: state.userDevices1.userDevices,
  ui: state.ui
});

export default connect(mapStateToProps,{getUserDevices})(withStyles(useStyles)(myHome));



