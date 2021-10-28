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
import GoogleMapModeOne from './components/modeOne/GoogleMapModeOne'
import GoogleMapModeTwo from './components/modeTwo/GoogleMapModeTwo'
import GoogleMapModeThree from './components/modeThree/GoogleMapModeThree'
// modeOne
import ChartResultsSearchingModeOne from "./sections/modeOne/ChartResultsSearchingModeOne"
// modeTwo
import ChartResultsSearchingModeTwo from "./sections/modeTwo/ChartResultsSearchingModeTwo"
import ChartResultsSelectedItemsSearchingModeTwo from "./sections/modeTwo/ChartResultsSelectedItemsSearchingModeTwo"
// modeThree
import ProductsResultsSearchingModeThree from "./sections/modeThree/ProductsResultsSearchingModeThree"

// Redux stuff
import { connect } from 'react-redux';
import { getUserDevices } from '../../redux/actions/userDevicesActions';
import { 
	heartbeatThingSyncDataStatic, 
	heartbeatThingSyncDataLiveDB
} from '../../redux/actions/heartbeatUIActions';

// styles
import componentStyles from "assets/theme/views/admin/dashboardOne.js";
const useStyles = componentStyles;

// pick the right marker mix
const pickerMarkerMix = (
		searchingmode,
		data,
		coordz,
		color,
		loading
	) => {
	// print
	console.log(`coordz:${JSON.stringify(coordz)}`)
	// style
	const classes = data
	// switcher
	switch(searchingmode){
		case "modeOne":
			if(loading == false){
				return(
					<>
						{/* map */}
						<Grid container>
							<Grid item xs={12}>
								<Card classes={{ root: classes.cardRoot }}>
									<GoogleMapModeOne 
										coords={coordz}
										colorValue={color}
									/>
								</Card>
							</Grid>
						</Grid>
						{/* chart top5Coords*/}
						<Grid container>
							<Grid item xs={12}>
								{/* results */}
								<ChartResultsSearchingModeOne/>
							</Grid>
						</Grid>
					</>	
				)
			}
		break;	
		case "modeTwo":	
			if(loading == false){
				return(
					<>
						{/* map */}
						<Grid container>
							<Grid item xs={12}>
								<Card classes={{ root: classes.cardRoot }}>
									<GoogleMapModeTwo 
										coords={coordz}
										colorValue={color} 
									/>
								</Card>
							</Grid>
						</Grid>
						{/* chart top5Coord specifics filter*/}
						<Grid container>
							<Grid item xs={12}>
								{/* results */}
								<ChartResultsSelectedItemsSearchingModeTwo/>
							</Grid>
						</Grid>
						{/* chart all top5Coords*/}
						<Grid container>
							<Grid item xs={12}>
								{/* results */}
								<ChartResultsSearchingModeTwo/>
							</Grid>
						</Grid>
					</>	
				)
			}
		break;
		case "modeThree":	
			if(loading == false){
				console.log("modeThree")
				return(
					<>
						{/* map */}
						<Grid container>
							<Grid item xs={12}>
								<Card classes={{ root: classes.cardRoot }}>
									<GoogleMapModeThree
										coords={coordz}
										colorValue={color} 
									/>
								</Card>
							</Grid>
						</Grid>
						{/* top5Products result*/}
						<Grid container>
							<Grid item xs={12}>
								<Card classes={{ root: classes.cardRoot }}>
									{/* results */}
									<ProductsResultsSearchingModeThree/>
								</Card>
							</Grid>
						</Grid>
					</>	
				)
			}
		break;
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

	// get static data from liveDataSets
	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.userDevices !== prevProps.userDevices) {
			// liveDataSets redux action to static and live data
			this.props.heartbeatThingSyncDataStatic(this.props.userDevices[0].thingId)
			this.props.heartbeatThingSyncDataLiveDB(this.props.userDevices[0].thingId)
		}
	}

	render(){
		// redux props
		const {
			classes, 
			ui,
			// heartbeat
			loading,
			// live data
			coords,
			colorValue,
			searchingMode,
			// static data device
			thingLiveDataSets:{
				//searchingMode,
				idOfSpecificStaticDevices,
				idOfSpecificProduct,
			},
			
		} = this.props
		// print
		//console.log(`thingId:${this.props.userDevices[0].thingId}`)
		console.log(`idOfSpecificStaticDevice:${idOfSpecificStaticDevices}`)
		// dash markup
		const dashboardMarkUp = ! ui.loading ? (
			<>
				{/* static bg & mode boxes*/}
				<Header 
					idofspecificstaticdevice={idOfSpecificStaticDevices}
					idofspecificproduct={idOfSpecificProduct}
					thingid={this.props.userDevices[0].thingId}
				/>
				{/* Page content */}
				<Container
					maxWidth={false}
					component={Box}
					marginTop="-6rem"
					classes={{ root: classes.containerRoot }}
				>
					{/* picker mix */}
					{
						pickerMarkerMix(
							searchingMode[0],
							classes,
							coords,
							colorValue,
							loading,
						)
					}
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
	// ui
	ui: state.ui,
	// userDevices
	userDevices: state.userDevices1.userDevices,
	// heartbeat
	loading: state.heartbeatThing1.loading,
	thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
	searchingMode: state.heartbeatThing1.thingLiveDataSetsListener.searchingMode,
	coords: state.heartbeatThing1.thingLiveDataSetsListener.coords,
	colorValue: state.heartbeatThing1.thingLiveDataSetsListener.colorValue,
});

export default connect(mapStateToProps,{getUserDevices,heartbeatThingSyncDataStatic,heartbeatThingSyncDataLiveDB})(withStyles(useStyles)(Dashboard));



