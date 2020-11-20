// react
import React, { Component } from 'react';
// google-map-react
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

    class GoogleMapsToHeartbeat extends Component {
        
        static defaultProps = {
            center: {
                lat: this.props.coords.lat,
                lng: this.props.coords.lon
            },
            zoom: 11
        };

        render() {
            return (
                // Important! Always set the container height explicitly
                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key:'' }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        <AnyReactComponent
                            lat={59.955413}
                            lng={30.337844}
                            text="My Marker"
                        />
                    </GoogleMapReact>
                </div>
            );
        }
}

export default GoogleMapsToHeartbeat;