import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Components
import MyButton from '../../../../utilities/MyButton';
import TitleToDialogUserAdventure from './TitleToDialogUserAdventure';
import ChekerContentToDialogUserAdventure from './ChekerContentToDialogUserAdventure';
import ActionsToDialogUserAdventure from './ActionsToDialogUserAdventure';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

// Icons
import UnfoldMore from '@material-ui/icons/UnfoldMore';

// Redux stuff
import { connect } from 'react-redux';
import { getUserAdventure } from '../../../../redux/actions/userAdventuresActions';

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

class UserAdventureDialog extends Component {

    state = {
        open: false
    };

    // events
    handleOpen = () => { 
        this.setState({ open: true });
        // redux actions
        this.props.getUserAdventure(this.props.useradventureid);
    }
    ////

    handleClose = () => {
        this.setState({ open: false });
    } 

    render(){
        // component props and redux props
        const {
            classes,
            userAdventure: { 
                adventure:{
                    createdAt,
                    active,
                    title,
                    description,
                    imgUrl,
                    tags,
                    duration,
                    laguage,
                    device: {
                        badgeUrl,
                        nameOfDevice
                    }
                }
            },
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
                    <TitleToDialogUserAdventure 
                        onClose={this.handleClose} 
                        title={title} 
                        nameOfDevice={nameOfDevice}
                        
                    /> 
                    <ChekerContentToDialogUserAdventure/>
                    {/* dialog actions */}
                    <ActionsToDialogUserAdventure/>
                </Dialog>        
            </Fragment>   
        )
    }   
}

const mapStateToProps = (state) => ({
    loading: state.userAdventures1.loading,
    userAdventure: state.userAdventures1.userAdventure,
    ui: state.ui
})

const mapActionsToProps = {
    getUserAdventure
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(UserAdventureDialog));
