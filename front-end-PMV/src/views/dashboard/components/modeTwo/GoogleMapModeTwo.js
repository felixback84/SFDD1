import React, { Component, Fragment } from 'react'
// icons
import { faUserCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons"
// components
import GoogleMap from '../utils/GoogleMap'
import MarkerDynamicModeTwo from './MarkerDynamicModeTwo'
import MarkerStaticsModeTwo from './MarkerStaticsModeTwo'
// modules
import ColorEngine from '../utils/ColorEngine/ColorEngine'
// Redux stuff
import { connect } from 'react-redux'
import { heartbeatThingSyncDataLiveDB } from '../../../../redux/actions/heartbeatUIActions'


class GoogleMapModeTwo extends Component {

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
										<MarkerDynamicModeTwo
											map={map}
											colorvalue={this.props.colorValue}
											coordz={this.props.coords}
										/>
										<MarkerStaticsModeTwo
											map={map}
											colorvalue={this.props.colorValue}
											coordz={this.props.coords}
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
	userDevices: state.userDevices1.userDevices,
	// liveDataSets
	loading:state.heartbeatThing1.loading,
	profileToMatch: state.heartbeatThing1.thingLiveDataSets.profileToMatch,
	searchingMode:state.heartbeatThing1.thingLiveDataSets.searchingMode,
	// coords:state.heartbeatThing1.thingLiveDataSets.coords,
    idOfSpecificStaticDevices: state.heartbeatThing1.thingLiveDataSetsListener.idOfSpecificStaticDevices,
	// top5Tags
	loading: state.top5Tags1.loading,
	top5Tags: state.top5Tags1.top5Tags,
	top5TagsListener: state.top5Tags1.top5TagsListener,
    top5Tag: state.top5Tags1.top5Tag,
	top5TagListener: state.top5Tags1.top5TagListener,

})

export default connect(mapStateToProps,{heartbeatThingSyncDataLiveDB})(GoogleMapModeTwo)