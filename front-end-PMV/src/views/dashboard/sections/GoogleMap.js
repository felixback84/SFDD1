import React from 'react';
// mui
import Box from "@material-ui/core/Box";
// google maps
import GoogleMapReact from 'google-map-react';
// components
import GoogleMapModeOne from '../components/modeOne/GoogleMapModeOne'
// Redux stuff
import { connect } from 'react-redux';
// _
let _ = require('underscore');

// const handleApiLoaded = () => {
// 	// pick the right marker mix
// 	const pickerMarkerMix = (searchingmode) => {
// 		switch(searchingmode){
// 			case "modeOne":
// 				return(
// 					// <MarkerInfoWindowModeOne/>
// 					<GoogleMapModeOne/>
// 				)
// 			break;	
// 			// case "modeTwo":	
// 			// 	return(
// 			// 		<MarkerInfoWindowModeTwo 
// 			// 			coords={coords}
// 			// 			top5tag={top5Tag}
// 			// 		/>
// 			// 	) 
// 			// break;
// 			// case "modeThree":	
// 			// 	return(
// 			// 		<MarkerInfoWindowModeThree 
// 			// 			coords={coords}
// 			// 			top5products={top5Products}
// 			// 		/>
// 			// 	)
// 			// break;
// 			// case "modeFour":	
// 			// 	return(
// 			// 		<MarkerInfoWindowModeFour 
// 			// 			coords={coords}
// 			// 			top5product={top5Product}
// 			// 		/>
// 			// 	)
// 			// break;
// 			default:
// 				return(
// 					null
// 				)
// 		}
// 	}
// }

const GoogleMap = ({ children, ...props }) => {

	// checker of data available
	if(props.loading == false){
		// print
		console.log(`coords:${JSON.stringify(props.coords)}`)

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
						defaultCenter={[props.coords.lat,props.coords.lon]}
						defaultZoom={19}
						bootstrapURLKeys={{
							// key: process.env.REACT_APP_MAP_KEY,
							key: 'AIzaSyB_Qh44zgo6KY-McoJGXHI5E3dn5HIUBPs'
						}}
						yesIWantToUseGoogleMapApiInternals
						onGoogleApiLoaded={props.onGoogleApiLoaded}
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
	loading:state.heartbeatThing1.loading,
	coords:state.heartbeatThing1.thingLiveDataSets.coords,
});

export default connect(mapStateToProps)(GoogleMap);
