import React from 'react';
// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// const styles = (theme) => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing(1),
//     },
// })

// dialog actions part
const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const ActionsToDialogUserAdventure = (props) => {
    return(
        <DialogActions>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
                <ShareIcon />
            </IconButton>
            <IconButton
            aria-label="show more"
            >
                <ExpandMoreIcon />
            </IconButton>
        </DialogActions>
    )
}

export default ActionsToDialogUserAdventure;