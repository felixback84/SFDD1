import React, { Component, Fragment } from 'react'
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// components
import Header from "../../components/Headers/Header.js";
import SkeletonDashboard from "./components/SkeletonDashboard.js";
import ChartResultsSearchingModeOne from "./sections/modeOne/ChartResultsSearchingModeOne"

// Redux stuff
import { connect } from 'react-redux';
import { getUserDevices } from '../../redux/actions/userDevicesActions';
import { heartbeatThingSyncDataWithLiveDB } from '../../redux/actions/heartbeatUIActions';

// components
import GoogleMapModeOne from './components/modeOne/GoogleMapModeOne'
// import SearchEngine from "./components/utils/SearchEngine/SearchEngine"

// styles
import componentStyles from "assets/theme/views/admin/dashboardOne.js";
import SearchEngine from './components/utils/SearchEngine/SearchEngine.js';
const useStyles = componentStyles;


// pick the right marker mix
const pickerMarkerMix = (searchingmode,data) => {
	const classes = data
	switch(searchingmode){
		case "modeOne":
			return(
				<>
					<Grid container>
						<Grid item xs={12}>
							<Card classes={{ root: classes.cardRoot }}>
								<GoogleMapModeOne/>
							</Card>
						</Grid>
					</Grid>
					
					<Grid container>
						<Grid item xs={12}>
							{/* charts results*/}
							<ChartResultsSearchingModeOne/>
						</Grid>
					</Grid>
				</>	
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
		const dashboardMarkUp = !ui.loading ? (
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
					{/* picker mix */}
					{pickerMarkerMix(searchingMode[0],classes)}
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



