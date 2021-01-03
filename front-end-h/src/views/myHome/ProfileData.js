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
            <GridItem xs={12} sm={12} md={12}>
              <Card profile>
                <CardAvatar profile>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={imgUrl} alt={userHandle} />
                  </a>
                </CardAvatar>
                <CardBody>
                  <Divider variant="middle" />
                  <h4 className={classes.cardTitle}>Names: {names} {lastname}</h4>
                  <Divider variant="middle" />
                  <Muted>
                    <h4 className={classes.cardCategory}>Username: {userHandle}</h4>
                  </Muted>
                  <Divider variant="middle" />
                  <p className={classes.description}>
                    Bio: {bio}
                  </p>
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
  user: state.user
});

export default connect(mapStateToProps)(withStyles(useStyles)(ProfileData));