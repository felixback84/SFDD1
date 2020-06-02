import React from 'react';
// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = (theme) => ({
    ListItem: {
        padding:6
    }  
});

const ContentToCardUserDevices = (props) => {
    dayjs.extend(relativeTime);
    const {
        classes,
        createdat,
        nameofdevice,
        howmanyadventures,
        description
    } = props;

    return (
        <CardContent>
            <Grid container spacing={1} alignItems="center">
                
                <Grid item xs={3}>
                    <ListItem className={classes.ListItem}>
                        <ListItemAvatar >
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary="Mine Since:" 
                            secondary={dayjs(createdat).format('h:mm a, MMMM DD YYYY')} 
                        />
                    </ListItem>
                </Grid>
                
                <Grid item xs={6}>
                    <ListItem className={classes.ListItem}>
                        <ListItemAvatar >
                            <Avatar>
                                <WorkIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={`Why ${nameofdevice} is awesome?:`}
                            secondary={description}
                        />
                    </ListItem>
                </Grid>
                
                <Grid item xs={3}>
                    <ListItem className={classes.ListItem}>
                        <ListItemAvatar >
                            <Avatar>
                                <BeachAccessIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={`Available adventures for ${nameofdevice} device:`} 
                            secondary={howmanyadventures} 
                        />
                    </ListItem>
                </Grid>
            </Grid>
        </CardContent>
    )
}
export default withStyles(styles)(ContentToCardUserDevices);