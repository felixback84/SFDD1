import React from 'react'
// mui
import Box from "@material-ui/core/Box"
// components
import GoogleMapModeFour from './GoogleMapModeFour'
import StreetViewModeFour from './StreetViewModeFour'
// Redux stuff
import { connect } from 'react-redux'
 
const GMapsServicesModeFour = (props) => {

    // check
    if(props.checked === true){
        return(
            <StreetViewModeFour
                coords={props.coords}
                top5tags={props.top5Tags}
            />
        )
    } else if (props.checked === false){
        return(
            <GoogleMapModeFour 
                coords={props.coords}
                colorValue={props.colorvalue}
            />
        )
    }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
    // top5Tags
    top5Tags:state.top5Tags1.top5Tags,
    coords:state.heartbeatThing1.thingLiveDataSets.coords
})

export default connect(mapStateToProps)(GMapsServicesModeFour)
