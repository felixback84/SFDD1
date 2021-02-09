import React, { Component } from 'react'
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// components
import ColorPicker from "../components/ColorPicker.js";

// styles
import teamsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
const useStyles = teamsStyle;

class HeartbeatUIDataSens extends Component {
    
    render() {

        // props
        const {
            classes,
            colorvalue,
            createdat,
            motorspeed
        } = this.props;

        return (
            <div>
                <Card profile>
                    <ColorPicker>
                        {/* color */}
                        <h3 className={classes.cardTitleWhite}>
                            Last message in: {createdat}
                        </h3>
                        <Divider variant="fullWidth" />
                        {/* last message */}
                        <p className={classes.cardDescription}>
                            {motorspeed}
                        </p>
                        <Divider variant="fullWidth" />
                        {/* motor */}
                        {/* <p className={classes.cardDescription}>
                            {description}
                        </p> */}
                    </ColorPicker>
                    <CardFooter profile className={classes.justifyContent}/>
                </Card>
            </div>
        )
    }
}

export default (withStyles(useStyles)(HeartbeatUIDataSens));
