import React, { Component } from 'react'
// icons
import { faUserCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons"
// modules
import ColorEngine from '../utils/ColorEngine/ColorEngine'
// Redux stuff
import { connect } from 'react-redux'

class MarkerStaticsModeTwo extends Component {

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
                    // print
                    console.log(
                        `top5Tag data after filter to markers on state: 
                        ${JSON.stringify(this.state.arrMarkers)}`
                    )
                })
                .catch((err) => console.log('There was an error:' + err)) 
        }
	}

    // to create statics markers
    hiStaticMarkers(map,top5Tags){
        // arr of markers
        let markersStaticsDevices = []
        // info window
        let infoWindowsStaticsDevices = []
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
		top5Tags.forEach((top5Tag) => {
			// colors
			let colorBgIcon = colorClass.metersToColorHex(top5Tag.meters)
			// print
			console.log(`top5tagsCoords:${JSON.stringify(top5Tag.coords)}`)
			// marker
			markersStaticsDevices.push(new window.google.maps.Marker({
				position: {
					lat: top5Tag.coords.lat,
					lng: top5Tag.coords.lon,
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
			infoWindowsStaticsDevices.push(new window.google.maps.InfoWindow({
				content: getInfoWindowStringStaticDevice(top5Tag.userCredentials),
            }))
            
		})

		// clicker
		markersStaticsDevices.forEach((marker, i) => {
			marker.addListener('click', () => {
				infoWindowsStaticsDevices[i].open(map, marker)
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

export default connect(mapStateToProps)(MarkerStaticsModeTwo)
