import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

// Icons
import UnfoldMore from '@material-ui/icons/UnfoldMore';

// Redux stuff
import { connect } from 'react-redux';
import { getDevice } from '../../../../redux/actions/devicesActions';
import { getAdventures } from '../../../../redux/actions/adventuresActions';

 class AddressFormToDevicePayment extends Component {

    

    render() {
        // events
        const handleClickConfirm = () => {
            setAddressData();
        };

        
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user:state.user.credentials,
    device: state.devices1.device

})

const mapActionsToProps = {
    setAddressData
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(AddressFormToDevicePayment));
