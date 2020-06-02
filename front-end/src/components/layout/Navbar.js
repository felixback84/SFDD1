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
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

// components-buttons
import MyButtonMyWorld from './buttons/MyButtonMyWorld';
import MyButtonStore from './buttons/MyButtonStore';
import MyButtonDevice from './buttons/MyButtonDevice';
import MyButtonNotifications from './buttons/MyButtonNotifications';
import MyButtonProfile from './buttons/MyButtonProfile';
import MyButton from './buttons/MyButtonProfile';

// Redux stuff
import { connect } from 'react-redux';

// styles
const styles = (theme) => ({
    ...theme.notColor
});

// const useStyles = makeStyles(() => ({
//     appBar: {
//         top: 'auto',
//         bottom: 0,
//         background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
//     },
//     grow: {
//         flexGrow: 1,
//     }
// })); 

class Navbar extends Component {
    render() {
    //const classes = useStyles();
    const { classes, authenticated } = this.props;
    // const { credentials } = this.props;
    // console.log(credentials);
    // const {
    //     user: {
    //         credentials: { createdAt, bio }
    //     }
    // } = this.props;
    // console.log(bio);

    return(
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            {authenticated ? (
                <Fragment>
                    <MyButtonMyWorld/>
                    <div className={classes.grow} />
                    <MyButtonStore/>
                    <div className={classes.grow} />
                    <MyButtonDevice className={classes.fabButton}/>
                    <div className={classes.grow} />
                    <MyButtonNotifications/>
                    <div className={classes.grow} />
                    <MyButtonProfile/>
                </Fragment>
            ) : (
                <Fragment>
                    <div className={classes.grow} />
                    <Link to="/">
                        <IconButton>
                            <HomeIcon/>
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
