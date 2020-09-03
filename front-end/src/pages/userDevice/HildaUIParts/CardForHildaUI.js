// react
import React, { Component } from 'react';
// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
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
import SliderForMotorHildaUI from './SliderForMotorHildaUI';
import ColorPickerForHildaUI from './ColorPickerForHildaUI'

// redux stuff
import { connect } from 'react-redux';
import { getUserDevice } from '../../../redux/actions/userDevicesActions';

//styles
const styles = (theme) => ({
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
    paper: {
        padding: 10,
        margin: 10
    }
});

class CardForHildaUI extends Component {
    
    state={
        expanded: false
    }

    componentWillMount(){
        this.props.getUserDevice(this.props.userdeviceid);
    }

    handleExpandClick = () => {
        this.setState({expanded: true});
    };

    handleCollapseClick = () => {
        this.setState({expanded: false});
    };

    render() {
        // redux state
        const {
            classes,
            userDevice:{
                thingId,
                device:{
                    nameOfDevice,
                    description,
                    coverUrl
                }
            }
        } = this.props;

        return (
            <Card className={classes.root}>
                <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {nameOfDevice}
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
                        [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />  
                </IconButton>
            </CardActions>
            {/* open card */}
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {/* active thing command */}
                    <Paper variant="outlined" square className={classes.paper}>
                        {/* <Typography paragraph>Active: {nameOfDevice}</Typography> */}
                        <SwitchForActiveCommandHildaUI 
                            thingid={thingId} 
                        />
                    </Paper> 
                    {/* colors thing command */}
                    <Paper variant="outlined" square className={classes.paper}>
                        {/* <Typography paragraph>Pick the color for: {nameOfDevice}</Typography> */}
                        <ColorPickerForHildaUI thingid={thingId}/>
                    </Paper> 
                    {/* motor thing command */}
                    <Paper variant="outlined" square className={classes.paper}>
                        {/* <Typography paragraph>Vibration speed of: {nameOfDevice}</Typography> */}
                        <SliderForMotorHildaUI thingid={thingId}/>
                    </Paper>   
                    
                </CardContent>
            </Collapse>
        </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    userDevice: state.userDevices1.userDevice
    
})

export default connect(mapStateToProps,{getUserDevice})(withStyles(styles)(CardForHildaUI));
