import React, { Component, Fragment } from 'react'
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// components
import Header from "../../components/Headers/Header.js";
import GoogleMap from "./sections/GoogleMap"
import SkeletonDashboard from "./components/SkeletonDashboard.js";

// Redux stuff
import { connect } from 'react-redux';
import { getUserDevices } from '../../redux/actions/userDevicesActions';
import { heartbeatThingSyncDataWithLiveDB } from '../../redux/actions/heartbeatUIActions';

// componets
import MarkerInfoWindowUserDevice from 'views/dashboard/components/modeOne/MarkerInfoWindowUserDevice'
import MarkerInfoWindowModeOne from 'views/dashboard/components/modeOne/MarkerInfoWindowModeOne';
// import MarkerInfoWindowModeTwo from 'views/dashboard/components/modeOne/MarkerInfoWindowModeTwo';
// import MarkerInfoWindowModeThree from 'views/dashboard/components/modeOne/MarkerInfoWindowModeThree';
// import MarkerInfoWindowModeFour from 'views/dashboard/components/modeOne/MarkerInfoWindowModeFour';
// Redux stuff

// styles
import componentStyles from "assets/theme/views/admin/dashboardOne.js";
const useStyles = componentStyles;

// _
let _ = require('underscore');

// pick the right marker mix
const pickerMarkerMix = (searchingmode) => {
	switch(searchingmode){
		case "modeOne":
			return(
				<MarkerInfoWindowModeOne/>
			)
		break;	
		// case "modeTwo":	
		// 	return(
		// 		<MarkerInfoWindowModeTwo 
		// 			coords={coords}
		// 			top5tag={top5Tag}
		// 		/>
		// 	)
		// break;
		// case "modeThree":	
		// 	return(
		// 		<MarkerInfoWindowModeThree 
		// 			coords={coords}
		// 			top5products={top5Products}
		// 		/>
		// 	)
		// break;
		// case "modeFour":	
		// 	return(
		// 		<MarkerInfoWindowModeFour 
		// 			coords={coords}
		// 			top5product={top5Product}
		// 		/>
		// 	)
		// break;
		default:
			return(
				null
			)
	}
}

class Dashboard extends Component {

	// trigger redux action
	componentDidMount() {
		// userDevices redux action
		this.props.getUserDevices()
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.userDevices !== prevProps.userDevices) {
			// liveDataSets & products redux action
			this.props.heartbeatThingSyncDataWithLiveDB(this.props.userDevices[0].thingId);
		}
	}

	render(){
		// redux props
		const {
			classes,
			ui,
			thingLiveDataSets:{
				coords,
				searchingMode,
				idOfSpecificStaticDevice,
				idOfSpecificProduct
			}
		} = this.props

		// dash markup
		const dashboardMarkUp = ! ui.loading ? (
			<>
				{/* static bg & mode boxes*/}
				<Header 
					idofspecificstaticdevice={idOfSpecificStaticDevice}
					idofspecificproduct={idOfSpecificProduct}
				/>
				{/* Page content */}
				<Container
					maxWidth={false}
					component={Box}
					marginTop="-6rem"
					classes={{ root: classes.containerRoot }}
				>
					<Grid container>
						<Grid item xs={12}>
							<Card classes={{ root: classes.cardRoot }}>
								{/* picker mix */}
								{pickerMarkerMix(searchingMode[0])}
							</Card>
						</Grid>
					</Grid>
				</Container>
			</>
		) : (
			<SkeletonDashboard/>
		);

		return(
			<>
				{dashboardMarkUp}
			</>
		)
	}
}

// connect to global state in redux
const mapStateToProps = (state) => ({
	ui: state.ui,
	userDevices: state.userDevices1.userDevices,
	thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
});

export default connect(mapStateToProps,{getUserDevices,heartbeatThingSyncDataWithLiveDB})(withStyles(useStyles)(Dashboard));



