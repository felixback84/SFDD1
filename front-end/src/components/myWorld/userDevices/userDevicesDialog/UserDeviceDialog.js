import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Components
import MyButton from '../../../../utilities/MyButton';
import TitleToDialogUserDevice from './TitleToDialogUserDevice';
import ChekerContentToDialogUserDevice from './ChekerContentToDialogUserDevice';
import DevicesIds from '../devicesDataSets/DevicesIds';
import ActionsToDialogUserDevice from './ActionsToDialogUserDevice';
import CarrouselOfImagesUserDevice from './CarrouselOfImagesUserDevice';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

// Icons
import UnfoldMore from '@material-ui/icons/UnfoldMore';

// Redux stuff
import { connect } from 'react-redux';
import { getUserDevice } from '../../../../redux/actions/userDevicesActions';
import { getAllDataSetsUserDevice } from '../../../../redux/actions/dataSetsActions';

// styles
const styles = (theme) => ({
    expandButton: {
        position: 'absolute',
        left: '90%'
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

class UserDeviceDialog extends Component {

    state = {
        open: false
    };

    // events
    handleOpen = () => { 
        this.setState({ open: true });
        // redux actions
        this.props.getUserDevice(this.props.userdeviceid);
        this.props.getAllDataSetsUserDevice(this.props.userdeviceid);
    }

    handleClose = () => {
        this.setState({ open: false });
    } 

    render(){
        // component props and redux props
        const {
            classes,
            userDevice: { 
                createdAt,
                active,
                device: {
                    howManyAdventures,
                    nameOfDevice,
                    description,
                    imgUrl,
                    ageRate
                }
            },
            dataSets,
            ui: { loading }
        } = this.props; 

        return(
            <Fragment>
                {/* Open button */}
                <MyButton onClick={this.handleOpen} 
                    tip="Expand scream" 
                    tipClassName={classes.expandButton}
                >
                    <UnfoldMore color="primary"/>
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
                    <TitleToDialogUserDevice 
                        onClose={this.handleClose} 
                        nameofdevice={nameOfDevice} 
                        agerate={ageRate} 
                    />  
                    {/* Images */}
                    <CarrouselOfImagesUserDevice imgurl={imgUrl}/>
                    {/* dataSets*/}
                    <DevicesIds 
                        deviceid={this.props.deviceid} 
                        datasets={dataSets}
                        loading={loading}
                    />
                    <ChekerContentToDialogUserDevice 
                        loading={loading} 
                        createdat={createdAt}
                        howmanyadventures={howManyAdventures}
                        description={description} 
                        imgurl={imgUrl} 
                        agerate={ageRate} 
                        nameofdevice={nameOfDevice}
                        />
                    {/* dialog actions */}
                    <ActionsToDialogUserDevice/>
                </Dialog>        
            </Fragment>   
        )
    }   
}

const mapStateToProps = (state) => ({
    loading: state.userDevices1.loading,
    userDevice: state.userDevices1.userDevice,
    ui: state.ui,
    dataSets: state.dataSets1.dataSets
})

const mapActionsToProps = {
    getUserDevice,
    getAllDataSetsUserDevice
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(UserDeviceDialog));
