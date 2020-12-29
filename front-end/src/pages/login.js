// react
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppIcon from '../img/download.png';
import { Link } from 'react-router-dom';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

// styles
const styles = (theme) => ({
    ...theme.notColor
});

// state
class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    // for print in UI the errors
    componentWillReceiveProps(nextProps){
        if(nextProps.ui.errors){
            this.setState({ errors: nextProps.ui.errors });
        }
    }

    // callback of submit
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history); 
    };

    // event listener of fields in form
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
 
    render() {
        const { classes, ui: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="logo" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField} 
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField> 
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField} 
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField> 
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                            disabled={loading}>
                                Login
                                {loading && (
                                    <CircularProgress size={30} className={classes.progress} />
                                )}
                        </Button>
                        <br />
                        <small>
                            dont have an account ? sign up <Link to="/signup">here</Link>
                        </small>
                        
                    </form>
                </Grid>    
                <Grid item sm />
            </Grid>
        )
    }
}

// check to right props are passing
// login.propTypes = {
//     classes: PropTypes.object.isRequired,
//     loginUser: PropTypes.func.isRequired,
//     user: PropTypes.object.isRequired,
//     ui: PropTypes.object.isRequired
// }  

// connect to global state in redux
const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

// connect to action in redux
const mapsActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapsActionsToProps)(withStyles(styles)(login));
