import React, { Component } from 'react'
// icons
import { faUserCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons"
// components

// Redux stuff
import { connect } from 'react-redux'

class MarkerDynamicUpdateModeOne extends Component {

    // update marker
    markerDynamicDevicesUpdate(coords,marker){
        // coords live from buyer
        const latlng = new window.google.maps.LatLng(
            coords.lat, 
            coords.lon
        )
        // update pos
        marker.setPosition(latlng) 
        // props of the icon
        const icon = {
            path: faUserCircle.icon[4],
            //fillColor: colorBgIcon,
            fillOpacity: 1,
            anchor: new window.google.maps.Point(
                faUserCircle.icon[0] / 2, // width
                faUserCircle.icon[1] // height
            ),
            strokeWeight: 1,
            //strokeColor: colorBgIcon,
            scale: 0.05,
        }
       // update color marker
        markerDynamicDevice.setIcon(icon)
        this.setState({
            
            markerDynamicDevice: ()=>(this.state.markerDynamicDevice.setIcon(icon))
        })
        console.log(JSON.stringify(marker))
    }

    // to update pos of the buyer
	componentWillReceiveProps(nextProps){
        // checker
		if(nextProps.coords){
            // run it
            this.markerDynamicDevicesUpdate(nextProps.coords,this.props.marker) 
        }  
    }

    render() {
        console.log("init update")
        return (
            <>
                <i></i>
            </>
        )
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
	coords: state.heartbeatThing1.thingLiveDataSetsListener.coords,
	// top5Tags
	top5Tags: state.top5Tags1.top5Tags,
	top5TagsListener: state.top5Tags1.top5TagsListener,
	matchDataResults: state.top5Tags1.top5Tags.matchDataResults
});

export default connect(mapStateToProps)(MarkerDynamicUpdateModeOne)
