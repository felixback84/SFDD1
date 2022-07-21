import React from 'react'
// mui
import Box from "@material-ui/core/Box"
// components
import GoogleMapModeNine from './GoogleMapModeNine'
import StreetViewModeNine from './StreetViewModeNine'
// Redux stuff
import { connect } from 'react-redux'
 
const GMapsServicesModeNine = (props) => {

    // check
    if(props.checked === true){
        return(
            <StreetViewModeNine
                coords={props.coords}
                top5tags={props.top5Tags}
            />
        )
    } else if (props.checked === false){
        return(
            <GoogleMapModeNine
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

export default connect(mapStateToProps)(GMapsServicesModeNine)
