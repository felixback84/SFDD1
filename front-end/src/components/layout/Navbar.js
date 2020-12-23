import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// mui
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

// icons
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PhonelinkRingIcon from '@material-ui/icons/PhonelinkRing';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';

// components-buttons
import GamesIcon from '@material-ui/icons/Games';
import MyButtonStore from './buttons/MyButtonStore';
import MyButtonNotifications from './buttons/MyButtonNotifications';
import MyButtonProfile from './buttons/MyButtonProfile';
import MyButton from './buttons/MyButtonProfile';

// Redux stuff
import { connect } from 'react-redux';

// styles
const styles = (theme) => ({
    ...theme.notColor
});

class Navbar extends Component {
    render() {
    // redux state
    const { classes, authenticated, credentials } = this.props;

    return(
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            {authenticated ? (
                // authenticated users
                <Fragment>
                    <div className={classes.grow} />
                    <Link to="/myHome">
                        <IconButton>
                            <GamesIcon />
                        </IconButton>
                    </Link>
                    <div className={classes.grow} />
                    <Link to="/myworld/devices">
                        <IconButton>
                            <SentimentSatisfiedAltIcon />
                        </IconButton>
                    </Link>
                    
                    <div className={classes.grow} />
                    <Link to="/userDevice">
                        <IconButton>
                            <PhonelinkRingIcon/>
                        </IconButton>
                    </Link>
                    <div className={classes.grow} />
                    <MyButtonNotifications/>
                    <div className={classes.grow} />
                    <MyButtonProfile/>
                    <div className={classes.grow} />
                </Fragment>
            ) : (
                // not authenticated users
                <Fragment>
                    <div className={classes.grow} />
                    <Link to="/">
                        <IconButton>
                            {/* <HomeIcon/> */}
                            SFDD
                        </IconButton>
                    </Link>
                    <div className={classes.grow} />
                    <Link to="/signup">
                        <IconButton>
                            <VpnKeyIcon/>
                        </IconButton>
                    </Link>
                    <div className={classes.grow} />
                    <Link to="/login">
                        <IconButton>
                            <AssignmentTurnedInIcon/>
                        </IconButton>
                    </Link>
                    <div className={classes.grow} />  
                    <Link to="/store/devices">
                        <IconButton>
                            <MyButtonStore/>
                        </IconButton>
                    </Link>                 
                    <div className={classes.grow} />
                    <Link to="/blog">
                        <IconButton>
                            Vlog
                        </IconButton>
                    </Link>                 
                    <div className={classes.grow} />
                </Fragment>
            )}    
            </Toolbar>
        </AppBar>
    )};  
}

Navbar.protoTypes = {
    authenticated: PropTypes.bool.isRequired
}  

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    //user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
