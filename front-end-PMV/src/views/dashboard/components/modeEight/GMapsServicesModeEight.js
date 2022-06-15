import React from 'react'
// mui
import Box from "@material-ui/core/Box"
// components
import GoogleMapModeEight from './GoogleMapModeEight'
import StreetViewModeEight from './StreetViewModeEight'
// Redux stuff
import { connect } from 'react-redux'
 
const GMapsServicesModeEight = (props) => {

    // check
    if(props.checked === true){
        return(
            <StreetViewModeEight
                coords={props.coords}
                top5tags={props.top5Tags}
            />
        )
    } else if (props.checked === false){
        return(
            <GoogleMapModeEight
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

export default connect(mapStateToProps)(GMapsServicesModeEight)
