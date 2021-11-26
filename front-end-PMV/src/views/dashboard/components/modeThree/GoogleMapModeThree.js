import React, { Component } from 'react';
// font awesome
import { faUserCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons";
// modules
import GoogleMap from '../../sections/GoogleMap.js';
import ColorEngine from '../utils/ColorEngine/ColorEngine'
// components

// Redux stuff
import { connect } from 'react-redux';
import { heartbeatThingSyncDataLiveDB } from '../../../../redux/actions/heartbeatUIActions'


class GoogleMapModeThree extends Component {
    // api google set method
	handleApiLoaded = (map, maps,{...data}) => {
        // print
        console.log(`api Gmaps init modeThree`)
            
        // color class
		const colorClass = new ColorEngine()
		// coords data dynamic user pos
		let coords = this.props.coords

        //////////////////////////////////////////////////// top5Products - static devices - vendors
		//var to hold data in arrays to escalate
		const markersStaticsDevicesProducts = [];
		const infoWindowsStaticsDevicesProducts = [];
		
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

		//to static devices products list markers
		data.top5Products.forEach((top5Product,i) => {
			// colors
			// let colorBgIcon = colorClass.metersToColorHex(top5Tag.meters)
			// print
			console.log(`top5ProductsCoords:${JSON.stringify(top5Product.coords)}`)
			// marker
			markersStaticsDevicesProducts.push(new maps.Marker({
				position: {
					lat:top5Product.coords.lat,
					lng:top5Product.coords.lon,
				},
				icon: {
					path: faDotCircle.icon[4],
					fillColor: "#c30000",
					fillOpacity: 1,
					anchor: new maps.Point(
					  	faDotCircle.icon[0] / 2, // width
						faDotCircle.icon[1] / 2// height
					),
					strokeWeight: 1,
					strokeColor: "#c30000",
					scale: 0.05,
				},
				map,
			}))

			// info win
			infoWindowsStaticsDevicesProducts.push(new maps.InfoWindow({
				content: getInfoWindowStringStaticDevice(top5Product.product),
			}))

			// run it
			// directions service
			const calculateAndDisplayRoute = (directionsService, directionsRenderer) => {
				console.log("init directions")
				directionsService
					.route({
						origin:{
							lat:coords.lat,
							lng:coords.lon
						},
						destination:{
							lat:top5Product.coords.lat,
							lng:top5Product.coords.lon
						},
						travelMode:maps.TravelMode.WALKING,
					})
					.then((response) => {
						console.log("success")
						directionsRenderer.setDirections(response)
						let directionsData = response.routes[0].legs[0]
						// if (!directionsData) {
						// 	window.alert('Directions request failed');
						// 	return;
						// } else {
						// 	window.alert('Directions request succses');
						// }
					})
					.catch((e) => console.log("Directions request failed no response"))	 
		}

			// init map with directions
			const initMapService = () => {
				// directions logic
				const directionsService = new maps.DirectionsService()
				const directionsRenderer = new maps.DirectionsRenderer()
				directionsRenderer.setMap(map)
				// run it
				calculateAndDisplayRoute(directionsService,directionsRenderer)
			}
			// run it
			initMapService()
			//** distance matrix gmaps
			// vars with coords
			const userDevicePos = {
				lat: coords.lat, 
				lng: coords.lon
			}
			const staticDevicePos = {
				lat: top5Product.coords.lat, 
				lng: top5Product.coords.lon
			}

			// Draw a line showing the straight distance between the markers
			let line = new maps.Polyline(
				{
					path: [userDevicePos, staticDevicePos], 
					map: map
				}
			)
			// clicker to open mini infoWindow
			markersStaticsDevicesProducts.forEach((marker, i) => {
				// event pass
				marker.addListener('click', () => {
					infoWindowsStaticsDevicesProducts[i].open(map, marker);
				})
			})
		})
	
        //////////////////////////////////////////////////// userDevices - buyers - users - dynamics
		// marker global
		let markerDynamicDevices = undefined
		// info window arr
		let infoWindowsDynamicDevices = undefined

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
			// print
			console.log(`colorHex:${colorBgIcon}`)
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
					icon: {
						path: faUserCircle.icon[4],
						fillColor: colorBgIcon,
						fillOpacity: 1,
						anchor: new maps.Point(
						  	faUserCircle.icon[0] / 2, // width
							faUserCircle.icon[1] / 2// height
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
				markerDynamicDevices.setPosition(latlng)
				// props of the icon
				const icon = {
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
				}
				// update color marker
				markerDynamicDevices.setIcon(icon)
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
			// print
			console.log(`coordz modeThree: ${JSON.stringify(coords)}`)
			// colorValue data
			let colorIconUser = this.props.colorValue
			console.log(`colorIconUser: ${JSON.stringify(colorIconUser)}`)
			// run
			changeMarkerPosition(coords,colorIconUser)
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

    render() {
        // redux state
		const {
			// user
			credentials,
            // top5Products
			loading,
            top5Products,
            //top5ProductsListener
        } = this.props
        
        // checker of data available
		if(loading === false){
            
			// print
			console.log(`position buyer live in products: ${JSON.stringify(this.props.coords)}`)
            console.log(`products: ${JSON.stringify(top5Products)}`)
            
			return(
				<>
					<GoogleMap
						onGoogleApiLoaded={
							({ map, maps }) => this.handleApiLoaded(map, maps,
								{	
									// user
									credentials,
                                    // products
                                    top5Products,
                                    //top5ProductsListener
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
					<p>...wait for coords from modeThree</p>
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
    // top5Products
    loading:state.top5Products1.loading,
    top5Products: state.top5Products1.top5Products,
    // top5ProductsListener: state.top5Products1.top5ProductsListener
})

export default connect(mapStateToProps,{heartbeatThingSyncDataLiveDB})(GoogleMapModeThree)
