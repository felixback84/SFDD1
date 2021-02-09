/*eslint-disable*/
import React, { Component } from "react";
 
// mui stuff
import { withStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Muted from "components/Typography/Muted.js";

// components
import ProfileMatches from "./ProfileMatches";
import SwitchButtonToUserDevice from "../components/SwitchButtonToUserDevice"

// styles
import teamsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
const useStyles = teamsStyle;

class UserDeviceData extends Component {

  render(){

    const {
      classes, 
      userdevice:{
        userDeviceId,
        active,
        createdAt,
        deviceId,
        thingId,
        device:{
          ageRate,
          badgeUrl,
          coverUrl,
          description,
          nameOfDevice
        }
      }
    } = this.props;

    return(
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={badgeUrl} alt={thingId} />
                </a>
              </CardAvatar>
              <CardBody>
                <Chip
                  label="Property Info"
                  color="secondary"
                />
                {/* switch button */}
                <Divider variant="fullWidth" />
                <SwitchButtonToUserDevice 
                  labelToSwitch={nameOfDevice} 
                  userdeviceid={userDeviceId}/>
                <Divider variant="fullWidth" />
                <h4 className={classes.cardTitle}>Property Id: {userDeviceId}</h4>
                <Divider variant="fullWidth" />
                <Muted>
                  <h4 className={classes.cardCategory}>Name of device: {nameOfDevice}</h4>
                </Muted>
                <Divider variant="fullWidth" />
                <p className={classes.description}>
                  Device description: {description}
                </p>
              </CardBody>
              <CardFooter profile className={classes.justifyContent}/>
            </Card>
          </GridItem>

          {/* matches between statics and dynamics */}
          <GridItem xs={12} sm={12} md={12}>
            <Card profile>
              <CardBody>
                <Chip
                  label="Matches"
                  color="secondary"
                /> 
                <ProfileMatches thingid={thingId}/>
              </CardBody>
            </Card>  
          </GridItem>
        </GridContainer>
      </div> 
    )
  }
}

export default (withStyles(useStyles)(UserDeviceData));