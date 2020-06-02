import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from 'react-redux';
import { likeDevice, unlikeDevice } from '../../../redux/actions/devicesActions';

// components
import MyButton from '../../../utilities/MyButton';

class FavButtonDevice extends Component {

    // if the like already exists for the user
    likedDevice = () => {
        if(
            this.props.user.likes && 
            this.props.user.likes.find(
                    (like) => like.deviceId === this.props.deviceid
                ) 
        )
            return true;
        else return false;
    };
    // action to add like
    likeDevice = () => {
        this.props.likeDevice(this.props.deviceid);
    };

    // action to undo like
    unlikeDevice = () => {
        this.props.unlikeDevice(this.props.deviceid);
    };

    render() {

        //like button logic to call one of above actions
        const likeButtonDevice = (this.likedDevice() ? (
                <MyButton tip="Undo like" onClick={this.unlikeDevice}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
                ) : (
                <MyButton tip="Like" onClick={this.likeDevice}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
                    )
            );
            return likeButtonDevice;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeDevice,
    unlikeDevice
};

export default connect(mapStateToProps,mapActionsToProps)(FavButtonDevice);
