import React from 'react'
import RoomIcon from '@material-ui/icons/Room';

const LocationPin = ({ text }) => (
    <div className="pin">
        <RoomIcon/>
        <p className="pin-text">{text}</p>
    </div>
)

export default LocationPin
