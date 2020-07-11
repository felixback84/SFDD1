import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Components
import MyButton from '../../../../utilities/MyButton';
import TitleToDialogAdventure from './TitleToDialogAdventure';
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
import { getAdventure } from '../../../../redux/actions/adventuresActions';
import { getDevices } from '../../../../redux/actions/devicesActions';

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

class AdventureDialog extends Component {

    state = {
        open: false
    };

    // events
    handleOpen = () => { 
        this.setState({ open: true });
        // redux actions
        this.props.getAdventure(this.props.adventureid);
        this.props.getDevices();
    }

    handleClose = () => {
        this.setState({ open: false });
    } 
 
    render(){
        // component props and redux props
        const {
            classes,
            adventure:{
                adventureId,
                createdAt,
                videoUrl, 
                device:{
                    nameOfDevice,
                    badgeUrl
                },
                duration,
                imgUrl,
                language,
                likesCount,
                price,
                tags,
                title
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
                    <TitleToDialogAdventure  
                        onClose={this.handleClose} 
                        title={title}
                        nameofdevice={nameOfDevice}
                    />  
                    <ChekerContentToDialogAdventure />
                    {/* dialog actions*/}
                    <ActionsToDialogAdventure adventureid={adventureId}/> 
                    {/* {commentsDevice} */}
                    <CommentsToDialogAdventure/>
                    <CommentFormToDialogAdventure adventureid={adventureId} />
                </Dialog>        
            </Fragment>   
        )
    }   
}

const mapStateToProps = (state) => ({
    adventure: state.adventures1.adventure
})

const mapActionsToProps = {
    getAdventure,
    getDevices
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(AdventureDialog));
