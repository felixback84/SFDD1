import React from 'react';
// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)'
    }
});

const ContentToDialogUserDevice = (props) => {
    
    dayjs.extend(relativeTime);
    
    const {
        classes, 
        createdat, 
        howmanyadventures, 
        description,  
        nameofdevice
    } = props;

    return(
        <DialogContent dividers>
            {/* Content*/}
            <Grid container spacing={1} direction="row"
                justify="center"
                alignItems="center"
            > 
            {/* Mine since */}
                <Grid item sm={4} className={classes.gridItems}>
                    <ListItem>
                        <ListItemAvatar>
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
                
                <Grid item sm={4} className={classes.gridItems}>
                    <ListItem>
                        <ListItemAvatar>
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
                
                <Grid item sm={4} className={classes.gridItems}>
                    <ListItem>
                        <ListItemAvatar>
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
            </Grid>
        </DialogContent>
    )
}

export default (withStyles(styles)(ContentToDialogUserDevice));