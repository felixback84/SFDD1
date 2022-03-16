import React, { Component } from 'react'
// icons
import { faUserCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons"
// modules
import ColorEngine from '../utils/ColorEngine/ColorEngine'
// Redux stuff
import { connect } from 'react-redux'

class MarkerStaticsModeFour extends Component {

    // state
    constructor(props) {
        super(props)
        this.state = {
			arrMarkers:[],
			interval:false
        }
    }

    // filter of top5Tags
	componentWillReceiveProps(nextProps){
		// checker of changes in data
        if(nextProps.idOfSpecificProducts){
            // promise
            const myPromise = new Promise((resolve, reject) => {
                // var to arr
                let arrFinal = []
                // print
				console.log(
					`hi filter of selected ones to markers: 
					${JSON.stringify(this.props.idOfSpecificProducts)}`
				)
                // check if none static is selected
                if(this.props.idOfSpecificProducts.length === 0){
                    arrFinal.push({...this.props.top5Products[0],show:false})
                } else if(this.props.idOfSpecificProducts.length != 0) {
                    // loop over selection
                    this.props.idOfSpecificProducts.map((id)=>{
                        // filter
                        this.props.top5Products.filter((arrItem)=>{
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
                    // print
                    console.log(
                        `top5Tag data after filter to markers on state: 
                        ${JSON.stringify(this.state.arrMarkers)}`
                    )
                })
                .catch((err) => console.log('There was an error:' + err)) 
        }
	}

    // to create static markers
    hiStaticMarkers(map,top5Products){
        // arr of markers
        let markersStaticsDevicesProducts = []
        // info window
        let infoWindowsStaticsDevicesProducts = []
        // color class
        const colorClass = new ColorEngine()
        // infowindow content
        const getInfoWindowStringStaticDevice = (credentials) => `
            <div>
                <div style="font-size: 16px;">
                    ${credentials.bio}
                </div>
                <div style="font-size: 14px;">
                    <span style="color: grey;">
                    ${credentials.email}
                    </span>
                    <span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(credentials.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(credentials.rating))}</span>
                </div>
                <div style="font-size: 14px; color: grey;">
                    ${credentials.names} ${credentials.lastName}
                </div>
                <div style="font-size: 14px; color: grey;">
                    ${credentials.type}
                </div> 
                <div style="font-size: 14px; color: green;">
                    ${true ? 'Open' : 'Closed'}
                    ${credentials.userHandle}
                </div>
            </div>`
        
        //to static devices list markers
		top5Products.forEach((top5Product) => {
			// colors
			let colorBgIcon = colorClass.metersToColorHex(top5Product.meters)
			// print
			console.log(`top5tagsCoords:${JSON.stringify(top5Product.coords)}`)
			// ** marker
			markersStaticsDevicesProducts.push(new window.google.maps.Marker({
				position: {
					lat: top5Product.coords.lat,
					lng: top5Product.coords.lon,
				},
				icon: {
					path: faDotCircle.icon[4],
					fillColor: "#c30000",
					fillOpacity: 1,
					anchor: new window.google.maps.Point(
					    faDotCircle.icon[0] / 2, // width
					    faDotCircle.icon[1] // height
					),
					strokeWeight: 1,
					strokeColor: "#c30000",
					scale: 0.05,
				},
				map:map,
			}))

			// info win
			infoWindowsStaticsDevicesProducts.push(new window.google.maps.InfoWindow({
				content: getInfoWindowStringStaticDevice(top5Product.product),
            }))

            // ** directions service
            const calculateAndDisplayRoute = (
                directionsService,
                directionsRenderer,
                index
            ) => {
                // print init
                console.log("init directions")
                // set data and get response    
                directionsService
                    .route({
                        origin:{
                            lat:this.props.coords.lat,
                            lng:this.props.coords.lon
                        },
                        destination:{
                            lat:top5Products[index].coords.lat,
                            lng:top5Products[index].coords.lon
                        },
                        travelMode: window.google.maps.TravelMode.WALKING,
                    })
                    .then((response) => { 
                        console.log("success")
                        directionsRenderer.setDirections(response)
                        let directionsData = response.routes[0].legs[0]
                        
                    })
                    .catch((e) => console.log("Directions request failed no response"))	 
            }

            // clicker to open mini infoWindow
            markersStaticsDevicesProducts.forEach((marker, i) => {
                // event pass
                marker.addListener('click', () => {
                    infoWindowsStaticsDevicesProducts[i].open(map, marker)
                    // init map with directions
                    const directionsService = new window.google.maps.DirectionsService()
                    const directionsRenderer = new window.google.maps.DirectionsRenderer()
                    directionsRenderer.setMap(map)
                    // run it
                    calculateAndDisplayRoute(directionsService,directionsRenderer,i)
                })
            })

            // ** distance matrix gmaps
            // vars with coords of dynamics and statics
            const userDevicePos = {
                lat: this.props.coords.lat, 
                lng: this.props.coords.lon
            }
            const staticDevicePos = {
                lat: top5Product.coords.lat, 
                lng: top5Product.coords.lon
            }

            // Draw a line showing the straight distance between the markers
            let line = new window.google.maps.Polyline({
                path: [userDevicePos, staticDevicePos], 
                map: map
            })  
        })
    }

    render() {
        // ids from state list of pick ones
        let filterArrOfTop5Tags = this.state.arrMarkers

        return (
            <>
                {
                    this.hiStaticMarkers(
                        this.props.map,
                        filterArrOfTop5Tags
                    )
                }
            </>
        )
    }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
	// user
	credentials: state.user.credentials,
	// userDevices
    userDevices: state.userDevices1.userDevices,
    // thingLiveDataSets
    coords:state.heartbeatThing1.thingLiveDataSetsListener.coords,
    idOfSpecificProducts: state.heartbeatThing1.thingLiveDataSetsListener.idOfSpecificProducts,
    // top5Products
    loading:state.top5Products1.loading,
    top5Products: state.top5Products1.top5Products,
    // top5ProductsListener: state.top5Products1.top5ProductsListener
})

export default connect(mapStateToProps)(MarkerStaticsModeFour)
