import React, { Component, Fragment } from 'react'
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Skeleton from "components/Loaders/Skeleton.js";
// components
import TitleSection from "./TitleSection";
import ProfileData from "./ProfileData";
import UserDeviceData from "./UserDeviceData";
import LiveDataSetsOverview from "./LiveDataSetsOverview";
import ProfileMatches from "./ProfileMatches";
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
        {/* ProfileMatchesrelevant data */}
        <GridItem xs={12} sm={12} md={6}>
          <ProfileMatches thingid={userDevice.thingId}/>
        </GridItem>
        {/* liveDataSets relevant data */}
        <GridItem xs={12} sm={12} md={6}>
          <LiveDataSetsOverview thingid={userDevice.thingId}/>
        </GridItem>
        {/* device relevant data */}
        <GridItem xs={12} sm={12} md={6}>
          <UserDeviceData userdevice={userDevice} />
        </GridItem>
      </Fragment>
    );

    // markup of my home
    let myHome = !loading ? (
      <div>
        {/* Header */}
        <Parallax image={require("assets/img/bg0.jpg")}/>
        {/* data cards */}
        {/* <div className={classNames(classes.main, classes.mainRaised)}> */}
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
      // </div> 
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



