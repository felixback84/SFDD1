import React from 'react';
// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
// icons
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = (theme) => ({
    ListItem: {
        padding:6 
    }  
});

const ContentToCardUserAdventure = (props) => {
    dayjs.extend(relativeTime);
    const {
        classes,
        createdat,
        nameofdevice,
        title,
        description,
        duration,
        language
    } = props;

    return (
        <CardContent>
            <Grid container spacing={1} direction="row" justify='center' alignItems='center'>
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
                {/* <Divider orientation="vertical" flexItem/> */}
                <Grid item xs={3}>
                    <ListItem className={classes.ListItem}>
                        <ListItemAvatar >
                            <Avatar>
                                <BeachAccessIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={`For device:`} 
                            secondary={nameofdevice} 
                        />
                    </ListItem>
                </Grid>
                {/* <Divider orientation="vertical" flexItem/> */}
                <Grid item xs={3}>
                    <ListItem className={classes.ListItem}>
                        <ListItemAvatar >
                            <Avatar>
                                <BeachAccessIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={`Read in:`} 
                            secondary={ language }
                        />
                    </ListItem>
                </Grid>
                {/* <Divider orientation="vertical" flexItem/> */}
                <Grid item xs={3}>
                    <ListItem className={classes.ListItem}>
                        <ListItemAvatar >
                            <Avatar>
                                <BeachAccessIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={`Duration of Adventure:`} 
                            secondary={duration} 
                        />
                    </ListItem>
                </Grid>
            </Grid>
            <hr className={classes.visibleSeparator}/>
            <Grid container spacing={1} direction="row" justify='center' alignItems='center'>
                <Grid item xs={12}>
                        <ListItem className={classes.ListItem}>
                            <ListItemAvatar >
                                <Avatar>
                                    <WorkIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                                primary={`Why ${title} is awesome?:`}
                                secondary={description}
                            />
                        </ListItem>
                    </Grid>
            </Grid>
        </CardContent>
    )
}
export default withStyles(styles)(ContentToCardUserAdventure);