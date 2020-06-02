import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Components
import MyButton from '../../../../utilities/MyButton';
import TitleToDialogDevice from './TitleToDialogDevice';
import ChekerContentToDialogDevice from './ChekerContentToDialogDevice';
import ActionsToDialogDevice from './ActionsToDialogDevice';
import CommentsToDialogDevice from './CommentsToDialogDevice';
import CommentFormToDialogDevice from './CommentFormToDialogDevice';

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

class DeviceDialog extends Component {

    state = {
        open: false
    };

    // events
    handleOpen = () => { 
        this.setState({ open: true });
        // redux actions
        this.props.getDevice(this.props.deviceid);
        this.props.getAdventures();
    }

    handleClose = () => {
        this.setState({ open: false });
    } 
 
    render(){
        // component props and redux props
        const {
            classes,
            device:{
                deviceId,
                videoUrl, 
                nameOfDevice,
                howManyAdventures,
                description,
                ageRate,
                price,
                likesCount,
                createdAt,
                commentsCount,
                badgeUrl,
                comments
            }
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
                    <TitleToDialogDevice 
                        onClose={this.handleClose} 
                        price={price} 
                        nameofdevice={nameOfDevice}
                        agerate={ageRate}
                        
                    /> 
                    <ChekerContentToDialogDevice nameofdevice={nameOfDevice}/>
                    {/* dialog actions*/}
                    <ActionsToDialogDevice deviceid={deviceId}/> 
                    {/* {commentsDevice} */}
                    <CommentsToDialogDevice/>
                    <CommentFormToDialogDevice deviceid={deviceId} />
                </Dialog>        
            </Fragment>   
        )
    }   
}

const mapStateToProps = (state) => ({
    
    device: state.devices1.device

})

const mapActionsToProps = {
    getDevice,
    getAdventures
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(DeviceDialog));
