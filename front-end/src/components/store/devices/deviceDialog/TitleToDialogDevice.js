import React from 'react';
// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

// icons
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
});

const TitleToDialogDevice = (props) => {
    dayjs.extend(relativeTime);
    const { classes, price, nameofdevice, agerate, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} >
            <Typography variant="body2" color="textSecondary" component="h1">
                {`Know more of: ${nameofdevice} device`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="h1">
                {`For ages from: ${agerate}`}
            </Typography>
            {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
            </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
};

export default (withStyles(styles)(TitleToDialogDevice));