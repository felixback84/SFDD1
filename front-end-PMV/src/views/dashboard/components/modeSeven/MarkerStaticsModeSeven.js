import React, { Component } from 'react'
// icons
import { faUserCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons"
// modules
import ColorEngine from '../utils/ColorEngine/ColorEngine'
// Redux stuff
import { connect } from 'react-redux'

class MarkerStaticsModeSeven extends Component {

    // to create static markers
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
        return (
            <>
                {
                    this.hiStaticMarkers(
                        this.props.map,
                        this.props.top5Tags
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
    loading: state.heartbeatThing1.loading,
	profileToMatch: state.heartbeatThing1.thingLiveDataSets.profileToMatch,
    thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
    coords: state.heartbeatThing1.thingLiveDataSetsListener.coords,
	// top5Tags
	top5Tags: state.top5Tags1.top5Tags,
	top5TagsListener: state.top5Tags1.top5TagsListener,
	matchDataResults: state.top5Tags1.top5Tags.matchDataResults
});

export default connect(mapStateToProps)(MarkerStaticsModeSeven)
