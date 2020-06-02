import React from 'react';

//mui stuff
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';

// components
import UserDeviceDialog from '../userDevicesDialog/UserDeviceDialog';

// icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ActionsToCardUserDevices = (props) => {
    const {userdeviceid, deviceid} = props;
    return(
        <CardActions disableSpacing>
            {/* Dialog */}
            <UserDeviceDialog 
                userdeviceid={userdeviceid} 
                deviceid={deviceid}
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

export default ActionsToCardUserDevices;