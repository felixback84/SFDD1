import React, { Component, Fragment } from 'react'
// mui core components
import GridContainer from "components/Grid/GridContainer.js"
import GridItem from "components/Grid/GridItem.js"
import Chip from '@material-ui/core/Chip' 
import Box from "@material-ui/core/Box"
// icons
import { faUserCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons"
// components
import GoogleMap from '../utils/GoogleMap'

// modules
import ColorEngine from '../utils/ColorEngine/ColorEngine'
// Redux stuff
import { connect } from 'react-redux'
import { heartbeatThingSyncDataLiveDB } from '../../../../redux/actions/heartbeatUIActions'
import GoogleMap from 'views/dashboard/sections/GoogleMap'
// _
let _ = require('underscore') 


// // custom hook to set the map
// const useMap = () => {
// 	// effect
// 	React.useEffect(() => {
// 		// GMaps
// 		const gMap = () => {
// 			// gmaps
// 			google = window.google
// 			// node
// 			let map = mapRef.current
// 			// geolocation dynamic user
// 			const myLatlng = new google.maps.LatLng(
// 				props.data.coords.lat, 
// 				props.data.coords.lon
// 			)
// 			// map options
// 			const mapOptions = {
// 				zoom: 19,
// 				center: myLatlng,
// 			}
// 			// map instance
// 			map = new google.maps.Map(map, mapOptions)
// 			number = true
// 			return map
// 		}
// 		// run it
// 		mapa = gMap()
// 	})
// }

// // custom hook to set the marker of buyer
// const useMarkerDynamic = () => {
// 	// effect
// 	React.useEffect(() => {
// 		// marker dynamic
// 		const changeMarkerPositionDynamic = (dataCoords,colorRGB,map) => {
// 			// marker global
// 			let markerDynamicDevices = undefined
// 			// info window arr
// 			let infoWindowsDynamicDevices = undefined
// 			// badges  ----> without use
// 			const arrayListBadgeUSerDevice = (data) => {
// 				let profileToMatch = data.profileToMatch
// 				let arrWithTags = [];
// 				let counter = 0
// 				for (let keyPair in profileToMatch) {
// 					arrWithTags.push(profileToMatch[keyPair].map((item)=><Chip label={item} key={counter++}/>))
// 				}  
// 				return(
// 					<GridContainer>
// 						<GridItem xs={12} sm={12} md={12}>
// 							{arrWithTags}
// 						</GridItem>
// 					</GridContainer>
// 				)
// 			}
// 			// data infoWindow
// 			const getInfoWindowStringUserDevice = (data) => `
// 				<div>
// 					<div style="font-size: 16px;">
// 						${data.bio}
// 					</div>
// 					<div style="font-size: 14px;">
// 						<span style="color: grey;">
// 						${data.email}
// 						</span>
// 						<span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(data.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(data.rating))}</span>
// 					</div>
// 					<div style="font-size: 14px; color: grey;">
// 						${data.names} ${data.lastName}
// 					</div>
// 					<div style="font-size: 14px; color: grey;">
// 						${data.type}
// 					</div> 
// 					<div style="font-size: 14px; color: green;">
// 						${true ? 'Open' : 'Closed'}
// 						${data.userHandle}
// 					</div>
// 				</div>`;
// 			// color
// 			let colorBgIcon = colorClass.rgbToColorHex(colorRGB) // ---> colorValue from liveDataSets
// 			// print
// 			// console.log(`colorHex:${colorBgIcon}`)
// 			// pos
// 			latlng = new google.maps.LatLng(dataCoords.lat, dataCoords.lon)
// 			// just one increase
// 			counter ++
// 			// checker to create only one marker
// 			if(counter === 1){	
// 				// marker unique
// 				markerDynamicDevices = new google.maps.Marker({
// 					position:latlng,
// 					//label: labels[labelIndex++ % labels.length],
// 					map:map,
// 					icon: {
// 						path: faUserCircle.icon[4],
// 						fillColor: colorBgIcon,
// 						fillOpacity: 1,
// 						anchor: new google.maps.Point(
// 							faUserCircle.icon[0] / 2, // width
// 							faUserCircle.icon[1] // height
// 						),
// 						strokeWeight: 1,
// 						strokeColor: colorBgIcon,
// 						scale: 0.05,
// 					},
// 				})
// 				// clicker marker
// 				markerDynamicDevices.addListener('click', () => {
// 					infoWindowsDynamicDevices.open(props.data.map, markerDynamicDevices)
// 				})
// 			} else if(counter != 0){
// 				// update pos
// 				markerDynamicDevices.setPosition(latlng)
// 				// props of the icon
// 				const icon = {
// 					path: faUserCircle.icon[4],
// 					fillColor: colorBgIcon,
// 					fillOpacity: 1,
// 					anchor: new google.maps.Point(
// 						faUserCircle.icon[0] / 2, // width
// 						faUserCircle.icon[1] // height
// 					),
// 					strokeWeight: 1,
// 					strokeColor: colorBgIcon,
// 					scale: 0.05,
// 				}
// 				// update color marker
// 				markerDynamicDevices.setIcon(icon)
// 			}
// 			// info window
// 			infoWindowsDynamicDevices = new google.maps.InfoWindow({
// 				content: getInfoWindowStringUserDevice(props.data.credentials),
// 			})
// 			// polyline
// 			route = new google.maps.Polyline({
// 				path: [], 
// 				geodesic : true,
// 				strokeColor: '#FF0000',
// 				strokeOpacity: 1.0,
// 				strokeWeight: 2,
// 				editable: false,
// 				map:map,
// 			})
// 			// return
// 			return{
// 				markerDynamicDevices,
// 				infoWindowsDynamicDevices
// 			}
// 		}
// 		// coords data
// 		let coords = props.data.coords
// 		console.log(`coordz: ${JSON.stringify(coords)}`)
// 		// colorValue data
// 		let colorIconUser = props.data.colorValue
// 		console.log(`colorIconUser: ${JSON.stringify(colorIconUser)}`)
// 		// run
// 		changeMarkerPositionDynamic(
// 			coords,
// 			colorIconUser,
// 			mapa
// 		)
// 	})	
// }

//////////////////////////////////////////////////// top5Tags - static devices - vendors
// const hiMarkersStatic = ({map,top5Tags}) => {
// 	//var to hold data in arrays to escalate
// 	const markersStaticsDevices = []
// 	const infoWindowsStaticsDevices = []
// 	// badges
// 	const arrayListBadgeStaticDevices = (data) => {
// 		let top5Tags = data.top5Tags
// 		let arrWithTags = [];
// 		let counter = 0

// 		// tags loop
// 		top5Tags.forEach((top5Tag)=>{
// 			for (let keyPair in top5Tag.matchDataResults) {
// 				arrWithTags.push(top5Tag[keyPair].map((item)=><Chip label={item} key={counter++}/>))
// 			} 
// 		})
			
// 		return(
// 			<GridContainer>
// 				<GridItem xs={12} sm={12} md={12}>
// 					{arrWithTags}
// 				</GridItem>
// 			</GridContainer>
// 		)
// 	}
// 	//print
// 	// console.log(`arrayListBadgeStaticDevices:${arrayListBadgeStaticDevices(data.top5Tags)}`)
	
// 	//data infoWindow
// 	const getInfoWindowStringStaticDevice = (data) => `
// 	<div>
// 		<div style="font-size: 16px;">
// 			${data.bio}
// 		</div>
// 		<div style="font-size: 14px;">
// 			<span style="color: grey;">
// 			${data.email}
// 			</span>
// 			<span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(data.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(data.rating))}</span>
// 		</div>
// 		<div style="font-size: 14px; color: grey;">
// 			${data.names} ${data.lastName}
// 		</div>
// 		<div style="font-size: 14px; color: grey;">
// 			${data.type}
// 		</div> 
// 		<div style="font-size: 14px; color: green;">
// 			${true ? 'Open' : 'Closed'}
// 			${data.userHandle}
// 		</div>
// 	</div>`

// 	// to static devices list markers
// 	top5Tags.forEach((top5Tag) => {
// 		// colors
// 		let colorBgIcon = colorClass.rgbToColorHex(top5Tag.matchQuality)
// 		// print
// 		console.log(`top5tagsCoords:${JSON.stringify(top5Tag.coords)}`)
// 		// marker
// 		markersStaticsDevices.push(new google.maps.Marker({
// 			position: {
// 				lat: top5Tag.coords.lat,
// 				lng: top5Tag.coords.lon,
// 			},
// 			icon: {
// 				path: faDotCircle.icon[4],
// 				fillColor: colorBgIcon,
// 				fillOpacity: 1,
// 				anchor: new google.maps.Point(
// 				faDotCircle.icon[0] / 2, // width
// 				faDotCircle.icon[1] // height
// 				),
// 				strokeWeight: 1,
// 				strokeColor: colorBgIcon,
// 				scale: 0.05,
// 			},
// 			map:map,
// 		}))
// 		// info win
// 		infoWindowsStaticsDevices.push(new google.maps.InfoWindow({
// 			content: getInfoWindowStringStaticDevice(top5Tag.userCredentials),
// 		}))
// 	})
// 	// clicker
// 	markersStaticsDevices.forEach((marker, i) => {
// 		marker.addListener('click', () => {
// 			infoWindowsStaticsDevices[i].open(props.data.map, marker)
// 		})
// 	})
// }
// const Markers = (props) => {
// 	// ref
// 	const mapRef = React.useRef(null)
// 	// color class
// 	const colorClass = new ColorEngine()
// 	// const theme = useTheme()
// 	let google = undefined
// 	// api google set method
// 	let latlng = undefined
// 	let route = undefined
// 	let number = false
// 	// counter to stop creation of multiple markers
// 	let counter = 0
// 	// run
// 	//let mapa = undefined

// 	React.useEffect(() => {
// 		//////////////////////////////////////////////////// userDevices - buyers - users - dynamics
// 		// unique marker creation and update pos
// 		const changeMarkerPositionDynamic = (dataCoords,colorRGB) => {
// 			// marker global
// 			let markerDynamicDevices = undefined
// 			// info window arr
// 			let infoWindowsDynamicDevices = undefined
// 			// badges  ----> without use
// 			const arrayListBadgeUSerDevice = (data) => {
// 				let profileToMatch = data.profileToMatch
// 				let arrWithTags = [];
// 				let counter = 0
// 				for (let keyPair in profileToMatch) {
// 					arrWithTags.push(profileToMatch[keyPair].map((item)=><Chip label={item} key={counter++}/>))
// 				}  
// 				return(
// 					<GridContainer>
// 						<GridItem xs={12} sm={12} md={12}>
// 							{arrWithTags}
// 						</GridItem>
// 					</GridContainer>
// 				)
// 			}
// 			// data infoWindow
// 			const getInfoWindowStringUserDevice = (data) => `
// 				<div>
// 					<div style="font-size: 16px;">
// 						${data.bio}
// 					</div>
// 					<div style="font-size: 14px;">
// 						<span style="color: grey;">
// 						${data.email}
// 						</span>
// 						<span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(data.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(data.rating))}</span>
// 					</div>
// 					<div style="font-size: 14px; color: grey;">
// 						${data.names} ${data.lastName}
// 					</div>
// 					<div style="font-size: 14px; color: grey;">
// 						${data.type}
// 					</div> 
// 					<div style="font-size: 14px; color: green;">
// 						${true ? 'Open' : 'Closed'}
// 						${data.userHandle}
// 					</div>
// 				</div>`;
// 			// color
// 			let colorBgIcon = colorClass.rgbToColorHex(colorRGB) // ---> colorValue from liveDataSets
// 			// print
// 			// console.log(`colorHex:${colorBgIcon}`)
// 			// pos
// 			latlng = new google.maps.LatLng(dataCoords.lat, dataCoords.lon)
// 			// just one increase
// 			counter ++
// 			// checker to create only one marker
// 			if(counter === 1){	
// 				// marker unique
// 				markerDynamicDevices = new google.maps.Marker({
// 					position:latlng,
// 					//label: labels[labelIndex++ % labels.length],
// 					//map:map,
// 					icon: {
// 						path: faUserCircle.icon[4],
// 						fillColor: colorBgIcon,
// 						fillOpacity: 1,
// 						anchor: new google.maps.Point(
// 							faUserCircle.icon[0] / 2, // width
// 							faUserCircle.icon[1] // height
// 						),
// 						strokeWeight: 1,
// 						strokeColor: colorBgIcon,
// 						scale: 0.05,
// 					},
// 				})
// 				// clicker marker
// 				markerDynamicDevices.addListener('click', () => {
// 					infoWindowsDynamicDevices.open(props.data.map, markerDynamicDevices)
// 				})
// 			} else if(counter != 0){
// 				// update pos
// 				markerDynamicDevices.setPosition(latlng)
// 				// props of the icon
// 				const icon = {
// 					path: faUserCircle.icon[4],
// 					fillColor: colorBgIcon,
// 					fillOpacity: 1,
// 					anchor: new google.maps.Point(
// 						faUserCircle.icon[0] / 2, // width
// 						faUserCircle.icon[1] // height
// 					),
// 					strokeWeight: 1,
// 					strokeColor: colorBgIcon,
// 					scale: 0.05,
// 				}
// 				// update color marker
// 				markerDynamicDevices.setIcon(icon)
// 			}
// 			// info window
// 			infoWindowsDynamicDevices = new google.maps.InfoWindow({
// 				content: getInfoWindowStringUserDevice(props.data.credentials),
// 			})
// 			// polyline
// 			route = new google.maps.Polyline({
// 				path: [], 
// 				geodesic : true,
// 				strokeColor: '#FF0000',
// 				strokeOpacity: 1.0,
// 				strokeWeight: 2,
// 				editable: false,
// 				//map:map,
// 			})
// 		}
// 		// coords data
// 		let coords = props.data.coords
// 		console.log(`coordz: ${JSON.stringify(coords)}`)
// 		// colorValue data
// 		let colorIconUser = props.data.colorValue
// 		console.log(`colorIconUser: ${JSON.stringify(colorIconUser)}`)
// 		// run
// 		changeMarkerPositionDynamic(
// 			coords,
// 			colorIconUser,
// 			//mapa
// 		)
// 	})

// 	return(
// 		<>
// 			<p
// 				ref={mapRef}
// 			>hi icon</p>
// 		</>
// 	)
// }

// GMap 
// const MapWrapper = (props) => {
// 	// color class
// 	const colorClass = new ColorEngine()
// 	// ref
// 	const mapRef = React.useRef(null)
// 	// api google set method
// 	let google = undefined
// 	let latlng = undefined
// 	let route = undefined
// 	let counter = 0
// 	let mapa = undefined

// 	return(
// 		<>
// 			<Box
// 				height="600px"
// 				position="relative"
// 				width="100%"
// 				overflow="hidden"
// 				borderRadius=".375rem"
// 				ref={mapRef}
// 			></Box>
// 		</>
// 	)
// }


class GoogleMapModeOne extends Component {

	// state
    // constructor(props) {
    //     super(props)
    //     this.state = {
	// 		interval:false
    //     }
    // }

	// redux action
	componentDidMount(){
		// live data from heartbeat
		this.props.heartbeatThingSyncDataLiveDB(this.props.userDevices[0].thingId)
	}

	render(){
		// redux state
		// const {
		// 	// user
		// 	credentials,
		// 	// liveDataSets
		// 	profileToMatch,
		// 	coords,
		// 	colorValue,
		// 	// top5Tags
		// 	loading,
		// 	top5Tags,
		// 	top5TagsListener,
		// 	matchDataResults,
		// } = this.props 

		// checker of data available
		if(loading == false){
			// print
			console.log(`position buyer live: ${JSON.stringify(this.props.coords)}`)
			
			return(
				<>
					{/* <MapWrapper
						data={
							{
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
							}
						}
					>
					</MapWrapper> */}
					<GoogleMap
						id="myMap"
						onMapLoad={(map) => {
							let marker = new window.google.maps.Marker({
								position: { 
									lat: this.props.coords.lat, 
									lng: this.props.coords.lon 
								},
								map: map,
							})
						}}
					/>
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
	coords: state.heartbeatThing1.thingLiveDataSets.coords,
	// top5Tags
	top5Tags: state.top5Tags1.top5Tags,
	top5TagsListener: state.top5Tags1.top5TagsListener,
	matchDataResults: state.top5Tags1.top5Tags.matchDataResults
});

export default connect(mapStateToProps,{heartbeatThingSyncDataLiveDB})(GoogleMapModeOne)

