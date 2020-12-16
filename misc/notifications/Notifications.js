import React, { Component } from 'react'
// relative time
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// mui stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Badge from '@material-ui/core/Badge';
// icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// components

// Redux stuff
import { connect } from 'react-redux';
import { markDevicesNotificationsRead } from '../../redux/actions/userActions';

// styles
const styles = (theme) => ({
    root: {
        display: 'flex',
        padding: 10
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

class Notifications extends Component {
    
    // mark as read the notifications
    componentDidMount(){
        // track the unread notifications
        let unreadNotificationsIds = this.props.notifications
            .filter((notification) => !notification.read)
            .map((notification) => notification.notificationId);
        // print
        console.log(`unreadNotificationsIds: ${unreadNotificationsIds}`);
        // redux action    
        this.props.markDevicesNotificationsRead(unreadNotificationsIds);
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
                            <NotificationsIcon />
                        </Badge>
                    )
                ) : (
                    notificationsIcon = <NotificationsIcon />
                );
        } else {
            notificationsIcon = <NotificationsIcon />;
        }

        // notification content logic
        let notificationsMarkup =
            notifications && notifications.length > 0 ? (
                notifications.map((notification) => {
                    const description = notification.description;
                    const time = dayjs(notification.createdAt).fromNow();
                    const iconColor = notification.read ? 'primary' : 'secondary';
                    const icon = notification.activeThing === true ? (
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
            <Card className={classes.root}>
                <div className={classes.details}>
                    {notificationsMarkup}
                    <div className={classes.controls}>

                    </div>
                </div>
                <CardMedia
                    className={classes.cover}
                    image={notificationsIcon}  
                />
            </Card>
        ) 
    }
}

// redux state
const mapStateToProps = state => ({
    notifications: state.user.notifications
})

// redux actions
const mapActionsToProps = {
    markDevicesNotificationsRead
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Notifications));
