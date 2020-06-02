import React, { Component, Fragment } from 'react';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { connect } from 'react-redux';
import { setAddressShippingData } from '../../../../redux/actions/checkotusActions';

// styles
const styles = (theme) => ({
    ...theme.notColor
});

class AddressFormToDevicePayment extends Component {

    constructor(){
        super();
        this.state = {
            street1: '',
            street2: '',
            city: '',
            state: '',
            phone: ''
        }
    }
    
    // event listener of fields in form
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // event to save data
    handleClickConfirm = () => {
        event.preventDefault();
        const userAdressData = {
            street1: this.state.email,
            street2: this.state.street2,
            city: this.state.city,
            state: this.state.state,
            phone: this.state.phone
            
        };
        this.props.setAddressShippingData(userAdressData, this.props.history);
        
    };

    render() {
        const { classes, ui: { loading } } = this.props;

        return (
            <Grid container className={classes.form}>
                <Grid item sm>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Address Shipping
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
                        {/* {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )} */}
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
                    </form>
                </Grid>    
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    ui:state.ui

})

const mapActionsToProps = {
    setAddressShippingData
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(AddressFormToDevicePayment));
