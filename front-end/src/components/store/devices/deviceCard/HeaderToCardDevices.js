import React from 'react';
// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';

// components
import DeviceDialog from '../deviceDialog/DeviceDialog';

const styles = (theme) => ({
    avatar: {
        backgroundColor: red[500],
    }
});

const HeaderToCardDevices = (props) => {
    const {
        classes,
        nameofdevice,
        agerate,
        price,
        deviceid
    } = props;
    return (
        
        <CardHeader
            avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {nameofdevice.charAt(0)}
                </Avatar>
            }
            // action={
            //     <DeviceDialog 
            //         labelToSwitch={nameofdevice} 
            //         deviceid={deviceid}
            //     />
            // }
            title={
                <Chip
                    icon={<FaceIcon />}
                    label={price + 'USD'}
                /> }
            subheader={nameofdevice + ' device. For ages from: ' + agerate}
        />
        
    )
}
export default withStyles(styles)(HeaderToCardDevices);