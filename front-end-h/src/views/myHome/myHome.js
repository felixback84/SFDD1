import React, { Component, Fragment } from 'react'
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Skeleton from "components/Loaders/Skeleton.js";
// components
import ProfileData from "./sections/ProfileData";
import UserDeviceData from "./sections/UserDeviceData";
import LiveDataSetsOverview from "./sections/LiveDataSetsOverview";
import ProductsData from "./sections/ProductsData"
import GoogleMaps from './components/GoogleMaps'
// Redux stuff
import { connect } from 'react-redux';
import { getUserDevices } from '../../redux/actions/userDevicesActions';
import { heartbeatThingSyncDataWithLiveDB } from '../../redux/actions/heartbeatUIActions';
// styles
import myHomeStyles from "assets/jss/material-kit-pro-react/views/myHomeStyles.js"
const useStyles = myHomeStyles;

// const filterThingId = (data) => {
//   let id = data.thingId
//   console.log(`id:${id}`)
//   return id
//this.props.userDevices.filter(filterThingId)
// }

class myHome extends Component { 

  // trigger redux action
  componentDidMount() {
    // userDevices redux action
    this.props.getUserDevices()
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userDevices !== prevProps.userDevices) {
      // liveDataSets & products redux action
      this.props.heartbeatThingSyncDataWithLiveDB(this.props.userDevices[0].thingId);
    }
  }

  render() { 
    // redux state
    const {
      classes, 
      loading, 
      userDevices,
      thingLiveDataSets:{
        coords
      }
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
        <GoogleMaps coords={coords}/>
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
  //thingId: state.userDevices1.userDevices[0].thingId,
  thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
  ui: state.ui
});

export default connect(mapStateToProps,{getUserDevices,heartbeatThingSyncDataWithLiveDB})(withStyles(useStyles)(myHome));



