// react
import React, { Component } from 'react';
// google-map-react
import GoogleMapReact from 'google-map-react';
// components
import LocationPin from './LocationPin';


class GoogleMaps extends Component {

	render() {
		// redux state
		const {
			coords
		} = this.props;
		
		// to pass keys
		let center = {
			lat:coords.lat,
			lng:coords.lon
		}
		
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: '60vh', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{key:'AIzaSyB_Qh44zgo6KY-McoJGXHI5E3dn5HIUBPs'}}
					center={center}
					defaultZoom={18}
			>
					{/* main marker */}
					<LocationPin
						lat={center.lat}
						lng={center.lng}
					/>
				</GoogleMapReact>
			</div>
		);
	}
}

export default (GoogleMaps);