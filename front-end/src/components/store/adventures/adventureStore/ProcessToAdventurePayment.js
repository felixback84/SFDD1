import React, { Component, Fragment } from 'react'

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

// Icons
import StorefrontIcon from '@material-ui/icons/Storefront';

// components
import MyButton from '../../../../utilities/MyButton';
import StepperToAdventurePayment from './StepperToAdventurePayment';
import TitleToAdventurePayment from './TitleToAdventurePayment';

// Redux stuff
import store from '../../../../redux/store';
import { getAdventure } from '../../../../redux/actions/adventuresActions';

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

class ProcessToAdventurePayment extends Component {
    
    state = {
        open: false
    };

    // events for modal
    handleOpen = () => { 
        this.setState({ open: true });
        // redux actions
        store.dispatch(getAdventure(this.props.adventureid));
    }
 
    handleClose = () => {
        this.setState({ open: false });
    } 
    
    render() {

        // props for show data components
        const {
            classes, 
            title, 
            nameofdevice,
            price, 
            adventureid,
        } = this.props;

        return (
            <Fragment>
                {/* Open button */}
                <MyButton 
                    tip={`Buy ${title}`} 
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
                    <TitleToAdventurePayment 
                        onClose={this.handleClose} 
                        price={price} 
                        title={title} 
                        nameofdevice={nameofdevice}
                    />
                    <StepperToAdventurePayment adventureid={adventureid}/>
                </Dialog>        
            </Fragment>   
        )
    }
}


export default (withStyles(styles)(ProcessToAdventurePayment));


