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

const ContentToDialogUserAdventure = (props) => {
    
    dayjs.extend(relativeTime);
    
    const {
        classes,
        userAdventure: { 
            adventure:{
                createdAt,
                active,
                title,
                description,
                imgUrl,
                tags,
                duration,
                laguage,
                device: {
                    badgeUrl,
                    nameOfDevice
                }
            }
        }
    }= props;

    return(
        <DialogContent dividers>
            {/* Images */}
            {/* <div className={classes.root} >
                <GridList cellHeight={500} className={classes.gridList} cols={1}>
                    {imgurl.map((imgurl, index) => {return <img src={imgurl} key={index} />})}
                </GridList>
            </div> */}
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

                <Grid item sm={6} className={classes.gridItems}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <WorkIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={`Why ${title} is an awesome adventure?:`}
                            secondary={description}
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
                            primary="Mine Since:" 
                            secondary={dayjs(createdAt).format('h:mm a, MMMM DD YYYY')} 
                        />
                    </ListItem>
                </Grid>
            </Grid>
        </DialogContent>
    )
}

const mapStateToProps = (state) => ({
    userAdventure: state.userAdventures1.userAdventure
    
})

export default connect(mapStateToProps)(withStyles(styles)(ContentToDialogUserAdventure));