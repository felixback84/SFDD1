import React, { Component } from 'react'
// components
import LocationPin from './LocationPin';
// redux stuff
import { connect } from 'react-redux';

class OtherLocationPins extends Component {

    render() {
        // redux state
        const {top5Coords} = this.props
        // mapping 
        let s = top5Coords.map(top5Coord => { 
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
            <div>
                {s}
            </div>
        )
    }
}
// redux state
const mapStateToProps = (state) => ({
    top5Coords: state.heartbeatThing1.thingLiveDataSets.top5Coords
})
export default connect(mapStateToProps)(OtherLocationPins);
//export default OtherLocationPins