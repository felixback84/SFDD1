import React from 'react'
// mui
import Box from "@material-ui/core/Box"
// components
import GoogleMapModeTen from './GoogleMapModeTen'
import StreetViewModeTen from './StreetViewModeTen'
// Redux stuff
import { connect } from 'react-redux'
 
const GMapsServicesModeTen = (props) => {

    // check
    if(props.checked === true){
        return(
            <StreetViewModeTen
                coords={props.coords}
                top5tags={props.top5Tags}
            />
        )
    } else if (props.checked === false){
        return(
            <GoogleMapModeTen
                coords={props.coords}
                colorValue={props.colorvalue}
            />
        )
    }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
    // top5Tags
    // stop5Tags:state.top5Tags1.top5Tags,
    coords:state.heartbeatThing1.thingLiveDataSets.coords
})

export default connect(mapStateToProps)(GMapsServicesModeTen)
