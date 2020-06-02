    import React, { Component } from 'react';
    import Switch from '@material-ui/core/Switch';
    import FormControlLabel from '@material-ui/core/FormControlLabel';
    import { withStyles } from '@material-ui/core/styles';
    import { purple } from '@material-ui/core/colors';
    import Typography from '@material-ui/core/Typography';

    // Redux
    import { connect } from 'react-redux';
    import { activeUserAdventure, inactiveUserAdventure } from '../../../../redux/actions/userAdventuresActions';


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

    class SwitchButtonToUserAdventure extends Component { 

    state = {
        checkedForUserDevices: false
    }
    
    // if the userAdventure is already actived
    activedUserAdventure = () => {
        console.log(this.props.useradventureid);
        if(
            this.props.user.activeUserAdventures && 
            this.props.user.activeUserAdventures.find(
                (activeUserAdventure) => activeUserAdventure.userAdventureId === this.props.useradventureid
            ) 
        )
            return true;
        else return false;
    };
    
    handleChange = (event) => {
            this.setState({[event.target.name]: event.target.value});
            // this.changeBtn();
        };

    // action to active adventure
    activeUserAdventure = () => {
        this.props.activeUserAdventure(this.props.useradventureid);
    };

    // action to inactive adventure
    inactiveUserAdventure = () => {
        this.props.inactiveUserAdventure(this.props.useradventureid);
    };  

    render(){ 
        console.log(this.activedUserAdventure());
        const switchButtonActiveUserAdventure = (!this.activedUserAdventure() ? (
        
        <FormControlLabel
            control={
            <PurpleSwitch 
                checked={false}
                onChange={this.handleChange} 
                name="checkedForInactiveUserAdventure"
                onClick={this.activeUserAdventure}
            />
            }
            label={<Typography>{this.props.labelToSwitch}</Typography>}
        />
        ):(
        <FormControlLabel
            control={<PurpleSwitch 
            checked={true} 
            onChange={this.handleChange} 
            name="checkedForActiveUserAdventure"
            onClick={this.inactiveUserAdventure} 
            />}
            label={<Typography>{this.props.labelToSwitch}</Typography>}
        />
        )) 
        return switchButtonActiveUserAdventure;
    }  
}

    const mapStateToProps = (state) => ({
    user: state.user
    })

    const mapActionsToProps = {
        activeUserAdventure,
        inactiveUserAdventure
    };

    export default connect(mapStateToProps,mapActionsToProps)(SwitchButtonToUserAdventure);