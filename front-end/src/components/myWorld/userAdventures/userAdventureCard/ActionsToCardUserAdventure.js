import React from 'react';

//mui stuff
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';

// components
import UserAdventureDialog from '../userAdventureDialog/UserAdventureDialog';

// icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ActionsToCardUserAdventure = (props) => {
    const {useradventureid, adventureid} = props;
    return(
        <CardActions disableSpacing>
            {/* Dialog */}
            <UserAdventureDialog 
                useradventureid={useradventureid} 
                adventureid={adventureid}
            />
            {/* Other btn */}
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
                <ShareIcon />
            </IconButton>
            <IconButton aria-label="show more">
                <ExpandMoreIcon />
            </IconButton>
        </CardActions>
    )
}    

export default ActionsToCardUserAdventure;