import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

// Proptypes
import PropTypes from 'prop-types'; 

// Components
import Device from '../../components/store/devices/Device';
import UserDeviceSkeleton from '../../utilities/UserDeviceSkeleton';
 
// Redux stuff
import { connect } from 'react-redux';
import { getDevices } from '../../redux/actions/devicesActions';

class storeDevices extends Component {
    
    componentDidMount() {
        this.props.getDevices(); 
    }

    render() {
        const { devices, loading } = this.props.devices1;

        let DevicesMarkup = !loading ? (
            devices.map(device => <Device key={device.deviceId} device={device}/>)
        ) : (
            <UserDeviceSkeleton/>
        );

        return (
            <Grid container spacing={6}>
                <Grid item sm={12} xs={12}>
                    {DevicesMarkup}
                </Grid>
            </Grid> 
        );
        
    }
}

const mapStateToProps = state => ({
    devices1: state.devices1
})

export default connect(mapStateToProps, {getDevices})(storeDevices);