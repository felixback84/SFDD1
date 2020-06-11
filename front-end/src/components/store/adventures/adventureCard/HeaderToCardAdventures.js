import React from 'react';
// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';

const styles = (theme) => ({
    avatar: {
        backgroundColor: red[500],
    }
});

const HeaderToCardAdventures = (props) => {
    const {
        classes,
        nameofdevice,
        agerate,
        price,
        deviceid
    } = props;
    return (
        <div>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {title.charAt(0)}
                    </Avatar>
                }
                action={
                    <SwitchButtonToUserAdventure 
                        labelToSwitch={title} 
                        useradventureid={useradventureid}
                    />
                }
                title={'Name of device: ' + title}
                subheader={tags.map(tag => <Chip className={classes.chip} label={tag}/>)}
            />
        </div>
    )
}
export default withStyles(styles)(HeaderToCardAdventures);