import React from 'react';
// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';

// icons
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// components
import FavButtonDevice from '../FavButtonDevice';

// Redux stuff
import { connect } from 'react-redux';

// dialog actions part
const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const ActionsToDialogAdventure = (props) => {
    const {
        adventureid,
        adventure:{
        likesCount,
        commentsCount
    }} = props;

    return(
        <DialogActions>
            <FavButtonDevice adventureid={adventureid} />
            <span>{likesCount} likes</span>
            <IconButton aria-label="share">
                <ShareIcon />
            </IconButton>
            <span>{commentsCount} comments</span>
        </DialogActions>
    )
}

const mapStateToProps = (state) => ({

    adventure: state.adventures1.adventure
})

export default connect(mapStateToProps)(ActionsToDialogAdventure);

