import React, { Component } from 'react';
// components
import GoogleMap from '../../sections/GoogleMap';
import ContentBoxMarkerUserDeviceModeOne from './ContentBoxMarkerUserDeviceModeOne'
import ContentBoxMarkerTop5TagsModeOne from './ContentBoxMarkerTop5TagsModeOne';
// Redux stuff
import { connect } from 'react-redux';
// _
let _ = require('underscore');

 //////////////////////////////////////////////////// userDevice

// InfoWindow component userDevice
const InfoWindowUserDevie = ({usercredentials, matchdataresults}) => {
  return (
    <>
      <ContentBoxMarkerUserDeviceModeOne 
        usercredentials={usercredentials}
        matchdataresults={matchdataresults}
      />
    </>  
  );
};

// Marker component user device
const MarkerUserDevice = ({ show, usercredentials, matchdataresults }) => {
  // styles
  const markerStyle = {
    border: '1px solid white',
    borderRadius: '50%',
    height: 10,
    width: 10,
    backgroundColor: show ? 'red' : 'blue',
    cursor: 'pointer',
    zIndex: 10,
  };

  return (
    <>
      <div style={markerStyle} />
      {show && <InfoWindowUserDevie 
        usercredentials={usercredentials}
        matchdataresults={matchdataresults}
      />}
    </>
  );
};

//////////////////////////////////////////////////// top5Tags

// InfoWindow component userDevice
const InfoWindowTop5Tags = ({top5tag}) => {
  return (
    <>
      <ContentBoxMarkerTop5TagsModeOne top5tag={top5tag}/>
    </>  
  );
};

// Marker component top5Tags
const MarkerTop5Tags = ({ show, top5tag }) => {
  // styles
  const markerStyle = {
    border: '1px solid white',
    borderRadius: '50%',
    height: 10,
    width: 10,
    backgroundColor: show ? 'red' : 'blue',
    cursor: 'pointer',
    zIndex: 10,
  };

  return (
    <>
      <div style={markerStyle} />
      {show && <InfoWindowTop5Tags top5tag={top5tag}/>}
    </>
  );
};

class MarkerInfoWindow extends Component {

  static defaultProps = {
    center: {
      lat: this.props.coords.lat,
      lng: this.props.coords.lon
    },
    zoom: 19
  };
  
  render() {
    // redux state
    const {
      top5Tags,
      userCredentials,
      matchDataResults,
      coords
    } = this.props

    return (
      <>
        {
          <GoogleMap
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
          >
            {/* userMarker */}
            <MarkerUserDevice
              lat={coords.lat}
              lng={coords.lon}
              usercredentials={userCredentials}
              matchdataresults={matchDataResults}
              show={true}
            />
            {/* vendors markers */}
            {
              !_.isEmpty(top5Tags) && (
                top5Tags.map((top5Tag) => (
                  <MarkerTop5Tags
                    key={top5Tag.doc.id}
                    lat={top5Tag.coords.lat}
                    lng={top5Tag.coords.lon}
                    show={true}
                    top5tag={top5Tag}
                  />
                ))
              )
            }
          </GoogleMap>
        }
      </>
    );
  }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
  top5Tags:state.userDevices1.top5Tags,
  userCredentials: state.user.userCredentials,
  matchDataResults: state.heartbeatThing1.thingLiveDataSets.matchDataResults,
  coords: state.heartbeatThing1.thingLiveDataSets.coords
});

export default connect(mapStateToProps)(MarkerInfoWindow)
