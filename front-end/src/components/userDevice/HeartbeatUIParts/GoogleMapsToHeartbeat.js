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
        
        // other markers
        let otherMarkers = top5Coords.map(top5Coord => { 
            // index
            let i = 0
            // print
            console.log(`top5Coord: ${JSON.stringify(top5Coord.coords)}`);
            // pins
            return (
                <LocationPin
                    key={i++}
                    lat={top5Coord.coords.lat2}
                    lng={top5Coord.coords.lon2}
                    text={`${top5Coord.coords.lat2} - ${top5Coord.coords.lon2}`}
                />
            )
        });

        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{key:''}}
                    center={center}
                    defaultZoom={18}
                >
                    {/* main marker */}
                    <LocationPin
                        lat={center.lat}
                        lng={center.lng}
                        text={`${center.lat} - ${center.lng}`}
                    />
                    {/* other markers */}
                    {otherMarkers}
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