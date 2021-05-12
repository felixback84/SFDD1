import React from 'react';
import PropTypes from 'prop-types';
// mui
import Box from "@material-ui/core/Box";
// componets
import GoogleMapReact from 'google-map-react';
import MarkerInfoWindowModeOne from 'views/dashboard/components/modeOne/MarkerInfoWindowModeOne';
// import MarkerInfoWindowModeTwo from 'views/dashboard/components/modeOne/MarkerInfoWindowModeTwo';
// import MarkerInfoWindowModeThree from 'views/dashboard/components/modeOne/MarkerInfoWindowModeThree';
// import MarkerInfoWindowModeFour from 'views/dashboard/components/modeOne/MarkerInfoWindowModeFour';

// pick the right marker mix
const pickerMarkerMix = (searchingmode) => {
	switch(searchingmode){
		case "modeOne":
			return(
				<MarkerInfoWindowModeOne 
					//coords={coords}
					//top5tags={top5Tags}
				/>
			)
		break;	
		// case "modeTwo":	
		// 	return(
		// 		<MarkerInfoWindowModeTwo 
		// 			coords={coords}
		// 			top5tag={top5Tag}
		// 		/>
		// 	)
		// break;
		// case "modeThree":	
		// 	return(
		// 		<MarkerInfoWindowModeThree 
		// 			coords={coords}
		// 			top5products={top5Products}
		// 		/>
		// 	)
		// break;
		// case "modeFour":	
		// 	return(
		// 		<MarkerInfoWindowModeFour 
		// 			coords={coords}
		// 			top5product={top5Product}
		// 		/>
		// 	)
		// break;
		default:
			return(
				null
			)
	}
}

const GoogleMap = ({ ...props }) => (
	<>
		<Box
			height="600px"
			position="relative"
			width="100%"
			overflow="hidden"
			borderRadius=".375rem"
		>
			<GoogleMapReact
				bootstrapURLKeys={{
					// key: process.env.REACT_APP_MAP_KEY,
					key: 'AIzaSyB_Qh44zgo6KY-McoJGXHI5E3dn5HIUBPs'
				}}
				{...props}
			>
				{/* picker mix */}
				{pickerMarkerMix(props.searchingmode)}
			</GoogleMapReact>
		</Box>
	</>
);

export default GoogleMap;