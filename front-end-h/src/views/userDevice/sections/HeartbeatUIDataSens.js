import React, { Component, Fragment } from 'react'
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { green, yellow, red, pink, blue } from '@material-ui/core/colors';
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Danger from "components/Typography/Danger.js";
// icons
import TrendingUp from "@material-ui/icons/TrendingUp";
// components
import GoogleMaps from '../components/GoogleMaps'
import ArraysListBadge from '../components/ArraysListBadge'
// styles
import styles from "assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.js";
const useStyles = styles;

class HeartbeatUIDataSens extends Component {

	// color picker backs
	colorPicker = (colorMix) => {
		// color obj to compare
		const colorsDB = {
			green:{r:76,g:175,b:80},
			yellow:{r:255,g:235,b:59},
			red:{r:244,g:67,b:54},
			pink:{r:233,g:30,b:99},
			blue:{r:33,g:150,b:243},
		}
		// colors backs
		const colors = {
			green: green[500],
			yellow: yellow[500],
			red: red[500],
			pink: pink[500],
			blue: blue[500]
		}
		// underscore
		let _ = require('underscore');
		// check
		if(_.isEqual(colorMix,colorsDB.green)){
			console.log("green")
			return colors.green
		} else if(_.isEqual(colorMix,colorsDB.yellow)){
			return colors.yellow
		} else if(_.isEqual(colorMix,colorsDB.red)){
			return colors.red
		} else if(_.isEqual(colorMix,colorsDB.pink)){
			return colors.pink
		} else if(_.isEqual(colorMix,colorsDB.blue)){
			return colors.blue
		} 
	}

    render() {

        // props
        const {
            classes,
            colorvalue,
            createdat,
            motorspeed,
			mtsbetweendevices,
			top5coorddata
		} = this.props;

		let matchMarkup = top5coorddata.map(top5coorddataRes=>{
			return(
				<Fragment>
					<CardHeader>
						<GoogleMaps coords={top5coorddataRes.coords}/>
					</CardHeader>
					<CardBody style={{backgroundColor: this.colorPicker(colorvalue)}}>
						{/* last message */}
						<h3 className={classes.cardTitleWhite}>
							Last message in: {createdat}
						</h3>
						<Divider variant="fullWidth" />
						{/* motor speed */}
						<h4>
							Buzz nivel: {motorspeed}
						</h4>
						{/* company name */}
						<Divider variant="fullWidth" />
						<Danger>
							<h3 className={classes.cardCategory}>
								<TrendingUp /> {top5coorddataRes.userCredentials.companyName}
							</h3>
						</Danger>
						{/* profile to */}
						<Divider variant="fullWidth" />
						<ArraysListBadge 
							key={top5coorddata.thingid} 
							profiletomatch={top5coorddataRes.matchDataResults}
						/>
						{/* bio */}
						<Divider variant="fullWidth" />
						<p>{top5coorddataRes.userCredentials.bio}</p>
						{/* mtsBetweenDevices */}
						<Divider variant="fullWidth" />
						<h4 className={classes.cardTitle}>
							{mtsbetweendevices}
						</h4>
					</CardBody> 
					<CardFooter>
						<div className={classes.author}>
							<a href="#pablo" onClick={e => e.preventDefault()}>
								<img
									src={top5coorddataRes.userCredentials.imgUrl}
									alt={top5coorddataRes.userCredentials.userHandle}
									className={classes.avatar}
								/>
								<span>{top5coorddataRes.userCredentials.names} {top5coorddataRes.userCredentials.lastname}</span>
							</a>
						</div>
					</CardFooter>
				</Fragment>
			)
		})
		
        return (
            <div>
                <Card profile>
					{matchMarkup}
                </Card>
            </div>
        )
    }
}

export default (withStyles(useStyles)(HeartbeatUIDataSens));


