import React from 'react'
import { useTheme } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
// icons
import { faUserCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons"
// modules
import ColorEngine from '../utils/ColorEngine/ColorEngine'

const MapWrapper = (props) => {

	const mapRef = React.useRef(null)
	const theme = useTheme()

	// color class
	const colorClass = new ColorEngine()

	React.useEffect(() => {
		// gmaps
		let google = window.google
		// node
		let map = mapRef.current
		// SV 
		let panorama
		// geolocation dynamic user
		const myLatlng = new google.maps.LatLng(props.coords.lat, props.coords.lon)
		// map options
		const mapOptions = {
			zoom: 19,
			center: myLatlng,
		}
		// map instance
		map = new google.maps.Map(map, mapOptions)
		
		// markers
		const markersStaticsDevices = []
		const infoWindowsStaticsDevices = []
		// loop
		props.top5Tags.forEach((top5Tag) => {
			// colors
			let colorBgIcon = colorClass.rgbToColorHex(top5Tag.matchQuality)
			// print
			console.log(`top5tagsCoords:${JSON.stringify(top5Tag.coords)}`)
			// marker
			markersStaticsDevices.push(new google.maps.Marker({
				position: {
					lat: top5Tag.coords.lat,
					lng: top5Tag.coords.lon,
				},
				icon: {
					path: faDotCircle.icon[4],
					fillColor: colorBgIcon,
					fillOpacity: 1,
					anchor: new google.maps.Point(
					  faDotCircle.icon[0] / 2, // width
					  faDotCircle.icon[1] // height
					),
					strokeWeight: 1,
					strokeColor: colorBgIcon,
					scale: 0.05,
				},
				map,
			}))

			// data infoWindow
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

			// info win
			infoWindowsStaticsDevices.push(new google.maps.InfoWindow({
				content: getInfoWindowStringStaticDevice(top5Tag.userCredentials),
			}))
		})

		// clicker
		markersStaticsDevices.forEach((marker, i) => {
			marker.addListener('click', () => {
				infoWindowsStaticsDevices[i].open(map, marker);
			});
		});
		
		// SV
		panorama = map.getStreetView()
		panorama.setPosition(myLatlng)
		panorama.setVisible(true)
		panorama.setPov(
			{	
				heading: 265,
				pitch: 0,
			},
		)
	})
	
	return(
		<>
			<Box
				height="600px"
				position="relative"
				width="100%"
				overflow="hidden"
				borderRadius=".375rem"
				ref={mapRef}
			></Box>
		</>
	)
}

const StreetViewModeOne = (props) => {

	return(
		<>
			<MapWrapper
				coords={props.coords}
				top5Tags={props.top5tags}
			/>
		</>
	)
}

export default StreetViewModeOne
