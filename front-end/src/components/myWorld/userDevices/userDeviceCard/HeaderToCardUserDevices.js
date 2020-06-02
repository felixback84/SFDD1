import React from 'react';
// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';

// components
import SwitchButtonToUserDevices from './SwitchButtonToUserDevices';

const styles = (theme) => ({
    avatar: {
        backgroundColor: red[500],
    }
});

const HeaderToCardUserDevices = (props) => {
    const {
        classes,
        nameofdevice,
        agerate,
        userdeviceid
    } = props;
    return (
        <div>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {nameofdevice.charAt(0)}
                    </Avatar>
                }
                action={
                    <SwitchButtonToUserDevices 
                        labelToSwitch={nameofdevice} 
                        userdeviceid={userdeviceid}
                    />
                }
                title={'Name of device: ' + nameofdevice}
                subheader={'For ages from: ' + agerate}
            />
        </div>
    )
}
export default withStyles(styles)(HeaderToCardUserDevices);