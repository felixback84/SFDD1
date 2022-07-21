import React, { Component } from 'react';
// components
import GoogleMap from '../utils/GoogleMap.js'
import MarkerDynamicModeNine from './MarkerDynamicModeNine'
import MarkerStaticsModeNine from './MarkerStaticsModeNine'
// Redux stuff
import { connect } from 'react-redux';
import { heartbeatThingSyncDataLiveDB } from '../../../../redux/actions/heartbeatUIActions'


class GoogleMapModeNine extends Component {
	
    // redux action
	componentDidMount(){ 
		// live data from heartbeat
		this.props.heartbeatThingSyncDataLiveDB(this.props.userDevices[0].thingId)
		// coords points from user path
	}

    render() {
        // redux state
		const {
			// user
			credentials,
            // top5Products
			loading,
            top5Products,
            //top5ProductsListener
        } = this.props
        
        // checker of data available
		if(loading === false){
            
			// print
			// console.log(`position buyer live in products: ${JSON.stringify(this.props.coords)}`)
            // console.log(`products: ${JSON.stringify(top5Products)}`)
            
			return(
				<>
					<GoogleMap 
						id="myMap"
						onMapLoad={ 
							(map)=>{
								return(
									<> 
										<MarkerDynamicModeNine
											map={map}
											colorvalue={this.props.colorValue}
											coordz={this.props.coords}
										/>
										<MarkerStaticsModeNine
											map={map}
											colorvalue={this.props.colorValue}
											coordz={this.props.coordz}
										/>
									</>
								)
							}
						}	 
					>	
					</GoogleMap>
				</>
			)
		} else {
			return(
				<>
					<p>...wait for coords from modeThree</p>
				</>
			)
		}
    }
} 

// connect to global state in redux
const mapStateToProps = (state) => ({
	// user
	credentials: state.user.credentials,
	// userDevices
	userDevices: state.userDevices1.userDevices,
    // top5Products
    loading:state.top5Products1.loading,
    top5Products: state.top5Products1.top5Products,
    // top5ProductsListener: state.top5Products1.top5ProductsListener
})

export default connect(mapStateToProps,{heartbeatThingSyncDataLiveDB})(GoogleMapModeNine)
