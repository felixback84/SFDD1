import React, { Component, Fragment } from "react";
// mui stuff
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Badge from "components/Badge/Badge.js";
// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// components
import ArraysListBadge from "./ArraysListBadge";
// Redux stuff
import { connect } from 'react-redux';
// icons

// styles
import teamsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
const useStyles = teamsStyle;

class ProfileMatches extends Component{
	render(){
		// redux state
		const {
			classes, 
			thingLiveDataSets:{
				top5Coords,
			}
		} = this.props;

		// map list
		let list = top5Coords.map(top5Coord => 
			<GridItem xs={12} sm={12} md={12}>
				{/* searchingMode */}
				<Card color="success">
					<CardBody color>
						<Grid container justify="space-around">
							<Grid item xs={12}>
								{top5Coord.coords.lat}
								{top5Coord.coords.lon}
								{top5Coord.thingId}
							</Grid>
						</Grid>
					</CardBody>
				</Card>
			</GridItem>
		)
		// dayjs
		dayjs.extend(relativeTime);

		return (
			<div className={classes.container}>
				<GridContainer>
					<Card profile>
						{list}
					</Card>	
				</GridContainer>
			</div>
		)
	}
}

// connect to global state in redux
const mapStateToProps = (state) => ({
    thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets
});

export default connect(mapStateToProps)(withStyles(useStyles)(ProfileMatches));