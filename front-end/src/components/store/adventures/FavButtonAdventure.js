import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from 'react-redux';
import { likeAdventure, unlikeAdventure } from '../../../redux/actions/adventuresActions';

// components
import MyButton from '../../../utilities/MyButton';

class FavButtonAdventure extends Component {

    // if the like already exists for the user
    likedAdventure = () => {
        if(
            this.props.user.likes && 
            this.props.user.likes.find(
                    (like) => like.adventureId === this.props.adventureid
                ) 
        )
            return true;
        else return false;
    };
    // action to add like
    likeAdventure = () => {
        this.props.likeAdventure(this.props.adventureid);
    };

    // action to undo like
    unlikeAdventure = () => {
        this.props.unlikeAdventure(this.props.adventureid);
    };

    render() {

        //like button logic to call one of above actions
        const likeButtonAdventure = (this.likedAdventure() ? (
                <MyButton tip="Undo like" onClick={this.unlikeAdventure}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
                ) : (
                <MyButton tip="Like" onClick={this.likeAdventure}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
                    )
            );
            return likeButtonAdventure;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeAdventure,
    unlikeAdventure
};

export default connect(mapStateToProps,mapActionsToProps)(FavButtonAdventure);
