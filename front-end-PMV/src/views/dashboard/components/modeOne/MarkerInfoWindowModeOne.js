import React, { Component } from 'react';
// components
import ContentBoxMarkerTop5TagsModeOne from './ContentBoxMarkerTop5TagsModeOne';
import GoogleMap from '../../sections/GoogleMap';
// Redux stuff
import { connect } from 'react-redux';
// _
let _ = require('underscore');

//////////////////////////////////////////////////// userDevice

//InfoWindow component userDevice
const InfoWindowUserDevie = ({credentials, profiletomatch}) => {
  return (
    <>
      <ContentBoxMarkerUserDeviceModeOne 
        credentials={credentials}
        profiletomatch={profiletomatch}
      />
    </>  
  );
};

// Marker component user device
const MarkerUserDevice = ({ show, credentials, profiletomatch }) => {
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
          credentials={credentials}
          profiletomatch={profiletomatch}
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

class MarkerInfoWindowModeOne extends Component {
  
  render() {
  
    // redux state
    const {
      // user
      credentials,
      profileToMatch,
      coords,
      // top5Tags
      loading,
      top5Tags,
    } = this.props

    return (
      <>
        <GoogleMap>
          {/* user marker */}
          {
            <MarkerUserDevice
              lat={coords.lat}
              lng={coords.lon}
              credentials={credentials}
              profiletomatch={profileToMatch}
              show={false}
            />
          }
          {/* top5Tags markers */}
          {
            loading === false && (
              top5Tags.map((top5Tag) => (
                <MarkerTop5Tags
                  key={top5Tag.coords.lat + top5Tag.coords.lon}
                  lat={top5Tag.coords.lat}
                  lng={top5Tag.coords.lon}
                  show={false}
                  top5tag={top5Tag}
                />
              ))
            )
          }
        </GoogleMap>
      </>
    );
  }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
  // user
  credentials: state.user.credentials,
  profileToMatch: state.heartbeatThing1.thingLiveDataSets.profileToMatch,
  coords: state.heartbeatThing1.thingLiveDataSets.coords,
  // top5Tags
  loading: state.userDevices1.loading,
  top5Tags: state.userDevices1.top5Tags,
});

export default connect(mapStateToProps)(MarkerInfoWindowModeOne)
