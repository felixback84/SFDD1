// react
import React, { Component } from 'react';
// google-map-react
import GoogleMapReact from 'google-map-react';
// components
import LocationPin from './LocationPin';

// redux stuff
import { connect } from 'react-redux';

class GoogleMapsToHeartbeat extends Component {

    // req for coords match around
    componenWillMount(){
        this.props.getTop5CoordsMatches(this.props.thingid)
    }

    render() {
        // redux state
        const {
            coords:{
                lat,
                lon
            },
            top5Coords
        } = this.props;
        
        // to pass keys
        let center = {
            lat:lat,
            lng:lon
        }
        
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key:'' }}
                    center={center}
                    defaultZoom={18}
                >
                    {/* marker */}
                    <LocationPin
                        lat={center.lat}
                        lng={center.lng}
                        text={`${center.lat} - ${center.lng} `}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

// redux state
const mapStateToProps = (state) => ({
    coords: state.heartbeatThing1.thingLiveDataSets.coords,
    top5Coords: state.heartbeatThing1.top5Coords
})

export default connect(mapStateToProps)(GoogleMapsToHeartbeat);