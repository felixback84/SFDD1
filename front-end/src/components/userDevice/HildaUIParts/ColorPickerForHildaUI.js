import React, { Component } from 'react';
import { SliderPicker } from 'react-color';

// Redux stuff
import { connect } from 'react-redux';
import { hildaPostColorCommand } from '../../../redux/actions/hildaUIActions';

class ColorPickerForHildaUI extends Component {
    // state
    state = {
        background: '#fff',
    };

    //handle change
    handleChange = (color, event) => {
        //this.setState({ [event.target.name]: event.target.value });
        this.setState({ background: color.hex });
    };

    // handle change
    handleChangeComplete = (color, event) => {
        //this.setState({ background: color.hex });
        // trigger redux action
        this.props.hildaPostColorCommand(this.props.thingid, {background:this.state.background});
    };

    render() {
        return <SliderPicker 
                    color={ this.state.background }
                    onChangeComplete={this.handleChangeComplete}
                    onChange={this.handleChange}
                />;
    }
}

const mapStateToProps = (state) => ({
    colorValue: state.hildaThing1.thingData.colorValue,
})

export default connect(mapStateToProps, {hildaPostColorCommand})(ColorPickerForHildaUI);