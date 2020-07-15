import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Redux stuff
import { connect } from 'react-redux';

const styles = (theme) => ({
    ...theme.notColor,
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20
    }
});
 
class CommentsToDialogDevice extends Component {
    render() {
        const { device:{comments}, classes } = this.props;
        return (
            <Grid container >
                {comments.map((comment, index) => {
                    const { bodyComment, createdAt, userImage, userHandle } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container spacing={2}>
                                    {/* <Grid item xs={2}>
                                        <img
                                        src={userImage}
                                        alt="comment"
                                        className={classes.commentImage}
                                        />
                                    </Grid> */}
                                    <Grid item xs={12}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant="h5"
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color="primary"
                                            >
                                                {userHandle}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator} />
                                            <Typography variabnt="body1">{bodyComment}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )}
                        </Fragment>
                    );  
                })}
            </Grid>
        )
    }
}


const mapStateToProps = (state) => ({
    device: state.devices1.device
})

export default connect(mapStateToProps)(withStyles(styles)(CommentsToDialogDevice));
