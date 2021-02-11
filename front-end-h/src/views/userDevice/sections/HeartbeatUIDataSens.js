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
            motorspeed,
            mtsbetweendevices
        } = this.props;

        // let minimalMts = mtsbetweendevices.reduce((minimalMts,minMts)=>{
        //     return minMts.meters < minimalMts.meters ? minMts : minimalMts; 
        // },mtsbetweendevices[0]);

        // sort arr asc
        let arrSort = mtsbetweendevices.sort((a, b) => {
            return a.meters - b.meters;
        });

        console.log(arrSort)

        return (
            <div>
                <Card profile>
                    <ColorPicker colorvalue={colorvalue} content={
                        <div>
                            <Divider variant="fullWidth" />
                            {/* color */}
                            <h3 className={classes.cardTitleWhite}>
                                Last message in: {createdat}
                            </h3>
                            <Divider variant="fullWidth" />
                            {/* motor speed */}
                            <p className={classes.cardDescription}>
                                Buzz nivel: {motorspeed}
                            </p>
                            <Divider variant="fullWidth" />
                            {/* min value in mts between devices */}
                            <div>
                                <p className={classes.cardDescription}>
                                    Your next match is in: {arrSort[0].meters} mts.
                                </p>
                            </div>
                        </div>
                    }/> 
                    <CardFooter profile className={classes.justifyContent}/>
                </Card>
            </div>
        )
    }
}

export default (withStyles(useStyles)(HeartbeatUIDataSens));
