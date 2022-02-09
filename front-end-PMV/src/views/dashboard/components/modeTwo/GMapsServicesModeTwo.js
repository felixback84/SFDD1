import React from 'react'
// components
import GoogleMapModeTwo from './GoogleMapModeTwo'
import StreetViewModeTwo from './StreetViewModeTwo'
// Redux stuff
import { connect } from 'react-redux'

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
