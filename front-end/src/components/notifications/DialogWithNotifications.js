import React, { Component, Fragment } from 'react'
// relative time
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// mui stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Badge from '@material-ui/core/Badge';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

// Components
import MyButton from '../../utilities/MyButton';
import TitleToDialogNotifications from './TitleToDialogNotifications';
// icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux stuff
import { connect } from 'react-redux';
import { markDevicesNotificationsRead } from '../../redux/actions/userActions';

// transition
const Transition = React.forwardRef(function Transition(props,ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// styles
const styles = () => ({
    expandButton: {
        position: 'absolute',
        left: '90%'
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

class DialogWithNotifications extends Component {
    // state
    state = {
        open: false 
    };

    // event open
    handleOpen = () => { 
        this.setState({ open: true });
        // redux actions
        let unreadNotificationsIds = this.props.notifications
            .filter((notification) => !notification.read)
            .map((notification) => notification.notificationId);
        this.props.markDevicesNotificationsRead(unreadNotificationsIds);
    }
    
    // to close the dialog
    handleClose = () => {
        this.setState({ open: false });
    } 
    render() {

        // redux state
        const {
            classes, 
            notifications
        } = this.props;

        // dayjs
        dayjs.extend(relativeTime);
        
        // logic to determine how will be the notification icon
        let notificationsIcon;
        // if actually exists something to notify
        if (notifications && notifications.length > 0) {
            // number of notifications unread
            notifications.filter((notification) => notification.read === false).length > 0
                ? (notificationsIcon = (
                        <Badge
                            badgeContent={
                                notifications.filter((notification) => notification.read === false).length
                            }
                            color="secondary"
                        >
                            
                            <NotificationsIcon onClick={this.handleOpen}/>
                            
                        </Badge>
                    )
                ) : (
                    notificationsIcon = <NotificationsIcon onClick={this.handleOpen}/>
                );
        } else {
            notificationsIcon = <NotificationsIcon onClick={this.handleOpen}/>;
        }

        // notification content logic
        let notificationsMarkup =
            notifications && notifications.length > 0 ? (
                notifications.map((notification) => {
                    const description = notification.description;
                    const time = dayjs(notification.createdAt).fromNow();
                    const iconColor = notification.read ? 'primary' : 'secondary';
                    const icon = notification.activeThing === "true" ? (
                            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
                        ) : (
                            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
                        );

                        return (
                            <CardContent key={notification.createdAt} className={classes.content}>
                                {icon}
                                <Typography
                                    color="default"
                                    variant="body1"
                                >
                                    {notification.nameOfDevice} - {description} in: {time}
                                </Typography>
                            </CardContent>
                        );
                })
            ) : (
                <CardContent>
                    You have no notifications yet
                </CardContent>
            );

        return (
            <Fragment>
                {/* Open/nots button */}
                {notificationsIcon}
                {/* Dialog box */}
                <Dialog 
                    fullScreen 
                    open={this.state.open} 
                    onClose={this.handleClose} 
                    fullWidth maxWidth="sm" 
                    TransitionComponent={Transition}
                    scroll="body"
                >    
                    <TitleToDialogNotifications
                        onClose={this.handleClose} 
                    />  
                    <Card className={classes.root}>
                        <div className={classes.details}>
                            {notificationsMarkup}
                        </div>
                    </Card>
                </Dialog>        
            </Fragment>  
        )
    }
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

const mapActionsToProps = {
    markDevicesNotificationsRead
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(DialogWithNotifications));










