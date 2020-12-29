import React, { Component } from 'react'
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections
import ContactUsSection from "./ContactUsSection";

// styles
import styles from "assets/jss/material-kit-react/views/landingPage.js";
const useStyles = styles;

class home extends Component {
  render() {
    //const classes = useStyles();
    const { classes } = this.props;
    return (
      <div>
        <Parallax filter image={require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Your Story Starts With Us.</h1>
                <h4>
                  Every landing page needs a small description after the big bold
                  title, that{"'"}s why we added this text here. Add here all the
                  information that can make you or your product create the first
                  impression.
                </h4>
                <br />
                <Button
                  color="danger"
                  size="lg"
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-play" />
                  Watch video
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            {/* contact us */}
            <ContactUsSection /> 
          </div>
        </div>
      </div>      
    )
  }
}

export default withStyles(useStyles)(home);
