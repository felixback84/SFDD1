/*eslint-disable*/
import React, { Component } from "react";

// mui stuff
import { withStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
import { red, green } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";

// icons
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

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
        active,
        createdAt,
        coords, 
        colorValue, 
        profileToMatch, 
        top5Coords
      }
    } = this.props;

    return(
      
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card profile>
              <CardAvatar profile>
                {
                  active == "true" ? ( 
                    <Avatar aria-label="recipe" style={{backgroundColor: green[A400]}}>
                      <PowerSettingsNewIcon className={classes.icons} /> ON
                    </Avatar>
                  ) : (
                    <Avatar aria-label="recipe" style={{backgroundColor: red[500]}}>
                      <PowerSettingsNewIcon className={classes.icons} /> OFF
                    </Avatar>
                  )
                }
              </CardAvatar>
              <CardBody>
                <Divider variant="middle" />
                <h4 className={classes.cardTitle}>Mine since: {createdAt}</h4>
                <Divider variant="middle" />
                {/* <Muted>
                  <h4 className={classes.cardCategory}>Username: {userHandle}</h4>
                </Muted>
                <Divider variant="middle" />
                <p className={classes.description}>
                  Bio: {bio}
                </p> */}
              </CardBody>
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