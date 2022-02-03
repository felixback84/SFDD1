import React from 'react'
// components
import GoogleMapModeTwo from './GoogleMapModeTwo'
import StreetViewModeTwo from './StreetViewModeTwo'
// Redux stuff
import { connect } from 'react-redux'

const Wrapper = (props) => {
    // api google set method
	React.useEffect(() => {
		// gmaps
		let google = window.google
		// node
		let map = mapRef.current
		// geolocation dynamic user
		const myLatlng = new google.maps.LatLng(
			props.coords.lat, 
			props.coords.lon
		)
		// map options
		const mapOptions = {
			zoom: 19,
			center: myLatlng,
		}
		// map instance
        map = new google.maps.Map(map, mapOptions)
    })   
}

const GMapsServicesModeTwo = (props) => {

    // check 
    if(props.checked === true){
        return(
            <StreetViewModeTwo 
                coords={props.coords}
                top5tags={props.top5Tags}
            />
        )
    } else if (props.checked === false){
        return(
            <GoogleMapModeTwo 
                coords={props.coords}
                colorValue={props.colorvalue}
            />
        )
    }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
    // top5Tags
    top5Tags:state.top5Tags1.top5Tags
})

export default connect(mapStateToProps)(GMapsServicesModeTwo)
