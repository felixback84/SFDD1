import React from 'react';
// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faUserCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons";
// mui icons
import Icon from '@material-ui/core/Icon';

// InfoWindow component
const InfoWindow = (props) => {
    // props
    const { dataVendor } = props
    // style
    const infoWindowStyle = {
        position: 'relative',
        bottom: 150,
        left: '-45px',
        width: 220,
        backgroundColor: 'white',
        boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
        padding: 10,
        fontSize: 14,
        zIndex: 100,
    };

    return (
        <div style={infoWindowStyle}>
            <div style={{ fontSize: 16 }}>
                {dataVendor.userCredentials.companyName}
            </div>
            <img 
                src={dataVendor.userCredentials.imgUrl} 
                style={{ width: "200px", height:"200px" }}
            />
            {/* <div style={{ fontSize: 14 }}>
            <span style={{ color: 'grey' }}>
                {place.rating}
                {' '}
            </span>
            <span style={{ color: 'orange' }}>
                {String.fromCharCode(9733).repeat(Math.floor(place.rating))}
            </span>
            <span style={{ color: 'lightgrey' }}>
                {String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}
            </span>
            </div>
            <div style={{ fontSize: 14, color: 'grey' }}>
                {place.types[0]}
            </div>
            <div style={{ fontSize: 14, color: 'grey' }}>
            {'$'.repeat(place.price_level)}
            </div>
            <div style={{ fontSize: 14, color: 'green' }}>
                {place.opening_hours.open_now ? 'Open' : 'Closed'}
            </div> */}
        </div>
    )
}

export default function MarkersStaticsDevicesSelectedByUserDevice(props) {

    // style
    const markerStyle = {
        border: '1px solid white',
        borderRadius: '50%',
        height: 20,
        width: 20,
        backgroundColor: props.show ? 'red' : 'blue',
        cursor: 'pointer',
        zIndex: 10,
    }

    return (
        <>
            <div 
                style={markerStyle} 
                //className="fa fa-plus-circle" 
                //color="primary"
            />
            {
                props.show && <InfoWindow dataVendor={props.data} />
            }
        </>
    )
}
