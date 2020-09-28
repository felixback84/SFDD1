import React, { Component } from 'react';
import { SliderPicker } from 'react-color';

// Redux stuff
import { connect } from 'react-redux';
import { hildaPostColorCommand } from '../../../redux/actions/hildaUIActions';

class ColorPickerForHildaUI extends Component {
    // state
    state = {
        colorValue:{
            r: 0,
            g: 0,
            b: 0
        }
    };

    //handle change
    handleChange = (color) => {
        this.setState({ colorValue: color.rgb })
    };

    // handle change
    handleChangeComplete = (color, event) => {
        // trigger redux action
        this.props.hildaPostColorCommand(
            this.props.thingid, {
                colorValue:{
                    r: this.state.colorValue.r,
                    g: this.state.colorValue.g, 
                    b: this.state.colorValue.b,
                }
            }
        );
    };

    render() {
        return (
            <SliderPicker 
                color={ this.state.colorValue }
                onChangeComplete={this.handleChangeComplete}
                onChange={this.handleChange}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    colorValue: state.hildaThing1.thingLiveDataSets.colorValue,
})

export default connect(mapStateToProps, {hildaPostColorCommand})(ColorPickerForHildaUI);