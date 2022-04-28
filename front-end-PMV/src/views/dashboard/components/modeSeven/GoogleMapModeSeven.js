import React, { Component, Fragment } from 'react'
// icons
import { faUserCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons"
// components
import GoogleMap from '../utils/GoogleMap'
import MarkerDynamicModeSeven from './MarkerDynamicModeSeven'
import MarkerStaticsModeSeven from './MarkerStaticsModeSeven'
// modules
import ColorEngine from '../utils/ColorEngine/ColorEngine'
// Redux stuff
import { connect } from 'react-redux'
import { heartbeatThingSyncDataLiveDB } from '../../../../redux/actions/heartbeatUIActions'
// _
let _ = require('underscore')

class GoogleMapModeSeven extends Component {

	// state
	constructor(props) {
		super(props)
		this.state = {
			map:{},
			counter:false
		}
	}

	// redux action
	componentDidMount(){
		// live data from heartbeat
		this.props.heartbeatThingSyncDataLiveDB(this.props.userDevices[0].thingId)
	}

	render(){
		// redux state
		const {	
			// user
			credentials,
			// liveDataSets
			profileToMatch,
			coords,
			colorValue,
			// top5Tags
			loading,
			top5Tags,
			top5TagsListener,
			matchDataResults,
		} = this.props 

		// checker of data available
		if(loading === false){
			return(
				<>
					<GoogleMap
						id="myMap"
						onMapLoad={
							(map)=>{
								return(
									<>
										<MarkerDynamicModeSeven
											map={map}
											colorvalue={this.props.colorValue}
											coordz={this.props.coordz}
										/>
										<MarkerStaticsModeSeven
											map={map}
											colorvalue={this.props.colorValue}
											coordz={this.props.coordz}
										/>
									</>
								)
							}
						}	
					>
					</GoogleMap>		
				</>
			)
		} else {
			return(
				<>
					<p>...wait for coords from modeOne</p>
				</>
			)
		}
	}
}

// connect to global state in redux
const mapStateToProps = (state) => ({
	// user
	credentials: state.user.credentials,
	// userDevices
	loading: state.userDevices1.loading,
	userDevices: state.userDevices1.userDevices,
	// liveDataSets
	profileToMatch: state.heartbeatThing1.thingLiveDataSets.profileToMatch,
	// coords: state.heartbeatThing1.thingLiveDataSets.coords,
	// top5Tags
	top5Tags: state.top5Tags1.top5Tags,
	top5TagsListener: state.top5Tags1.top5TagsListener,
	matchDataResults: state.top5Tags1.top5Tags.matchDataResults
});

export default connect(mapStateToProps,{heartbeatThingSyncDataLiveDB})(GoogleMapModeSeven)

