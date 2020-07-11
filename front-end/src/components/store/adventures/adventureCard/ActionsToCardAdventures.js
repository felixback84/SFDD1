import React from 'react';

//mui stuff
import CardActions from '@material-ui/core/CardActions';

// components
import FavButtonAdventure from '../FavButtonAdventure';

const ActionsToCardAdventures = (props) => {
    const {
        likescount,
        commentscount,
        price,
        adventureid
    } = props;

    return(
        <CardActions disableSpacing>
            {/* Other btn */}
            <FavButtonAdventure adventureid={adventureid}/>
            <span>{likescount} likes</span>
        </CardActions>
    )
}    

export default ActionsToCardAdventures;