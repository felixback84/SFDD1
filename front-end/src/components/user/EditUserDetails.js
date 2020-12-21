import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

// Components
import MyButton from '../../utilities/MyButton';

// Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
    ...theme.notColor,
    button: {
        float: 'right'
    }
});

class EditUserDetails extends Component {

    // state
    state = {
        bio: '',
        location: '',
        lastname: '',
        names: '',
        phone: '',
        open: false
    };

    // pass actual data from redux state
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            location: credentials.location ? credentials.location : '',
            lastname: credentials.lastname ? credentials.lastname : '',
            names: credentials.names ? credentials.names : '',
            phone: credentials.phone ? credentials.phone : ''
        });
    }

    // redux action trigger to extract actual data
    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials);
    }

    // to close
    handleClose = () => {
        this.setState({ open: false });
    }

    // redux action to extract actual data
    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }
    
    // take changes from inputs
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    // send data to backend
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            location: this.state.location,
            lastname: this.state.lastname,
            names: this.state.names,
            phone: this.state.phone
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                placeholder="A short bio about yourself"
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="location"
                                type="text"
                                label="Location"
                                placeholder="Where you live"
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="lastname"
                                type="text"
                                label="Lastname"
                                placeholder="Your lastname"
                                className={classes.textField}
                                value={this.state.lastname}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="name"
                                type="text"
                                label="Name"
                                placeholder="What is your name"
                                className={classes.textField}
                                value={this.state.names}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="phone"
                                type="text"
                                label="Phone"
                                placeholder="Which is your phone number"
                                className={classes.textField}
                                value={this.state.phone}
                                onChange={this.handleChange}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditUserDetails));

