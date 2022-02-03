import React from 'react'
// mui
import Box from "@material-ui/core/Box"
// components
import GoogleMapModeOne from './GoogleMapModeOne'
import StreetViewModeOne from './StreetViewModeOne'
// Redux stuff
import { connect } from 'react-redux'

const GMapsServicesModeOne = (props) => {

    // check
    if(props.checked === true){
        return(
            <StreetViewModeOne
                coords={props.coords}
                top5tags={props.top5Tags}
            />
        )
    } else if (props.checked === false){
        return(
            <GoogleMapModeOne 
                coordz={props.coords}
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

export default connect(mapStateToProps)(GMapsServicesModeOne)
