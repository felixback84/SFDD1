/*eslint-disable*/
import React, { Component, Fragment } from "react";

// mui stuff
import { withStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
import { red, green } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';

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
import Muted from "components/Typography/Muted.js";
import Badge from "components/Badge/Badge.js";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

// components
import GoogleMaps from "./GoogleMaps";

// icons
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';

// Redux stuff
import { connect } from 'react-redux';
import { heartbeatThingSyncDataWithLiveDB } from '../../redux/actions/heartbeatUIActions';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

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
                
                {/* searchingMode */}
                <SnackbarContent
                  message={
                    <span>
                      <b>Searching mode:</b> {`You are searching mode is:`}
                    </span>
                  }
                  icon={LocationSearchingIcon}
                />  

                {/* thingId */}
                <SnackbarContent
                  message={
                    <span>
                      <b>ThingId:</b> {`The ID of your thing is:`}
                    </span>
                  }
                  icon={FingerprintIcon}
                /> 
                
                {/* connection status */}
                <h4 className={classes.cardCategory}>Connection status:</h4>
                {
                  connectionStatus == true ? ( 
                    <Chip
                      icon={<WifiIcon 
                      className={classes.icons} 
                      style={
                        {
                          minWidth: "30px",
                          minHeight: "30px",
                          color: green[A400]
                        }
                      }
                      />}
                      label="Connected"
                      variant="outlined"
                    />
                  ) : ( 
                    <Chip
                    icon={<WifiOffIcon 
                      className={classes.icons} 
                      style={
                        {
                          minWidth: "30px",
                          minHeight: "30px",
                          color: red[500]
                        }
                      }
                    />}
                    label="Disconnected"
                    variant="outlined"
                    />
                  )
                }
                {/* <Divider variant="fullWidth" /> */}
                {/* battery life */}
                <Muted>
                  <h4 className={classes.cardCategory}>
                    Battery life: {batteryLife}%
                  </h4>
                </Muted>
                <CustomLinearProgress
                  variant="determinate"
                  color="warning"
                  value={batteryLife}
                  valueBuffer={batteryLife}
                  style={{ width: "100%", display: "inline-block", padding:"10px", marging: "10px"}}
                />
                {/* <Divider variant="fullWidth" /> */}
                {/* last seen */}
                <Muted>
                  <h4 className={classes.cardCategory}>
                    Last messsage: {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                  </h4>
                </Muted>
                {/* <Divider variant="fullWidth" /> */}
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
                {/* Profile to match */}
                <h4 className={classes.cardCategory}>Profile to match:</h4>
                <Chip
                  label={`Lucky number: ${profileToMatch.luckyNumber}`}
                  variant="outlined"
                />
                <Chip
                  label={`Your DC Hero: ${profileToMatch.dcHero}`}
                  variant="outlined"
                />
                <Chip
                  label={`Cat lover: ${profileToMatch.cat + ''}`}
                  variant="outlined"
                />
              </CardBody>
              {/* footer */}
              <CardFooter profile className={classes.justifyContent}>
                <Chip
                  label="Thing Info"
                  color="secondary"
                />
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