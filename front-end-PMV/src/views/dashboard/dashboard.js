import React, { Component, Fragment, useState } from 'react'
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"
//  mui
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
// components
import Header from "../../components/Headers/Header.js"
import PickerMarkerMix from "./components/utils/PickerMarkerMix"
import SkeletonDashboard from "./components/SkeletonDashboard.js"
// Redux stuff
import { connect } from 'react-redux'
import { getUserDevices } from '../../redux/actions/userDevicesActions'
import { 
	heartbeatThingSyncDataStatic, 
	heartbeatThingSyncDataLiveDB
} from '../../redux/actions/heartbeatUIActions'
// styles
import componentStyles from "assets/theme/views/admin/dashboardOne.js"
const useStyles = componentStyles


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
					<PickerMarkerMix
						data={
							{
								searchingMode:searchingMode[0],
								classes,
								coords,
								colorValue,
								loading
							}
						}
					/>
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



