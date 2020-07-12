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
import Chip from '@material-ui/core/Chip';

// components
import ProccessToAdventurePayment from '../adventureStore/ProcessToAdventurePayment';


// Redux stuff
import { connect } from 'react-redux';

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

const ContentToDialogAdventure = (props) => {
    
    dayjs.extend(relativeTime);
    
    const {
        classes,
        adventure:{
            adventureId,
            createdAt,
            videoUrl, 
            device:{
                nameOfDevice,
                badgeUrl
            },
            duration,
            imgUrl,
            language,
            likesCount,
            price,
            tags,
            title
        }
        
    } = props;

    return(
        <DialogContent dividers>
            {/* Content*/}
            <Grid container spacing={1} direction="row" justify='center' alignItems='center'> 
            {/* Mine since */}
                <Grid item sm={3} className={classes.gridItems}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <BeachAccessIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={`Title of Adventure:`} 
                            secondary={title} 
                        />
                    </ListItem>
                </Grid>

                <Grid item sm={3} className={classes.gridItems}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary="Avalaible Since:" 
                            secondary={dayjs(createdAt).format('h:mm a, MMMM DD YYYY')} 
                        />
                    </ListItem>
                </Grid>

                <Grid item sm={3} className={classes.gridItems}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <BeachAccessIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={`For:`} 
                            secondary={nameOfDevice} 
                        />
                    </ListItem>
                </Grid>

                <Grid item sm={3} className={classes.gridItems}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary="Duration:" 
                            secondary={`${duration} min.`} 
                        />
                    </ListItem>
                </Grid>
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

            <hr className={classes.visibleSeparator}/>

            <Grid container spacing={1} direction="row" justify='center' alignItems='center'>
                <Grid item xs={9}>
                    <ListItemText>
                        Tags: {tags.map(tag => <Chip className={classes.chip} label={tag}/>)}
                    </ListItemText>
                </Grid>
                <Grid item sm={3} className={classes.gridItems}>
                    <ListItem className={classes.ListItem}>
                        <ProccessToAdventurePayment adventureid={adventureId}/>
                        <Chip
                            label={`${price} USD`}
                            color="primary"
                        />
                    </ListItem>
                </Grid>
            </Grid>

            <hr className={classes.visibleSeparator}/>


        </DialogContent>
    )
}

const mapStateToProps = (state) => ({
    adventure: state.adventures1.adventure
})

export default connect(mapStateToProps)(withStyles(styles)(ContentToDialogAdventure));