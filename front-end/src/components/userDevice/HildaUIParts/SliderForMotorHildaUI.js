import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

// redux stuff
import { connect } from 'react-redux';
import { hildaPostMotorSpeedCommand } from '../../../redux/actions/hildaUIActions';

// pretto slider styles
const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

class SliderForMotorHildaUI extends Component {
    // state
    constructor(props) {
        super(props);
        this.state = {
            motorSpeed:0
        };
    }
    // send changes of input
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    // submit on mouse released
    handleSubmit = (event, value) => {
        event.preventDefault();
        const motorSpeedValue = {motorSpeed: value};
        // trigger redux action
        this.props.hildaPostMotorSpeedCommand(this.props.thingid, motorSpeedValue);
    };

    render() {
        return (
            <div>
                <PrettoSlider 
                    name="MotorSpeed"
                    aria-labelledby="MotorSpeed"
                    valueLabelDisplay="auto" 
                    aria-label="MotorSpeed" 
                    defaultValue={this.state.motorSpeed} 
                    onChange={this.handleChange}
                    onChangeCommitted={this.handleSubmit}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    motorSpeed: state.hildaThing1.thingData.motorSpeed
})

//export default Device;
export default connect(mapStateToProps, {hildaPostMotorSpeedCommand})(SliderForMotorHildaUI);
