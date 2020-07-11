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
        title,
        price,
        tags
    } = props;
    return (
        <div>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {title.charAt(0)}
                    </Avatar>
                }
                title={
                    <Chip
                        icon={<FaceIcon />}
                        label={price + ' USD'}
                    /> }
                subheader={`Buy: ${title}`}
            />
        </div>
    )
}
export default withStyles(styles)(HeaderToCardAdventures);