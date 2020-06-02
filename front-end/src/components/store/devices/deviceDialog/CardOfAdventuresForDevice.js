import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

// icons
import FaceIcon from '@material-ui/icons/Face';

// Redux stuff
import { connect } from 'react-redux';

const styles = (theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

function CardOfAdventuresForDevice(props) {
    
    const {
        classes, 
        adventure:{
            title,
            coverUrl,
            description,
            price
        }
    } = props;

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    component="img"
                    height="340"
                    image={coverUrl}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Chip
                    icon={<FaceIcon />}
                    label={price + ' USD'}
                />
            </CardActions>
        </Card>
    );
}

export default (withStyles(styles)(CardOfAdventuresForDevice));
