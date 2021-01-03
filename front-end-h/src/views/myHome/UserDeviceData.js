/*eslint-disable*/
import React, { Component } from "react";

// mui stuff
import { withStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Muted from "components/Typography/Muted.js";

// styles
import teamsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
const useStyles = teamsStyle;

class UserDeviceData extends Component {

  render(){

    const {
      classes, 
      userdevice:{
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
                  <Divider variant="middle" />
                  <h4 className={classes.cardTitle}>ThingId: {thingId}</h4>
                  <Divider variant="middle" />
                  <Muted>
                    <h4 className={classes.cardCategory}>Name of device: {nameOfDevice}</h4>
                  </Muted>
                  <Divider variant="middle" />
                  <p className={classes.description}>
                    Device description: {description}
                  </p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      
    )
  }
}

export default (withStyles(useStyles)(UserDeviceData));