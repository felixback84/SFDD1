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
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

// components
import DataSetsDialogToCharts from '../userDeviceDataSets/DataSetsDialogToCharts';
import SwitchForActiveCommandHildaUI from './SwitchForActiveCommandHildaUI';
import SliderForMotorHildaUI from './SliderForMotorHildaUI';
import ColorPickerForHildaUI from './ColorPickerForHildaUI';
import SaveDataSetToHilda from './SaveDataSetToHilda';

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
    },
    chip: {
        margin: theme.spacing(0.5),
    },
});

class CardForHildaUI extends Component {
    
    // state
    state={
        expanded: false
    }

    // redux action trigger
    componentWillMount(){
        this.props.getUserDevice(this.props.userdeviceid);
    }

    // to expand card
    handleExpandClick = () => {
        this.setState({expanded: true});
    };

    // to close card
    handleCollapseClick = () => {
        this.setState({expanded: false});
    };

    render() {
        // redux state
        const {
            classes,
            thingLiveDataSets:{
                active,
                createdAt,
                colorValue,
                motorSpeed
            },
            userDevice:{
                userDeviceId,
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
                    // DataSetsDialog to charts
                    action={<DataSetsDialogToCharts userdeviceid={userDeviceId}/>}
                    title={nameOfDevice}
                    subheader={`Your device thing is: ${thingId}`}
                />
                <CardMedia
                    className={classes.media}
                    image={coverUrl}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                    {/* active thing command */}
                    <Paper variant="outlined" square className={classes.paper}>
                        <Typography paragraph>{nameOfDevice} is:</Typography>
                        <Chip
                            label={active === "true" ? ("ON"):("OFF")}
                            className={classes.chip}
                        />
                        <SwitchForActiveCommandHildaUI 
                            thingid={thingId} 
                        />
                    </Paper> 
                    {/* colors thing command */}
                    <Paper variant="outlined" square className={classes.paper}>
                        <Typography paragraph>Pick the color for {nameOfDevice}, now is: </Typography>
                        <Chip
                            label={`${colorValue.r}, ${colorValue.g}, ${colorValue.b}`}
                            className={classes.chip}
                        />
                        <ColorPickerForHildaUI thingid={thingId}/>
                    </Paper> 
                    {/* motor thing command */}
                    <Paper variant="outlined" square className={classes.paper}>
                        <Typography paragraph>Pick the vibration speed of {nameOfDevice}, now is: </Typography>
                        <Chip
                            label={motorSpeed}
                            className={classes.chip}
                        />
                        <SliderForMotorHildaUI thingid={thingId}/>
                    </Paper> 
                    {/* button to save data */}
                    <Paper variant="outlined" square className={classes.paper}>
                        <SaveDataSetToHilda userdeviceid={userDeviceId}/>
                    </Paper> 
                </CardContent>
            </Card>
        )
    }
}

// redux state
const mapStateToProps = (state) => ({
    userDevice: state.userDevices1.userDevice,
    thingLiveDataSets: state.hildaThing1.thingLiveDataSets
})

export default connect(mapStateToProps,{getUserDevice})(withStyles(styles)(CardForHildaUI));
