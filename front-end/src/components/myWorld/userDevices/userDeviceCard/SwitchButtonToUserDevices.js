import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import { activeUserDevice, inactiveUserDevice } from '../../../../redux/actions/userDevicesActions';


// styles
const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    '&$checked': {
      color: purple[500],
    },
    '&$checked + $track': {
      backgroundColor: purple[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

class SwitchButtonToUserDevice extends Component { 

  state = {
    checkedForUserDevices: false
  }
  // if the userDevice is already actived
  activedUserDevice = () => {
    if(
      this.props.user.activeUserDevices && 
      this.props.user.activeUserDevices.find(
            (activeUserDevice) => activeUserDevice.userDeviceId === this.props.userdeviceid
        ) 
    )
        return true;
    else return false;
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
    // this.changeBtn();
  };

  // action to active device
  activeUserDevice = () => {
    this.props.activeUserDevice(this.props.userdeviceid);
  };

  // action to inactive device
  inactiveUserDevice = () => {
    this.props.inactiveUserDevice(this.props.userdeviceid);
  };  

  render(){ 
    // conditional component
    const switchButtonActiveUserDevice = (!this.activedUserDevice() ? (
      <FormControlLabel
        control={
          <PurpleSwitch 
            checked={false}
            onChange={this.handleChange} 
            name="checkedForInactiveUserDevices"
            onClick={this.activeUserDevice}
          />
        }
        label={<Typography>{this.props.labelToSwitch}</Typography>}
      />
    ):(
      <FormControlLabel
        control={<PurpleSwitch 
          checked={true} 
          onChange={this.handleChange} 
          name="checkedForActiveUserDevices"
          onClick={this.inactiveUserDevice} 
        />}
        label={<Typography>{this.props.labelToSwitch}</Typography>}
      />
    )) 
    return switchButtonActiveUserDevice;
  }  
}

const mapStateToProps = (state) => ({
  user:state.user
})

const mapActionsToProps = {
    activeUserDevice,
    inactiveUserDevice
};

export default connect(mapStateToProps,mapActionsToProps)(SwitchButtonToUserDevice);