import React, { Component } from 'react'
// mui
import Box from "@material-ui/core/Box"
// font awesome
import { faUserCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons"
// modules
import ColorEngine from '../utils/ColorEngine/ColorEngine'
// Redux stuff
import { connect } from 'react-redux';
import { heartbeatThingSyncDataLiveDB } from '../../../../redux/actions/heartbeatUIActions'

// map setts
const MapWrapper = (props) => {
	const mapRef = React.useRef(null)
	//const theme = useTheme()
	React.useEffect(() => {
		// gmaps
		let google = window.google
		// node
		let map = mapRef.current
		// geolocation dynamic user
		const myLatlng = new google.maps.LatLng(
			props.data.coords.lat, 
			props.data.coords.lon
		)
		// map options
		const mapOptions = {
			zoom: 19,
			center: myLatlng,
		}
		// map instance
		map = new google.maps.Map(map, mapOptions)
		// color class
		const colorClass = new ColorEngine()
		// var to fill the data passed
		let dataTags = []
		//var to hold data in arrays to escalate
		const markersStaticsDevices = []
		const infoWindowsStaticsDevices = []
		// check the data passed
		if(!props.data.hasOwnProperty('top5TagListener')){
			dataTags = props.data.dataTags
		} else if(props.data.hasOwnProperty('top5TagListener')){
			dataTags = props.data.top5TagListener
		}
		// print
		// console.log({dataTags})
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
		// loop to create static markers
        props.data.filterArrOfTop5Tags.map((item)=>{
			let colorRGB = item.matchQuality
			// color bg icon
			let colorBgIcon = colorClass.rgbToColorHex(colorRGB)
            // geolocation of static users
            const latlng = new google.maps.LatLng(
                item.coords.lat, 
                item.coords.lon
            )
            // markers
            markersStaticsDevices.push(
				new google.maps.Marker({
                position:latlng,
                //label: labels[labelIndex++ % labels.length],
                map, 
                icon:{
                    path: faUserCircle.icon[4],
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
			})) 
			// info win
			infoWindowsStaticsDevices.push(new google.maps.InfoWindow({
				content: getInfoWindowStringStaticDevice(item.userCredentials),
			}))
		})

		// clicker
		markersStaticsDevices.forEach((marker, i) => {
			marker.addListener('click', () => {
				infoWindowsStaticsDevices[i].open(map, marker)
			})
		})
		
		//////////////////////////////////////////////////// userDevices - buyers - users - dynamics
		// marker global
		let markerDynamicDevices = undefined
		// info window arr
		let infoWindowsDynamicDevices = undefined
		// badges  ----> without use
		// const arrayListBadgeUSerDevice = (data) => {
		// 	let profileToMatch = data.profileToMatch
		// 	let arrWithTags = [];
		// 	let counter = 0
		// 	for (let keyPair in profileToMatch) {
		// 		arrWithTags.push(profileToMatch[keyPair].map((item)=><Chip label={item} key={counter++}/>))
		// 	}  
		// 	return(
		// 		<GridContainer>
		// 			<GridItem xs={12} sm={12} md={12}>
		// 				{arrWithTags}
		// 			</GridItem>
		// 		</GridContainer>
		// 	)
		// }
		
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
					<span style="color: orange;">
						${String.fromCharCode(9733).repeat(Math.floor(data.rating))}
					</span>
					<span style="color: lightgrey;">
						${String.fromCharCode(9733).repeat(5 - Math.floor(data.rating))}
					</span>
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
			// console.log(`colorHex:${colorBgIcon}`)
			// pos
			latlng = new google.maps.LatLng(dataCoords.lat, dataCoords.lon)
			// just one increase
			counter ++ 
			// checker to create only one marker
			if(counter === 1){	
				// marker unique
				markerDynamicDevices = new google.maps.Marker({
					position:latlng,
					//label: labels[labelIndex++ % labels.length],
					map, 
					icon:{
						path: faUserCircle.icon[4],
						fillColor: colorBgIcon,
						fillOpacity: 1,
						anchor: new google.maps.Point(
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
			} else if(counter != 0){
				// update pos
				markerDynamicDevices.setPosition(latlng)
				// props of the icon
				const icon = {
					path: faUserCircle.icon[4],
					fillColor: colorBgIcon,
					fillOpacity: 1,
					anchor: new google.maps.Point(
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
		infoWindowsDynamicDevices = new google.maps.InfoWindow({
			content: getInfoWindowStringUserDevice(props.data.credentials),
		})
		// polyline
		let route = new google.maps.Polyline({
			path: [], 
			geodesic : true,
			strokeColor: '#FF0000', // red line of path
			strokeOpacity: 1.0,
			strokeWeight: 2,
			editable: false,
			map
		})
		// interval trigger
		let interval = setInterval(() => {
			// coords data
			let coords = props.data.coords
			console.log(`coordz: ${JSON.stringify(coords)}`)
			// colorValue data
			let colorIconUser = props.data.colorValue
			// console.log(`colorIconUser: ${JSON.stringify(colorIconUser)}`)
			// run
			changeMarkerPosition(coords,colorIconUser)
			// pass data to path
			route.getPath().push(latlng)
		}, 1000)
		// clear interval
		if(props.clearInterval){
			clearInterval(interval)
		}
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

class GoogleMapModeTwo extends Component {

	// state
    constructor(props) {
        super(props)
        this.state = {
			arrMarkers:[],
			interval:false
        }
    }

	// redux action
	componentDidMount(){
		// live data from heartbeat
		this.props.heartbeatThingSyncDataLiveDB(this.props.userDevices[0].thingId)
	}

	// filter of top5Tags
	componentWillReceiveProps(nextProps){
		// checker of changes in data
        if(nextProps.idOfSpecificStaticDevices){
            // promise
            const myPromise = new Promise((resolve, reject) => {
                // var to arr
                let arrFinal = []
                // print
				console.log(
					`hi filter of selected ones to markers: 
					${JSON.stringify(this.props.idOfSpecificStaticDevices)}`
				)
                // check if none static is selected
                if(this.props.idOfSpecificStaticDevices.length === 0){
                    arrFinal.push({...this.props.top5Tags[0],show:false})
                } else if(this.props.idOfSpecificStaticDevices.length != 0) {
                    // loop over selection
                    this.props.idOfSpecificStaticDevices.map((id)=>{
                        // filter
                        this.props.top5Tags.filter((arrItem)=>{
                            // checker
                            if(arrItem.thingId === id.thingIdToSearch){
                                    arrFinal.push({...arrItem, show:false})
                                } 
                        })	 
                    })
                }
                // print
                console.log(`arrFinalMarkers: ${JSON.stringify(arrFinal)}`)
                // promise resolve
                resolve(arrFinal)
            })
            // list of data for table
            return myPromise
                .then((data)=>{
                    // set state
					this.setState({ 
						arrMarkers:data,
						interval:true
					})
					// clear interval
                    // print
                    console.log(
                        `top5Tag data after filter to markers on state: 
                        ${JSON.stringify(this.state.arrMarkers)}`
                    )
                })
                .catch((err) => console.log('There was an error:' + err)) 
        }
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
			top5Tag,
			top5TagListener,
			matchDataResults,
		} = this.props
		
		// vars to hold data
		let hiData = {}
		let filterArrOfTop5Tags = this.state.arrMarkers
		// checker of data available
		if(loading == false){
			// print
			console.log(`position buyer live: ${JSON.stringify(this.props.coords)}`)
			// check array length o pass right data
			if(this.props.idOfSpecificStaticDevices.length == 0){
				// data to pass
				hiData = {	
					// user
					credentials,
					// device
					profileToMatch,
					coords,
					colorValue,
					// vendors
					top5Tags,
					top5TagsListener,
					// filter top5Tags
					filterArrOfTop5Tags
				}
				// print 
				console.log(`hiData: ${JSON.stringify(hiData)}`)
			} else if(this.props.idOfSpecificStaticDevices.length != 0){
				// data to pass
				hiData = {	
					// user
					credentials,
					// device
					profileToMatch,
					coords,
					colorValue,
					// vendors
					top5Tag,
					top5TagListener,
					// filter top5Tags
					filterArrOfTop5Tags
				} 
				// print 
				// console.log(`hiData: ${JSON.stringify(hiData)}`)
			}
			
			return(
				<>
					{/* GMaps */}
					<MapWrapper
						data={hiData}
						clearInterval={this.state.interval}
					/>
				</>
			)
		} else {
			return(
				<>
					<p>...wait for coords from modeTwo</p>
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
	coords:state.heartbeatThing1.thingLiveDataSets.coords,
    idOfSpecificStaticDevices: state.heartbeatThing1.thingLiveDataSetsListener.idOfSpecificStaticDevices,
	// top5Tags
	loading: state.top5Tags1.loading,
	top5Tags: state.top5Tags1.top5Tags,
	top5TagsListener: state.top5Tags1.top5TagsListener,
    top5Tag: state.top5Tags1.top5Tag,
	top5TagListener: state.top5Tags1.top5TagListener,

})

export default connect(mapStateToProps,{heartbeatThingSyncDataLiveDB})(GoogleMapModeTwo)

