import React, { Component } from 'react';
// mui core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Chip from '@material-ui/core/Chip';
// icons
import { faUserCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons";
// modules
import GoogleMap from '../../sections/GoogleMap.js';
import ColorEngine from '../utils/ColorEngine/ColorEngine'
// Redux stuff
import { connect } from 'react-redux';
import { heartbeatThingSyncDataLiveDB } from '../../../../redux/actions/heartbeatUIActions'
// _
let _ = require('underscore');

class GoogleMapModeOne extends Component {

	// api google set method
	handleApiLoaded = (map, maps,{...data}) => {

		// color class
		const colorClass = new ColorEngine()

		//////////////////////////////////////////////////// top5Tags - static devices - vendors
		//var to hold data in arrays to escalate
		const markersStaticsDevices = [];
		const infoWindowsStaticsDevices = [];
		// badges
		const arrayListBadgeStaticDevices = (data) => {
			let top5Tags = data.top5Tags
			let arrWithTags = [];
			let counter = 0

			// tags loop
			data.top5Tags.forEach((top5Tag)=>{
				for (let keyPair in top5Tag.matchDataResults) {
					arrWithTags.push(top5Tag[keyPair].map((item)=><Chip label={item} key={counter++}/>))
				} 
			})
				
			return(
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						{arrWithTags}
					</GridItem>
				</GridContainer>
			)
		}
		//print
		// console.log(`arrayListBadgeStaticDevices:${arrayListBadgeStaticDevices(data.top5Tags)}`)
		
		//data infoWindow
		const getInfoWindowStringStaticDevice = (data) => `
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
		</div>`

		//to static devices list markers
		data.top5Tags.forEach((top5Tag) => {
			// colors
			let colorBgIcon = colorClass.metersToColorHex(top5Tag.meters)
			// print
			console.log(`top5tagsCoords:${JSON.stringify(top5Tag.coords)}`)
			// marker
			markersStaticsDevices.push(new maps.Marker({
				position: {
					lat: top5Tag.coords.lat,
					lng: top5Tag.coords.lon,
				},
				icon: {
					path: faDotCircle.icon[4],
					fillColor: colorBgIcon,
					fillOpacity: 1,
					anchor: new maps.Point(
					  faDotCircle.icon[0] / 2, // width
					  faDotCircle.icon[1] // height
					),
					strokeWeight: 1,
					strokeColor: colorBgIcon,
					scale: 0.05,
				},
				map,
		}));

		// info win
		infoWindowsStaticsDevices.push(new maps.InfoWindow({
				content: getInfoWindowStringStaticDevice(top5Tag.userCredentials),
			}));
		});

		// clicker
		markersStaticsDevices.forEach((marker, i) => {
			marker.addListener('click', () => {
				infoWindowsStaticsDevices[i].open(map, marker);
			});
		});

		//////////////////////////////////////////////////// userDevices - buyers - users -dynamics
		// marker global
		let markerDynamicDevices = undefined
		// info window arr
		let infoWindowsDynamicDevices = undefined

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
		let latlng = undefined
		// unique marker creation and update pos
		const changeMarkerPosition = (dataCoords,colorRGB) => {
			// color
			let colorBgIcon = colorClass.rgbToColorHex(colorRGB) // ---> colorValue from liveDataSets
			// pos
			latlng = new maps.LatLng(dataCoords.lat, dataCoords.lon)
			// just one increase
			counter ++
			// checker to create only one marker
			if(counter === 1){	
				// marker unique
				markerDynamicDevices = new maps.Marker({
					position:latlng,
					//label: labels[labelIndex++ % labels.length],
					map, 
					// icon:image
					icon: {
						path: faUserCircle.icon[4],
						fillColor: colorBgIcon,
						fillOpacity: 1,
						anchor: new maps.Point(
						  faUserCircle.icon[0] / 2, // width
						  faUserCircle.icon[1] // height
						),
						strokeWeight: 1,
						strokeColor: colorBgIcon,
						scale: 0.05,
					},
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

		// polyline
		let route = new maps.Polyline({
			path: [], 
			geodesic : true,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 2,
			editable: false,
			map:map
		});
		
		// interval trigger
		setInterval(() => {
			// coords data
			let coords = this.props.coords
			// print
			console.log(`coordz for func: ${JSON.stringify(coords)}`)
			// run
			changeMarkerPosition(coords,data.colorValue)
			// pass data to path
			route.getPath().push(latlng)
		}, 1000)
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
			colorValue,
			profileToMatch,
			// top5Tags
			loading,
			top5Tags,
			matchDataResults,
		} = this.props

		// checker of data available
		if(loading == false){
			// print
			console.log(`position buyer live: ${JSON.stringify(this.props.coords)}`)
			
			return(
				<>
					<GoogleMap
						onGoogleApiLoaded={
							({ map, maps }) => this.handleApiLoaded(map, maps,
								{	
									// user
									credentials,
									// device
									profileToMatch,
									colorValue,
									// vendors
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
	colorValue: state.heartbeatThing1.thingLiveDataSetsListener.colorValue,
	// userDevices
	userDevices: state.userDevices1.userDevices,
	// top5Tags
	loading: state.userDevices1.loading,
	top5Tags: state.userDevices1.top5Tags,
	matchDataResults: state.userDevices1.top5Tags.matchDataResults
});

export default connect(mapStateToProps,{heartbeatThingSyncDataLiveDB})(GoogleMapModeOne)
