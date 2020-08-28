// react
import React from 'react';

// mui stuff
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
// components
import SwitchForActiveCommandHildaUI from './SwitchForActiveCommandHildaUI';

// redux stuff
import { connect } from 'react-redux';
import { getUserDevice } from '../../redux/actions/userDevicesActions';

// styles
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

// functional component
function CardForHildaUI(props) {
    // use styles
    const classes = useStyles();
    // hook state
    const [expanded, setExpanded] = React.useState(false);
    // handle click to expand 
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    // trigger redux action
    dispatch.getUserDevice(props.userdeviceid);
    // redux state
    const {
        userDevice:{
            thingId,
            device:{
                nameOfDevice,
                description,
                coverUrl
            }
        }
    } = props;

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {nameOfDevice.charAt(0)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={nameOfDevice}
                subheader={`Your device property is: ${thingId}`}
            />
            <CardMedia
                className={classes.media}
                image={coverUrl}
                title={nameOfDevice}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing >
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />  
                </IconButton>
            </CardActions>
            {/* open card */}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {/* active thing command */}
                    <Paper variant="outlined" square >
                        <Typography paragraph>On/Off: {nameOfDevice}</Typography>
                        <SwitchForActiveCommandHildaUI 
                            thingid={thingId} 
                            labelToSwitch="Active device"
                        />
                    </Paper>    
                </CardContent>
            </Collapse>
        </Card>
    );
}

// redux state
const mapStateToProps = (state) => ({
    userDevice: state.userDevices1.userDevice  
})

export default connect(mapStateToProps,{getUserDevice})(CardForHildaUI);