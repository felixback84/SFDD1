import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import { hildaPostActiveCommand, hildaPostInactiveCommand } from '../../../redux/actions/hildaUIActions';

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

// class component
class SwitchForActiveCommandHildaUI extends Component { 
    // state
    state = {
        checkedForThing: false
    }
    // if the thing is already actived
    activedThing = () => {
        // props
        const { active } = this.props
        // check if the thing is active
        if( active === true ) 
            return true;
        else 
            return false;
    };
    // handle change
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
    // action to active thing
    activeThing = () => {
        this.props.hildaPostActiveCommand(this.props.thingid);
    };
    // action to inactive thing
    inactiveThing = () => {
        this.props.hildaPostInactiveCommand(this.props.thingid);
    };  

    render(){ 
        const switchButtonToActiveThings = (!this.activedThing() ? (
            <FormControlLabel
                control={
                    <PurpleSwitch 
                        checked={false}
                        onChange={this.handleChange} 
                        name="checkedForInactiveThings"
                        onClick={this.activeThing}
                    />
                }
                label={<Typography>{this.props.labelToSwitch}</Typography>}
            />
            ):(
            <FormControlLabel
                control={
                    <PurpleSwitch 
                    checked={true} 
                    onChange={this.handleChange} 
                    name="checkedForActiveThings"
                    onClick={this.inactiveThing} 
                    />
                }
                label={<Typography>{this.props.labelToSwitch}</Typography>}
            />
        )) 
        // return
        return switchButtonToActiveThings;
    }  
}
// state in redux
const mapStateToProps = (state) => ({
    active: state.hildaThing1.thingData.active
})
// redux actions to props
const mapActionsToProps = {
    hildaPostActiveCommand,
    hildaPostInactiveCommand
};

export default connect(mapStateToProps,mapActionsToProps)(SwitchForActiveCommandHildaUI);