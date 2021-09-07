import React, { Component } from 'react';
// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faUserCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons";
// Redux stuff
import { connect } from 'react-redux';

class MarkersStaticsDevicesSelectedByUserDevice extends Component {

    // state
    constructor(props) {
        super(props)
        this.state = {
			arrMarkers: []
        }
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
                console.log(`hi filter of selected ones to markers: ${JSON.stringify(this.props.idOfSpecificStaticDevices)}`)

                // check if none static is selected
                if(this.props.idOfSpecificStaticDevices.length === 0){
                    arrFinal.push({...this.props.top5Tags[0]})
                } else if(this.props.idOfSpecificStaticDevices.length != 0) {
                    // loop over selection
                    this.props.idOfSpecificStaticDevices.map((id)=>{
                        // filter
                        this.props.top5Tags.filter((arrItem)=>{
                            // checker
                            if(arrItem.thingId === id.thingIdToSearch
                                    // && ids.length != 0
                                ){
                                    arrFinal.push({...arrItem})
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
                    // print
                    console.log(`top5Tag data after filter to markers: ${JSON.stringify(data)}`)
                    // set state
					this.setState({ 
						arrMarkers:data
                    })
                })
                .catch((err) => console.log('There was an error:' + err)) 
        }
    }
	
	render(){
        { 
            return this.state.arrMarkers.map((item)=>(
                <>
                    <FontAwesomeIcon 
                        icon={faDotCircle} 
                        key={item.coords.nameOfPoint}
                        lat={item.coords.lat}
                        lng={item.coords.lon}
                    />
                </>
            ))
        }
    }
}
// connect to global state in redux
const mapStateToProps = (state) => ({
    idOfSpecificStaticDevices: state.heartbeatThing1.thingLiveDataSetsListener.idOfSpecificStaticDevices,
	// top5Tags
	loading: state.top5Tags1.loading,
	top5Tags: state.top5Tags1.top5Tags,
});

export default connect(mapStateToProps)(MarkersStaticsDevicesSelectedByUserDevice)
