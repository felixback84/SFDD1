import React, { Component } from 'react'
// components
import ComboSearchModeOne from "./ComboSearchModeOne"
import ComboSearchModeThree from "./ComboSearchModeThree"
import ComboSearchModeFive from "./ComboSearchModeFive"
import ComboSearchModeSeven from "./ComboSearchModeSeven"

// Redux stuff
import { connect } from 'react-redux';
import {getTagsFromDeviceConfig} from "../../../../../redux/actions/uiActions"


const comboSearchingModeSwitcher = (searchingMode,tagsList) => {
    switch(searchingMode){
        case "modeOne":
            // get all available tags
            return(
                <ComboSearchModeOne 
                    staticDevicesTags={tagsList} 
                />
            ) 
        break;
        case "modeThree":
            return( 
                <>
                    {/* fileds */}
                    <ComboSearchModeThree
                        staticDevicesTags={tagsList}
                    />
                </>
            )   
        break;
        case "modeFive":
            return( 
                <>
                    {/* fileds */}
                    <ComboSearchModeFive
                        staticDevicesTags={tagsList}
                    />
                </>
            )   
        break;
        case "modeSeven": 
            return( 
                <>
                    {/* fileds */}
                    <ComboSearchModeSeven
                        staticDevicesTags={tagsList}
                    />
                </>
            )       
        break;
        default:
			return(
				null
			)
    }
}

class SearchEngine extends Component {

    // cycle  
    componentDidMount(){
        // redux actions to create ux
        switch(this.props.searchingmode){
            case "modeOne":
                if(this.props.loading === false && this.props.userDevices.length > 0){
                    // var to hold name of device
                    const composeStaticDeviceName = "static" + this.props.userDevices[0].device.nameOfDevice
                    // get all available tags
                    return this.props.getTagsFromDeviceConfig(composeStaticDeviceName) 
                }
            break;
            case "modeThree":
                if(this.props.loading === false && this.props.userDevices.length > 0){
                    // var to hold name of device
                    const composeStaticDeviceName = "static" + this.props.userDevices[0].device.nameOfDevice
                    // get all available tags
                    return this.props.getTagsFromDeviceConfig(composeStaticDeviceName) 
                }
            break;
            default:
                return null 
        }
    }
    render() {

        // data to search engine
        const dataToPass = this.props.staticDevicesTags
        
        return (
            <>
                {comboSearchingModeSwitcher(
                    this.props.searchingmode,
                    dataToPass
                )}  
            </>
        )
    }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
    // ui
    staticDevicesTags: state.ui.staticDevicesTags,
    // userDevices
    userDevices: state.userDevices1.userDevices,
    loading: state.userDevices1.loading,
    // liveDataSets
    thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
});

export default connect(mapStateToProps,{getTagsFromDeviceConfig})(SearchEngine)
    
