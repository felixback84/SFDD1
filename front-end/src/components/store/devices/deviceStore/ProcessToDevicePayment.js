import React, { Component, Fragment } from 'react'

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

// Icons
import StorefrontIcon from '@material-ui/icons/Storefront';

// components
import MyButton from '../../../../utilities/MyButton';
import StepperToDevicePayment from './StepperToDevicePayment';
import TitleToDevicePayment from './TitleToDevicePayment';

// Redux stuff
import { connect } from 'react-redux';
import { getDevice } from '../../../../redux/actions/devicesActions';

// styles
const styles = (theme) => ({
    expandButton: {
        position: 'relative'
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: '10px'
    },
    gridItems:{
        textAlign: 'center'
    }
});

// transition
const Transition = React.forwardRef(function Transition(props,ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ProcessToDevicePayment extends Component {
    
    state = {
        open: false
    };

    // events for modal
    handleOpen = () => { 
        this.setState({ open: true });
        // redux actions
        this.props.getDevice(this.props.deviceid);
    }

    handleClose = () => {
        this.setState({ open: false });
    } 
    
    render() {

        // props for show data components
        const {classes, nameofdevice, agerate, price} = this.props;

        return (
            <Fragment>
                {/* Open button */}
                <MyButton 
                    tip={`Buy ${nameofdevice}`} 
                    tipClassName={classes.buyButton}
                    onClick={this.handleOpen}
                >
                    <StorefrontIcon 
                        color="primary" 
                    />
                </MyButton>
                {/* Dialog box */}
                <Dialog 
                    fullScreen 
                    open={this.state.open} 
                    onClose={this.handleClose} 
                    fullWidth maxWidth="sm" 
                    TransitionComponent={Transition}
                    scroll="body"
                >    
                    <TitleToDevicePayment 
                        onClose={this.handleClose} 
                        price={price} 
                        nameofdevice={nameofdevice} 
                        agerate={agerate}
                    />
                    <StepperToDevicePayment />
                </Dialog>        
            </Fragment>   
        )
    }
}

const mapStateToProps = (state) => ({
    device: state.devices1.device
})

const mapActionsToProps = {
    getDevice
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(ProcessToDevicePayment));



