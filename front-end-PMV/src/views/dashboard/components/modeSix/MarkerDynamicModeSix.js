import React, { Component } from 'react'
// Redux stuff
import { connect } from 'react-redux';
import { heartbeatThingSyncDataLiveDB } from '../../../../redux/actions/heartbeatUIActions'
// font awesome
import { faUserCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons";
// modules
import ColorEngine from '../utils/ColorEngine/ColorEngine'
// _
let _ = require('underscore')

class MarkerDynamicModeSix extends Component {

    // state
	constructor(props) {
		super(props)
		this.state = {
            markerDynamicDevice:{},
		}
    }

    // marker obj
    hiMarkerDynamic(
        coordz,
        map,
        credentials,
        coords,
        markerInit, 
    ){
        // console.log(`in marker - coordz:${JSON.stringify(coordz)},
        //     coords:${JSON.stringify(coords)}`
        // )    
        // color class
        const colorClass = new ColorEngine()
        // color
        let colorBgIcon = colorClass.rgbToColorHex(this.props.colorvalue)
        // print
        // console.log(`position buyer not live: ${JSON.stringify(coordz.lon)}
        //     and live: ${JSON.stringify(coords.lon)}`)
        // geolocation dynamic user
        let marker
        let infoWindowsDynamicDevices = []
        // icon
        const icon = {
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
        }

        // data infoWindow
		const getInfoWindowStringUserDevice = (credentials) => `
            <div>
                <div style="font-size: 16px;">
                    ${credentials.bio}
                </div>
                <div style="font-size: 14px;">
                    <span style="color: grey;">
                    ${credentials.email}
                    </span>
                    <span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(credentials.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(credentials.rating))}</span>
                </div>
                <div style="font-size: 14px; color: grey;">
                    ${credentials.names} ${credentials.lastName}
                </div>
                <div style="font-size: 14px; color: grey;">
                    ${credentials.type}
                </div> 
                <div style="font-size: 14px; color: green;">
                    ${true ? 'Open' : 'Closed'}
                    ${credentials.userHandle}
                </div>
            </div>`
    
        // check data
        if(coordz.lon != undefined){
            console.log("initPosition")
            const latlng = new window.google.maps.LatLng(
                coordz.lat, 
                coordz.lon
            )
            // marker unique
            marker = new window.google.maps.Marker({
                map:map,
                icon,
            })
            // set pos
            marker.setPosition(latlng)
            // info window
            infoWindowsDynamicDevices = new window.google.maps.InfoWindow({
                content: getInfoWindowStringUserDevice(credentials),
            })
            // clicker marker
            marker.addListener('click', () => {
                infoWindowsDynamicDevices.open(map, marker)
            })
            console.log("endInitPosition")
            return marker
        } else if (coords.lon != undefined) {
            console.log("upPosition")
            const uplatlng = new window.google.maps.LatLng(
                coords.lat, 
                coords.lon
            )
            markerInit.setPosition(uplatlng) // Any marker in this point to set the pos
            // update color marker
            markerInit.setIcon(icon) 
            // pass data to path
            console.log("endUpPosition")
            return marker
        } 
    }   

    // to update pos of the buyer    
    componentWillReceiveProps(nextProps){

        // console.log(`nextProps.coords: ${JSON.stringify(nextProps.coords)} 
        //     - this.props.coordz: ${JSON.stringify(this.props.coordz)} 
        //     - equal: ${_.isEqual(nextProps.coords,this.props.coordz)}`
        // )

        // check the counter to set or update the marker
        if(this.props.coordz.lat != undefined){
            if(_.isEqual(nextProps.coords,this.props.coordz) === true){
                const markerInit = this.hiMarkerDynamic(
                    this.props.coordz,
                    this.props.map,
                    this.props.credentials,
                    // dynamic data
                    {},
                    {},
                )
                // set state
                this.setState({markerDynamicDevice:markerInit})
                console.log("to init marker")
            }
            
            else if(_.isEqual(nextProps.coords,this.props.coordz) === false){
                const markerSeq = this.hiMarkerDynamic(
                    {},
                    this.props.map,
                    this.props.credentials,
                    // dynamic data
                    nextProps.coords,
                    this.state.markerDynamicDevice, 
                )
                console.log("to update marker")
            }
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
	coords:state.heartbeatThing1.thingLiveDataSetsListener.coords,
    // top5Products
    loading:state.top5Products1.loading,
    top5Products: state.top5Products1.top5Products,
    // top5ProductsListener: state.top5Products1.top5ProductsListener
})

export default connect(mapStateToProps,{heartbeatThingSyncDataLiveDB})(MarkerDynamicModeSix)
