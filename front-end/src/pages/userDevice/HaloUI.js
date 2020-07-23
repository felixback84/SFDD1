import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';

// Redux stuff
import { connect } from 'react-redux';
import { getUserDevice } from '../../redux/actions/userDevicesActions';

// style
const styles = (theme) => ({
    root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
})

class HaloUI extends Component {

    //redux action
    componentWillMount(){
        this.props.getUserDevice(this.props.userdeviceid);
    }

    render(){
        // props
        const {classes, userDevice} = this.props;

        return (
            <div className={classes.root}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                    {console.log(userDevice.device.dataSets)}
                </ButtonGroup>
            </div>
        );
    }
}

// redux state
const mapStateToProps = (state) => ({
    userDevice: state.userDevices1.userDevice
})
//export default Device;
export default connect(mapStateToProps,{getUserDevice})(withStyles(styles)(HaloUI));