import React, { Component } from 'react'
// mui stuff
import { withStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Danger from "components/Typography/Danger.js";
// icons
import TrendingUp from "@material-ui/icons/TrendingUp";
// components
import GoogleMaps from '../components/GoogleMaps'
import ArraysListBadge from '../components/ArraysListBadge'
// styles
import teamsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.js";
const useStyles = teamsStyle;

class CardForDataOfStaticMatches extends Component {
	render() {
		const {
			classes,
			credentials,
			coords,
			thingid,
			profiletomatch,
			mtsbetweendevice,
			key
		} = this.props
		return ( 
			<div>
				<Card key={key}>
					<CardHeader>
						<GoogleMaps coords={coords}/>
					</CardHeader>
					<CardBody>
						<Danger>
							<h3 className={classes.cardCategory}>
								<TrendingUp /> {credentials.companyName}
							</h3>
						</Danger>
						{/* profile to */}
						<ArraysListBadge key={thingid} profiletomatch={profiletomatch}/>
						{/* bio */}
						<p>{credentials.bio}</p>
						{/* mtsBetweenDevices */}
						<h4 className={classes.cardTitle}>
							{mtsbetweendevice}
						</h4>
					</CardBody>
					<CardFooter>
						<div className={classes.author}>
							<a href="#pablo" onClick={e => e.preventDefault()}>
								<img
									src={credentials.imgUrl}
									alt={credentials.userHandle}
									className={classes.avatar}
								/>
								<span>{credentials.names} {credentials.lastname}</span>
							</a>
						</div>
					</CardFooter>
				</Card>
			</div>
		)
	}
}

export default (withStyles(useStyles)(CardForDataOfStaticMatches));
