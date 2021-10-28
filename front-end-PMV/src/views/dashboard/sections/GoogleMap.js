import React, { Component } from 'react'
// mui
import Box from "@material-ui/core/Box"
// google maps
import GoogleMapReact from 'google-map-react'
// components
import MarkersStaticsDevicesSelectedByUserDevice from '../components/modeTwo/MarkersStaticsDevicesSelectedByUserDevice'
// Redux stuff
import { connect } from 'react-redux';
// _
let _ = require('underscore');

class GoogleMap extends Component {

	// state
    constructor(props) {
        super(props)
        this.state = {
			arrMarkers:[]
        }
	}
	
	// onChildClick callback can take two arguments: key and childProps
	onChildClickCallback = (key) => {
		console.log(`key:${key}`)
		this.setState((state) => {
			const index = state.arrMarkers.findIndex((e) => (
				e.thingId === key
			))
			console.log(`index:${index}`)
			// state.arrMarkers[index].show = !state.arrMarkers[index].show // not open & close yet
			state.arrMarkers[index].show = true
			return { arrMarkers: state.arrMarkers }
		})
	}

    // filter of top5Tags
	componentWillReceiveProps(nextProps){
		// checker of changes in data
        if(nextProps.idOfSpecificStaticDevices){
            // promise
            const myPromise = new Promise((resolve, reject) => {
                // var to arr
                let arrFinal = []

                // print
				console.log(
					`hi filter of selected ones to markers: 
					${JSON.stringify(this.props.idOfSpecificStaticDevices)}`
				)

                // check if none static is selected
                if(this.props.idOfSpecificStaticDevices.length === 0){
                    arrFinal.push({...this.props.top5Tags[0],show:false})
                } else if(this.props.idOfSpecificStaticDevices.length != 0) {
                    // loop over selection
                    this.props.idOfSpecificStaticDevices.map((id)=>{
                        // filter
                        this.props.top5Tags.filter((arrItem)=>{
                            // checker
                            if(arrItem.thingId === id.thingIdToSearch
                                    // && ids.length != 0
                                ){
                                    arrFinal.push({...arrItem, show:false})
                                } 
                        })	
                    })
                }
                // print
                console.log(`arrFinalMarkers: ${JSON.stringify(arrFinal)}`)
                // promise resolve
                resolve(arrFinal)
            })

            // list of data for table
            return myPromise
                .then((data)=>{
                    // set state
					this.setState({ 
                        arrMarkers:data
                    })
                    // print
                    console.log(
                        `top5Tag data after filter to markers on state: 
                        ${JSON.stringify(this.state.arrMarkers)}`
                    )
                })
                .catch((err) => console.log('There was an error:' + err)) 
        }
    }

	render() {

		// to make the arr of markers selected by the user
		let arrMarkersSelected = (array) => {
			// print
			console.log(`arrInitStaticsMarkers:${JSON.stringify(array)}`)
			// loop
			return array.map((item)=>{
				return(
					<MarkersStaticsDevicesSelectedByUserDevice
						lat={item.coords.lat}
						lng={item.coords.lon}
						key={item.thingId}
						show={item.show}
						data={item}
					/>
				)
			})
		}

		// checker of data available
		if(this.props.loading == false){
			// print
			console.log(`coords center:${JSON.stringify(this.props.coords)}`)

			return(
				<>
					<Box
						height="600px"
						position="center" 
						width="100%"
						overflow="hidden"
						borderRadius=".375rem"
					>
						<GoogleMapReact
							defaultCenter={[this.props.coords.lat,this.props.coords.lon]} // pass live coords of current buyer
							defaultZoom={19}
							bootstrapURLKeys={{
								// key: process.env.REACT_APP_MAP_KEY,
								key: 'AIzaSyB_Qh44zgo6KY-McoJGXHI5E3dn5HIUBPs'
							}}
							onChildClick={this.onChildClickCallback}
							// google api
							yesIWantToUseGoogleMapApiInternals
							onGoogleApiLoaded={
								this.props.onGoogleApiLoaded
							}
						> 
							{/* arr of markers selected by the user */}
							{this.props.searchingMode[0] === "modeTwo" && arrMarkersSelected(this.state.arrMarkers)}
						</GoogleMapReact>
					</Box>
				</>
			)
		} else {
			return(
				<>
					<p>...wait for coords</p>
				</>
			)
		}
	}
}

// connect to global state in redux
const mapStateToProps = (state) => ({	
	idOfSpecificStaticDevices: state.heartbeatThing1.thingLiveDataSetsListener.idOfSpecificStaticDevices,
	// liveDataSets
	loading:state.heartbeatThing1.loading,
	searchingMode:state.heartbeatThing1.thingLiveDataSets.searchingMode,
	coords:state.heartbeatThing1.thingLiveDataSets.coords,
	// top5Tags
	top5Tags: state.top5Tags1.top5Tags,
})

export default connect(mapStateToProps)(GoogleMap);
