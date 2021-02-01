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

// Redux stuff
import { connect } from 'react-redux';

// styles
import teamsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
const useStyles = teamsStyle;

class ProfileData extends Component {

  render(){

    const {
      classes, 
      user:{
        credentials: { 
          userHandle, 
          type,
          createdAt, 
          imgUrl, 
          bio, 
          location, 
          email,
          lastname,
          names,
          phone,
          userId
        },
      }
    } = this.props;

    return(
      
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={2} sm={3} md={3}/>
          <GridItem xs={4} sm={6} md={6}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={imgUrl} alt={userHandle} />
                </a>
              </CardAvatar>
              <CardBody>
                <Divider variant="fullWidth" />
                <h4 className={classes.cardTitle}>Names: {names} {lastname}</h4>
                <Divider variant="fullWidth" />
                <Muted>
                  <h4 className={classes.cardCategory}>Username: {userHandle}</h4>
                </Muted>
                <Divider variant="fullWidth" />
                <p className={classes.description}>
                  Bio: {bio}
                </p>
              </CardBody>
              <CardFooter profile className={classes.justifyContent}>
                <Chip
                  label="User Info"
                  color="secondary"
                />
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={4} sm={3} md={3}/>
        </GridContainer>
      </div>
      
    )
  }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(useStyles)(ProfileData));