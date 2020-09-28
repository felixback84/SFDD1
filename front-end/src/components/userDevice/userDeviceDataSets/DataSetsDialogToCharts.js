import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// Components
import TitleToDataSetsDialogToCharts from './TitleToDataSetsDialogToCharts';
import ChartOfThingTimesActive from './ChartOfThingTimesActive';
import ChartOfThingTimesActiveEachDay from './ChartOfThingTimesActiveEachDay';
// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
// Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
// Redux stuff
import { connect } from 'react-redux';
import { getAllDataSetsUserDevice } from '../../../redux/actions/dataSetsActions';

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

class DataSetsDialogToCharts extends Component {

    state = {
        open: false
    };

    // events
    handleOpen = () => { 
        this.setState({ open: true });
        // redux actions
        this.props.getAllDataSetsUserDevice(this.props.userdeviceid);
    }

    handleClose = () => {
        this.setState({ open: false });
    } 

    render(){
        // component props and redux props
        const {
            classes,
            userDevice:{
                userDeviceId,
                device:{
                    nameOfDevice
                }
            },
            dataSets,
            ui: { loading }
        } = this.props; 

        return(
            <Fragment>
                {/* Open button */}
                <IconButton onClick={this.handleOpen} 
                    tip="Expand scream" 
                >
                    <MoreVertIcon />
                </IconButton>
                {/* Dialog box */}
                <Dialog 
                    fullScreen 
                    open={this.state.open} 
                    onClose={this.handleClose} 
                    fullWidth maxWidth="sm" 
                    TransitionComponent={Transition}
                    scroll="body"
                >    
                    {/* title of dialog */}
                    <TitleToDataSetsDialogToCharts 
                        onClose={this.handleClose} s
                        nameofdevice={nameOfDevice}
                    />  
                    {/* charts of times active */}
                    <ChartOfThingTimesActive datasets={dataSets}/>
                    {/* charts of times active each month */}
                    <ChartOfThingTimesActiveEachDay 
                        datasets={dataSets} 
                        userdeviceid={userDeviceId}
                    />
                </Dialog>        
            </Fragment>   
        )
    }   
}

const mapStateToProps = (state) => ({
    ui: state.ui,
    userDevice: state.userDevices1.userDevice,
    dataSets: state.dataSets1.dataSets
})

const mapActionsToProps = {
    getAllDataSetsUserDevice
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(DataSetsDialogToCharts));
