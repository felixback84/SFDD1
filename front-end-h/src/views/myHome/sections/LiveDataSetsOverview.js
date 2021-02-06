/*eslint-disable*/
import React, { Component, Fragment } from "react";

// mui stuff
import { withStyles } from "@material-ui/core/styles";
import { red, green } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Badge from "components/Badge/Badge.js";
 
// components
import GoogleMaps from "../components/GoogleMaps";
import ArraysListBadge from "../components/ArraysListBadge";

// icons
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import BatteryStdRoundedIcon from '@material-ui/icons/BatteryStdRounded';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

// Redux stuff
import { connect } from 'react-redux';
import { heartbeatThingSyncDataWithLiveDB } from '../../../redux/actions/heartbeatUIActions';

// styles
import teamsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
const useStyles = teamsStyle;

class LiveDataSetsOverview extends Component {

  //redux action
  componentWillMount(){
    const thingId = this.props.thingid;
    this.props.heartbeatThingSyncDataWithLiveDB(thingId);
  } 

  render(){

    const {
      classes, 
      thingLiveDataSets:{
        //////////////////////// from here db&ux data
        thingId,
        profileToMatch, 
        top5Coords,
        searchingMode,
        ///////////////////////// from here device data
        active,
        createdAt,
        coords, 
        colorValue, 
        connectionStatus,
        batteryLife
      }
    } = this.props;

    // dayjs
    dayjs.extend(relativeTime);

    return(
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card profile>
              <CardAvatar profile>
                {
                  active == "true" ? ( 
                    <PowerSettingsNewIcon 
                      className={classes.icons} 
                      style={
                        {
                          minWidth: "130px",
                          minHeight: "130px",
                          color: green[500]
                        }
                      }
                    />
                  ) : ( 
                    <PowerSettingsNewIcon 
                      className={classes.icons} 
                      style={
                        {
                          minWidth: "130px",
                          minHeight: "130px",
                          color: red[500]
                        }
                      }
                    />
                  )
                }
              </CardAvatar>
              {/* content */}
              <CardBody>
                <Chip
                  label="Thing Info"
                  color="secondary"
                />
                {/* connection status */}
                <Card color="warning">
                  <CardBody color>
                    { connectionStatus == true ? (
                      <Grid container  justify="space-between">
                        <Grid item xs={12}>
                          <div className={classes.icon}> 
                            <WifiIcon color="secondary" fontSize="large"/>
                          </div>
                          <h4 className={classes.cardCategorySocialWhite}>
                            Connection status: Connected
                          </h4>
                        </Grid>
                      </Grid>
                    ) : (
                        <Grid container  justify="space-between">
                          <Grid item xs={12}>
                            <div className={classes.icon}>
                              <WifiOffIcon color="secondary" fontSize="large"/>
                            </div>
                            <h4 className={classes.cardCategorySocialWhite}>
                              Connection status: Disconnected
                            </h4>
                          </Grid>
                        </Grid> 
                      )
                    }
                  </CardBody>
                </Card>
                
                {/* searchingMode */}
                <Card color="warning">
                  <CardBody color>
                    <Grid container justify="space-between">
                      <Grid item xs={5}>
                        <div className={classes.icon}> 
                          <LocationSearchingIcon color="secondary" fontSize="large"/>
                        </div>
                        <h4 className={classes.cardCategorySocialWhite}>
                          {`You are searching mode is: ${searchingMode}`}
                        </h4>
                      </Grid>
                      <Divider orientation="vertical" flexItem />
                      {/* thingId */}
                      <Grid item xs={5}>
                        <div className={classes.icon}> 
                          <FingerprintIcon color="secondary" fontSize="large"/>
                        </div>
                        <h4 className={classes.cardCategorySocialWhite}>
                          {`The ID of your thing is: ${thingId}`}
                        </h4>
                      </Grid>
                    </Grid> 
                  </CardBody>
                </Card>

                {/* battery life */}
                <Card color="warning">
                  <CardBody color>
                    <Grid container  justify="space-between">
                      <Grid item xs={5}>
                        <div className={classes.icon}>
                          <BatteryStdRoundedIcon color="secondary" fontSize="large"/>
                        </div>
                        <h4 className={classes.cardCategorySocialWhite}>
                          Battery life: {batteryLife}%
                        </h4>
                      </Grid>
                      <Divider orientation="vertical" flexItem />
                      <Grid item xs={5}>
                        <div className={classes.icon}>
                          <RemoveRedEyeIcon color="secondary" fontSize="large"/>
                        </div>
                        <h4 className={classes.cardCategorySocialWhite}>
                          Last messsage: {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </h4>
                      </Grid>
                    </Grid> 
                  </CardBody>
                </Card>

                {/* profile to match */}
                <Card color="warning">
                  <CardBody color>
                  <Chip
                    label="My Profile"
                    color="secondary"
                  />
                    <Grid container  justify="space-between">
                      <Grid item xs={12}>
                        {/* tags */}
                        <ArraysListBadge profiletomatch={profileToMatch}/>
                      </Grid>
                    </Grid> 
                  </CardBody>
                </Card>

                {/* cooords */}
                {/* title */}
                <h4 className={classes.cardCategory}>Last know position:</h4>
                {/* name point */}
                <Badge color="primary">
                  {`Point name: ${coords.nameOfPoint}`}
                </Badge>  
                {/* lat */}
                <Badge color="info">
                  {`Latitude: ${coords.lat}`}
                </Badge> 
                {/* lon */}
                <Badge color="rose">
                  {`Longitude: ${coords.lon}`}
                </Badge> 
                {/* Google Maps */}
                <GoogleMaps coords={coords}/>
              </CardBody>
              {/* footer */}
              <CardFooter profile className={classes.justifyContent}>
                
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
  thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets
});

export default connect(mapStateToProps,{heartbeatThingSyncDataWithLiveDB})(withStyles(useStyles)(LiveDataSetsOverview));