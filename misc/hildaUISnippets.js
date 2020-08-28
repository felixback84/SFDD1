import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

// color picker
//import { SketchPicker } from 'react-color';

// state
    // constructor(props) {
    //     super(props);
    //     this.state = {
            
    //     };
    // }

// send changes of colors inputs
// handleChange = (event) => {
//     this.setState({ color:{[event.target.name]: event.target.value }});
// };

// submit on mouse released
// handleSubmit = (event, value) => {
//     event.preventDefault();
//     const colorValues = { color: { R:value, G:value, B:value }};
//     // trigger redux action
//     this.props.hildaPostColorCommand(this.props.thingid, colorValues);
// };

{/* title oh thing */}
<Typography>
Hilda Device: {}
</Typography>
{/* switch for motor */}

{/* slider for motor */}
<PrettoSlider 
name="R"
aria-labelledby="R"
valueLabelDisplay="auto" 
aria-label="R" 
defaultValue={this.state.color.R} 
onChange={this.handleChange}
onChangeCommitted={this.handleSubmit}
/>
{/* switch for heater */}

{/* slider for heater */}
<PrettoSlider 
name="R"
aria-labelledby="R"
valueLabelDisplay="auto" 
aria-label="R" 
defaultValue={this.state.color.R} 
onChange={this.handleChange}
onChangeCommitted={this.handleSubmit}
/>
{/* switch for color */}

{/* color picker */}
<SketchPicker
color={ this.state.background }
onChangeComplete={ this.handleChangeComplete }
/>


import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

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