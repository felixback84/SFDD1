import React from 'react';
// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';

// components
import SwitchButtonToUserAdventure from './SwitchButtonToUserAdventure';

const styles = (theme) => ({
    avatar: {
        backgroundColor: red[500],
    },
    chip: {
        margin: theme.spacing(0.5),
    }
});

const HeaderToCardUserAdventure = (props) => {
    const {
        classes,
        title,
        tags,
        useradventureid
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
export default withStyles(styles)(HeaderToCardUserAdventure);