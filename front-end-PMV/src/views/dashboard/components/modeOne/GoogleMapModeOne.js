import React, { Component } from 'react';
// mui core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Chip from '@material-ui/core/Chip';
// modules
import GoogleMap from '../../sections/GoogleMap.js';
// Redux stuff
import { connect } from 'react-redux';
import { heartbeatThingSyncDataLiveDB } from '../../../../redux/actions/heartbeatUIActions'

// _
let _ = require('underscore');

class GoogleMapModeOne extends Component {

	// api google
	handleApiLoaded = (map, maps,{...data}) => {

		//////////////////////////////////////////////////// userDevices - buyers - users -dynamics
		// marker global
		let markerDynamicDevices = undefined
		// info window arr
		let infoWindowsDynamicDevices = undefined
		// arr path
		let arrPath = []

		// badges  ----> without use
		const arrayListBadgeUSerDevice = (data) => {
			let profileToMatch = data.profileToMatch
			let arrWithTags = [];
			let counter = 0
			for (let keyPair in profileToMatch) {
				arrWithTags.push(profileToMatch[keyPair].map((item)=><Chip label={item} key={counter++}/>))
			}  
			return(
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						{arrWithTags}
					</GridItem>
				</GridContainer>
			)
		}
		
		// data infoWindow
		const getInfoWindowStringUserDevice = (data) => `
			<div>
				<div style="font-size: 16px;">
					${data.bio}
				</div>
				<div style="font-size: 14px;">
					<span style="color: grey;">
					${data.email}
					</span>
					<span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(data.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(data.rating))}</span>
				</div>
				<div style="font-size: 14px; color: grey;">
					${data.names} ${data.lastName}
				</div>
				<div style="font-size: 14px; color: grey;">
					${data.type}
				</div> 
				<div style="font-size: 14px; color: green;">
					${true ? 'Open' : 'Closed'}
					${data.userHandle}
				</div>
			</div>`;

			// counter to stop creation of multiple markers
			let counter = 0
			// unique marker creation and update pos
			const changeMarkerPosition = (dataCoords) => {
				let latlng = new maps.LatLng(dataCoords.lat, dataCoords.lon)
				// just one increase
				counter ++
				// checker to create only one marker
				if(counter === 1){
					// marker unique
					markerDynamicDevices = new maps.Marker({
						position:latlng,
						map,
					})
					// clicker marker
					markerDynamicDevices.addListener('click', () => {
						infoWindowsDynamicDevices.open(map, markerDynamicDevices)
					})
				} else if(counter != 0) {
					// update pos
					markerDynamicDevices.setPosition(latlng);
				}
			}

			// info window
			infoWindowsDynamicDevices = new maps.InfoWindow({
				content: getInfoWindowStringUserDevice(data.credentials),
			});
			
			// interval trigger
			setInterval(() => {
				// coords data
				let coords = this.props.coords
				// print
				console.log(`coordz for func: ${JSON.stringify(coords)}`)
				// run
				changeMarkerPosition(coords)
				// path
				return arrPath.push({
					lat: coords.lat,
					lng: coords.lon
				})
				// print
				// console.log(`arrPath:${JSON.stringify(arrPath)}`)
			}, 1000)

			// checker to init the draw path
			if(arrPath.length != 0){
				console.log('hi polyline')
				// Create the polyline 
				const linePath = new maps.Polyline({
					path: arrPath,
					map,
					geodesic: true,
					strokeColor: '#FF0000',
					strokeOpacity: 1,
					strokeWeight: 4,
				});
			}
	}
	
	// redux action
	componentDidMount(){
		// live data from heartbeat
		this.props.heartbeatThingSyncDataLiveDB(this.props.userDevices[0].thingId)
		// coords points from user path

	}

	render(){
		// redux state
		const {
			// user
			credentials,
			// liveDataSets
			profileToMatch,
			// top5Tags
			loading,
			top5Tags,
			matchDataResults,
		} = this.props

		// checker of data available
		if(loading == false){
			// print
			console.log(`position buyer live:${JSON.stringify(this.props.coords)}`)
			
			return(
				<>
					<GoogleMap
						onGoogleApiLoaded={
							({ map, maps }) => this.handleApiLoaded(map, maps,
								{
									credentials,
									profileToMatch,
									top5Tags,
								}
							)
						}
					>	
					</GoogleMap>
				</>
			)
		} else {
			return(
				<>
					<p>...wait for coords</p>
				</>
			)
		}
	}
}

// connect to global state in redux
const mapStateToProps = (state) => ({
	// user
	credentials: state.user.credentials,
	// liveDataSets
	profileToMatch: state.heartbeatThing1.thingLiveDataSets.profileToMatch,
	// userDevices
	userDevices: state.userDevices1.userDevices,
	// top5Tags
	loading: state.userDevices1.loading,
	top5Tags: state.userDevices1.top5Tags,
	matchDataResults: state.userDevices1.top5Tags.matchDataResults
});

export default connect(mapStateToProps,{heartbeatThingSyncDataLiveDB})(GoogleMapModeOne)
