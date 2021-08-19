import React from 'react';
// mui
import Box from "@material-ui/core/Box";
// google maps
import GoogleMapReact from 'google-map-react';
// components
// import GoogleMapModeOne from '../components/modeOne/GoogleMapModeOne'
// Redux stuff
import { connect } from 'react-redux';
// _
let _ = require('underscore');

const GoogleMap = ({ children, ...props }) => {

	// checker of data available
	if(props.loading == false){
		// print
		console.log(`coords center:${JSON.stringify(props.coords)}`)

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
						defaultCenter={[props.coords.lat,props.coords.lon]} // pass coords of current buyer
						defaultZoom={19}
						bootstrapURLKeys={{
							// key: process.env.REACT_APP_MAP_KEY,
							key: 'AIzaSyB_Qh44zgo6KY-McoJGXHI5E3dn5HIUBPs'
						}}
						yesIWantToUseGoogleMapApiInternals
						onGoogleApiLoaded={
							props.onGoogleApiLoaded
						}
					> 
						{/* picker mix */}
						{children}
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
	
};

// connect to global state in redux
const mapStateToProps = (state) => ({	
	// liveDataSets
	loading:state.heartbeatThing1.loading,
	coords:state.heartbeatThing1.thingLiveDataSets.coords,
});

export default connect(mapStateToProps)(GoogleMap);