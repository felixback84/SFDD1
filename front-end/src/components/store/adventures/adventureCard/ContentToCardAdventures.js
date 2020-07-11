import React from 'react';
// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

// icons
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

// components
import AdventureDialog from '../adventureDialog/AdventureDialog';
//import ProcessToAdventurePayment from '../adventureStore/ProcessToAdventurePayment';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = (theme) => ({
    ListItem: {
        padding:3 
    },
    buyButton: {
        position: 'relative'
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: '10px'
    },
    gridItems:{
        textAlign: 'center'
    } 
});

const ContentToCardAdventures = (props) => {
    dayjs.extend(relativeTime);

    const {
        classes,
        title,
        createdat,
        adventureid,
        description,
        nameofdevice,
        tags,
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
                            primary="Available since:" 
                            secondary={dayjs(createdat).format('h:mm a, MMMM DD YYYY')} 
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
                            primary={`For device:`} 
                            secondary={nameofdevice} 
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
                            primary={`Read in:`} 
                            secondary={ language }
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
                            primary={`Duration of Adventure:`} 
                            secondary={duration} 
                        />
                    </ListItem>
                </Grid>
            </Grid>
            <hr className={classes.visibleSeparator}/>
            <Grid container spacing={1} direction="row" justify='center' alignItems='center'>
                <Grid item xs={12}>
                    <ListItemText>
                        Tags: {tags.map(tag => <Chip className={classes.chip} label={tag}/>)}
                    </ListItemText>
                </Grid>
            </Grid>
            <hr className={classes.visibleSeparator}/>
            <Grid container spacing={1} direction="row" justify='center' alignItems='center'>
                <Grid item xs={10}>
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
                
                {/* Modals for store and details */}
                
                <Divider orientation="vertical" flexItem/>
                
                <Grid >
                    <Grid item xs={6}>
                        <ListItem className={classes.ListItem}>
                            {/* <ProcessToAdventurePayment 
                                deviceid={deviceid} 
                                nameofdevice={nameofdevice}
                                agerate={agerate}
                                price={price}
                            /> */}
                        </ListItem>
                    </Grid>
                    
                    <Grid item xs={6}>
                        <ListItem className={classes.ListItem}>
                            <AdventureDialog 
                                adventureid={adventureid} 
                                title={title}
                            /> 
                        </ListItem>
                    </Grid>
                </Grid>

            </Grid>
        </CardContent>
    )
}
export default withStyles(styles)(ContentToCardAdventures);