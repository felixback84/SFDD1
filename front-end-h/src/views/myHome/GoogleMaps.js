// react
import React, { Component } from 'react';
// google-map-react
import GoogleMapReact from 'google-map-react';
// components
import LocationPin from './LocationPin';

// redux stuff
import { connect } from 'react-redux';

class GoogleMapsToHeartbeat extends Component {

	render() {
		// redux state
		const {
				thingLiveDataSets:{
						coords:{
								lat,lon
						},
						top5Coords
				}
		} = this.props;
		
		// to pass keys
		let center = {
				lat:lat,
				lng:lon
		}
		
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: '50vh', width: '100%' }}>
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

// redux state
const mapStateToProps = (state) => ({
    thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets
})

export default connect(mapStateToProps)(GoogleMapsToHeartbeat);