import React from 'react';

//mui stuff
import CardActions from '@material-ui/core/CardActions';

// components
import FavButtonDevice from '../FavButtonDevice';

const ActionsToCardDevices = (props) => {
    const {
        deviceid,
        likescount, 
        commentscount,  
        price
    } = props;

    return(
        <CardActions disableSpacing>
            {/* Other btn */}
            <FavButtonDevice deviceid={deviceid}/>
            <span>{likescount} likes</span>
        </CardActions>
    )
}    

export default ActionsToCardDevices;