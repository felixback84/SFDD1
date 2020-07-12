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
import Chip from '@material-ui/core/Chip';

// icons
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

// Redux stuff
import { connect } from 'react-redux';

// components
import MyButton from '../../../../utilities/MyButton';
import ProccessToDevicePayment from '../deviceStore/ProcessToDevicePayment';

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
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '0.5px rgba(0,0,0,0.1)',
        marginBottom: '20px'
    }
});

const ContentToDialogDevice = (props) => {
    
    dayjs.extend(relativeTime);
    
    const {
        classes,
        device: {
            badgeUrl,
            nameOfDevice,
            ageRate,
            createdAt,
            price,
            howManyAdventures,
            description,
            deviceId
        }
    }= props;

    return(
        <DialogContent dividers>
            {/* Content*/}
            <Grid container spacing={1} direction="row" justify='center' alignItems='center'> 
                {/* Mine since */}
                <Grid item sm={4} className={classes.gridItems}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <BeachAccessIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={`For ages from:`} 
                            secondary={ageRate} 
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
                            primary={`Device avalaible since:`}
                            secondary={dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        />
                    </ListItem>
                </Grid>
                
                <Grid item sm={4} className={classes.gridItems}>
                    <ListItem className={classes.ListItem}>
                        <ProccessToDevicePayment deviceid={deviceId}/>
                        <Chip
                            label={`${price} USD`}
                            color="primary"
                        />
                    </ListItem>
                </Grid>

                <hr className={classes.visibleSeparator}/>

                <Grid container spacing={1} direction="row" justify='center' alignItems='center'>
                    <Grid item sm={3} className={classes.gridItems}>
                        <img src={badgeUrl}/>
                    </Grid>
                    <Grid item sm={9} className={classes.gridItems}>
                        <ListItem>
                            <ListItemText 
                                primary={`Description: `}
                                secondary={description}
                            />
                        </ListItem>
                    </Grid>
                </Grid>
            </Grid>
        </DialogContent>
    )
}

const mapStateToProps = (state) => ({
    device: state.devices1.device
    
})

export default connect(mapStateToProps)(withStyles(styles)(ContentToDialogDevice));