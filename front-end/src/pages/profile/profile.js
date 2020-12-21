import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

//dayjs
import dayjs from 'dayjs';

// Components
import EditUserDetails from '../../components/user/EditUserDetails';
import ProfileSkeleton from '../../utilities/UserDeviceSkeleton';

// MUI stuff
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

// redux
import { connect } from 'react-redux';
import { logoutUser, uploadProfileImage } from '../../redux/actions/userActions';


// styles
const styles = (theme) => ({
    ...theme.notColor
});

class profile extends Component {

    // handle image
    handleImageChange = (event) => {
        const image = event.target.files[0];
        // send data to server
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadProfileImage(formData);
    };

    // edit profile pictur
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click(); 
    }

    //logout
    handleLogout = () => {
        this.props.logoutUser();
    }; 

    render() {
    
        // redux state
        const {
            classes,
            user: {
                credentials: { 
                    userHandle, 
                    createdAt, 
                    imgUrl, 
                    bio, 
                    location, 
                    email,
                    lastname,
                    names,
                    phone,
                    userId
                },
                loading,
                authenticated
            }
        } = this.props;

        // profile data logic
        let profileMarkup = !loading && authenticated ? (
            <Grid container>
                <Grid item sm />
                <Grid item xs={12} sm={9}>
                    <Paper className={classes.paper}>
                        <div className={classes.profile}>
                            <div className="image-wrapper">
                                <img src={imgUrl} alt="profile" className="profile-image" />
                                <input
                                    type="file"
                                    id="imageInput"
                                    hidden="hidden"
                                    onChange={this.handleImageChange}
                                /> 
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary" 
                                    btnClassName="button"
                                    disabled={loading}
                                    onClick={this.handleEditPicture}>
                                        Edit pic
                                        {loading && (
                                            <CircularProgress size={30} className={classes.progress} />
                                        )}
                                </Button>
                            </div>
                            <hr />
                            <div className="profile-details">
                                {/* userHandle */}
                                <span>@{userHandle}</span>
                                <hr />
                                {/* bio */}
                                {bio && <Typography variant="body2">{bio}</Typography>}
                                <hr />
                                {/* location */}
                                {
                                    location && (
                                        <Fragment>
                                            <Typography variant="body2">
                                            <LocationOn color="primary" />
                                                {location}
                                            </Typography>
                                            <hr />
                                        </Fragment>
                                    )
                                }
                                {/* names */}
                                {
                                    names && (
                                        <Fragment>
                                            <Typography variant="body2">
                                                {names} | {lastname}
                                            </Typography>
                                            <hr />
                                        </Fragment>
                                    )
                                }
                                {/* phone */}
                                {
                                    phone && (
                                        <Fragment>
                                            <Typography variant="body2">
                                                {phone}
                                            </Typography>
                                            <hr />
                                        </Fragment>
                                    )
                                }
                                <Fragment>
                                    <LinkIcon color="primary" />
                                    <a href={email} target="_blank" rel="noopener noreferrer">
                                        {email}
                                    </a>
                                    <hr />
                                </Fragment>
                                <Typography variant="body2">
                                    <CalendarToday color="primary" />{' '}
                                    Joined {dayjs(createdAt).format('MMM YYYY')}
                                </Typography>
                            </div>
                            {/* logout */}
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                className={classes.button}
                                disabled={loading}
                                onClick={this.handleLogout}>
                                    Logout
                                    {loading && (
                                        <CircularProgress size={30} className={classes.progress} />
                                    )}
                            </Button>
                            {/* edit details */}
                            <EditUserDetails/>  
                        </div>
                    </Paper>
                </Grid>
                <Grid item sm />   
            </Grid> 
        ) : (
            <ProfileSkeleton/>
        );
        // return  var
        return profileMarkup;
    }
}

// redux actions
const mapStateToProps = (state) => ({
    user: state.user
});

// redux actions
const mapActionsToProps = { logoutUser, uploadProfileImage };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(profile));
