import React from 'react'
// components
import GoogleMapModeFive from './GoogleMapModeFive'
import StreetViewModeFive from './StreetViewModeFive'
// Redux stuff
import { connect } from 'react-redux'
 
const GMapsServicesModeFive = (props) => {

    // check
    if(props.checked === true){
        return(
            <StreetViewModeFive 
                coords={props.coords}
                top5tags={props.top5Tags}
            />
        )
    } else if (props.checked === false){
        return(
            <GoogleMapModeFive
                coords={props.coords}
                colorValue={props.colorvalue}
            />
        )
    }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
    // top5Tags
    top5Products:state.top5Tags1.top5Products,
    coords:state.heartbeatThing1.thingLiveDataSets.coords
})

export default connect(mapStateToProps)(GMapsServicesModeFive)
