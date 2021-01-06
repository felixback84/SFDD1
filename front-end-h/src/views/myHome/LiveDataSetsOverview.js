/*eslint-disable*/
import React, { Component } from "react";

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

// components
import GoogleMaps from "./GoogleMaps";

// icons
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';

// Redux stuff
import { connect } from 'react-redux';
import { heartbeatThingSyncDataWithLiveDB } from '../../redux/actions/heartbeatUIActions';

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
                          color: green[A400]
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
                {/* thingId */}
                <Divider variant="fullWidth" />
                <h4 className={classes.cardTitle}>ThingId: {thingId}</h4>
                <Divider variant="fullWidth" />
                {/* connection status */}
                {
                  connectionStatus == true ? ( 
                    <span>
                      Connection status:
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
                    </span>
                  ) : ( 
                    <span>
                      Connection status:
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
                    </span>
                  )
                }
                <Divider variant="fullWidth" />
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
                <Divider variant="fullWidth" />
                {/* last seen */}
                <Muted>
                  <h4 className={classes.cardCategory}>
                    Last messsage: {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                  </h4>
                </Muted>
                <Divider variant="fullWidth" />
                {/* cooords */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
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
                  </GridItem>
                </GridContainer>  
              </CardBody>
              <CardFooter profile className={classes.justifyContent}>
                <Chip
                  label="Thing Info"
                  variant="outlined"
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