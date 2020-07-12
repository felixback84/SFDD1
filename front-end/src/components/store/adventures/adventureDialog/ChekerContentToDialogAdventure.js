import React, { Component } from 'react';
// mui stuff
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

// components
import AudioToAdventure from './AudioToAdventure';
import ContentToDialogAdventure from './ContentToDialogAdventure';
import CarrouselOfImagesAdventure from './CarrouselOfImagesAdventure';
import CardOfDevicesForAdventure from './CardOfDevicesForAdventure';

// Redux stuff
import { connect } from 'react-redux';

class ChekerContentToDialogAdventure extends Component {
    render(){
        const {
            loading,
            devices
        } = this.props;

        // ofer adventures
        let devicesMarkup = devices.map(device => 
            <CardOfDevicesForAdventure key={device.deviceId} device={device}/>)

        return(
            loading ? (
                <CircularProgress size={20}/>
                ) : (
                    <Grid container spacing={1} 
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >    
                        <AudioToAdventure />
                        <ContentToDialogAdventure />
                        <CarrouselOfImagesAdventure />
                        {devicesMarkup}
                    </Grid> 
                ) 
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.adventures1.loading,
    devices: state.devices1.devices
    
})

export default connect(mapStateToProps)(ChekerContentToDialogAdventure);
