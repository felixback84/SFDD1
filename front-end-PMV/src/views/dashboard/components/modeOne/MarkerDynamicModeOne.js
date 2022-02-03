import React, { Component } from 'react'
// icons
import { faUserCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons"
// modules
import ColorEngine from '../utils/ColorEngine/ColorEngine'
// Redux stuff
import { connect } from 'react-redux'
import { string } from 'prop-types'
// _
let _ = require('underscore')

class MarkerDynamicModeOne extends Component {

    // state
	constructor(props) {
		super(props)
		this.state = {
            markerDynamicDevice:{},
            // coords:{},
            counter:0,
		}
    }
    
    // marker obj
    comp(
        coordz,
        coords,
        map,
        markerInit
    ){
        console.log(`in marker - coordz:${JSON.stringify(coordz)},
            coords:${JSON.stringify(coords)}`
        )    
        // color class
        const colorClass = new ColorEngine()
        // color
        let colorBgIcon = colorClass.rgbToColorHex(this.props.colorvalue)
        // print
        console.log(`position buyer not live: ${JSON.stringify(coordz.lon)}
            and live: ${JSON.stringify(coords.lon)}`)
        // geolocation dynamic user
        let marker
        // check data
        if(coordz.lon != undefined){
            console.log("initPosition")
            const latlng = new window.google.maps.LatLng(
                coordz.lat, 
                coordz.lon
            )
            // marker unique
            marker = new window.google.maps.Marker({
                // position:latlng,
                //label: labels[labelIndex++ % labels.length],
                map:map,
                icon:{
                    path: faUserCircle.icon[4],
                    fillColor: colorBgIcon,
                    fillOpacity: 1,
                    anchor: new window.google.maps.Point(
                        faUserCircle.icon[0] / 2, // width
                        faUserCircle.icon[1] // height
                    ),
                    strokeWeight: 1,    
                    strokeColor: colorBgIcon,
                    scale: 0.05,
                },
            })
            marker.setPosition(latlng)
            return marker
            //console.log("endInitPosition")
        } 

        else if (coords.lon != undefined) {
            console.log("upPosition")
            console.log(`marker:${marker}`)
            const uplatlng = new window.google.maps.LatLng(
                coords.lat, 
                coords.lon
            )
            markerInit.setPosition(uplatlng) // Any marker in this point to set the posw    
            return marker
            // console.log("endUpPosition")
        }
    }   

    // props of the icon
    // const icon = {
    //     path: faUserCircle.icon[4],
    //     //fillColor: colorBgIcon,
    //     fillOpacity: 1,
    //     anchor: new window.google.maps.Point(
    //         faUserCircle.icon[0] / 2, // width
    //         faUserCircle.icon[1] // height
    //     ),
    //     strokeWeight: 1,
    //     //strokeColor: colorBgIcon,
    //     scale: 0.05,
    // }
    // update color marker
    // markerDynamicDevice.setIcon(icon)
    // console.log(`marker to update: ${JSON.stringify(marker)}`)
    

    // to update pos of the buyer    
    componentWillReceiveProps(nextProps){

        // console.log(`nextProps.coords: ${JSON.stringify(nextProps.coords)} 
        //     - this.props.coordz: ${JSON.stringify(this.props.coordz)} 
        //     - equal: ${_.isEqual(nextProps.coords,this.props.coordz)}`
        // )

        // check the counter to set or update the marker
        if(_.isEqual(nextProps.coords,this.props.coordz) === true){
            const markerInit = this.comp(
                this.props.coordz,
                {},
                this.props.map,
                {}
            )
            this.setState({markerDynamicDevice:markerInit})
            console.log("to init marker")
        }
        
        else if(_.isEqual(nextProps.coords,this.props.coordz) === false){
            this.comp(
                {},
                nextProps.coords,
                this.props.map,
                this.state.markerDynamicDevice
            )
            console.log("to update marker")
        }
    }

	render(){ 
        return(
            <></>
        )
    }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
	// user
	credentials: state.user.credentials,
	// userDevices
	userDevices: state.userDevices1.userDevices,
    // liveDataSets
    loading: state.heartbeatThing1.loading,
	profileToMatch: state.heartbeatThing1.thingLiveDataSets.profileToMatch,
    thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
    coords: state.heartbeatThing1.thingLiveDataSetsListener.coords,
	// top5Tags
	top5Tags: state.top5Tags1.top5Tags,
	top5TagsListener: state.top5Tags1.top5TagsListener,
	matchDataResults: state.top5Tags1.top5Tags.matchDataResults
});

export default connect(mapStateToProps)(MarkerDynamicModeOne)