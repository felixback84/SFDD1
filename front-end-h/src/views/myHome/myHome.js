import React, { Component, Fragment } from 'react'
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Skeleton from "components/Loaders/Skeleton.js";
// components
import ProfileData from "./sections/ProfileData";
import UserDeviceData from "./sections/UserDeviceData";
import LiveDataSetsOverview from "./sections/LiveDataSetsOverview";
import ProductsData from "./sections/ProductsData"
// Redux stuff
import { connect } from 'react-redux';
import { getUserDevices } from '../../redux/actions/userDevicesActions';
// styles
import myHomeStyles from "assets/jss/material-kit-pro-react/views/myHomeStyles.js"
const useStyles = myHomeStyles;

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
      <Fragment key={userDevice.thingId}>
        {/* liveDataSets relevant data */}
        <GridItem xs={12} sm={12} md={6}>
          <LiveDataSetsOverview thingid={userDevice.thingId}/>
        </GridItem>
        {/* device relevant data */}
        <GridItem xs={12} sm={12} md={6}>
          <UserDeviceData userdevice={userDevice} />
        </GridItem> 
        {/* products relevant data */}
        <GridItem xs={12} sm={12} md={12}>
          <ProductsData/>
        </GridItem> 
      </Fragment> 
    );   
    
    // markup of my home
    let myHome = !loading ? (
      <div>
        {/* Header */}
        <Parallax image={require("assets/img/bg0.jpg")}/>
        {/* data cards */}
        <div className={classes.sectionGray}>
          <div className={classes.container}>
            <GridContainer >
              {/* user relevant data */}
              <GridItem xs={12} sm={12} md={12}>
                <ProfileData/>
              </GridItem>
              {/* userDevice box & liveDataSets Overview*/}
              {mapUserDeviceHeader}
            </GridContainer>
          </div>
        </div>
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



