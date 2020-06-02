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
//import { setAddressShipping } from '../../../../redux/actions/checkotusActions';

// styles
const styles = (theme) => ({
    ...theme.notColor
});

class AddressShippingFormToDevicePayment extends Component {

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
    // handleClickConfirm = () => {
    //     const userAdressData = {
    //         street1: this.state.email,
    //         street2: this.state.street2,
    //         city: this.state.city,
    //         state: this.state.state,
    //         phone: this.state.phone
            
    //     };
    //     this.props.setAddressShipping(userAdressData, this.props.history);
        
    // };

    render() {
        const { classes, ui: { loading } } = this.props;

        return (
            <Grid container className={classes.form} spacing={1}>
                <Grid item xs={3} />
                <Grid item xs={6}>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Shipping Address 
                    </Typography>
                    <p>Where you want receive the pacakage?</p>
                    <form noValidate >
                        <TextField 
                            id="street1" 
                            name="street1" 
                            type="street1" 
                            label="street1" 
                            className={classes.textField} 
                            //helperText={errors.street1}
                            // error={errors.street1 ? true : false}
                            value={this.state.street1}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField> 
                        <TextField 
                            id="street2" 
                            name="street2" 
                            type="street2" 
                            label="street2" 
                            className={classes.textField} 
                            // helperText={errors.street2}
                            // error={errors.street2 ? true : false}
                            value={this.state.street2}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField> 
                        <TextField 
                            id="city" 
                            name="city" 
                            type="city" 
                            label="city" 
                            className={classes.textField} 
                            // helperText={errors.city}
                            // error={errors.city ? true : false}
                            value={this.state.city}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField> 
                        <TextField 
                            id="state" 
                            name="state" 
                            type="state" 
                            label="state" 
                            className={classes.textField} 
                            // helperText={errors.state}
                            // error={errors.state ? true : false}
                            value={this.state.state}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField> 
                        <TextField 
                            id="phone" 
                            name="phone" 
                            type="phone" 
                            label="phone" 
                            className={classes.textField} 
                            // helperText={errors.phone}
                            // error={errors.phone ? true : false}
                            value={this.state.phone}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField> 
                        {/* {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )} */}
                        <Button  
                            variant="contained" 
                            color="primary" 
                            //onClick={handleClickConfirm}
                            className={classes.button}
                            disabled={loading}>
                                Confirm
                                {loading && (
                                    <CircularProgress size={30} className={classes.progress} />
                                )}
                        </Button>
                        <br />                        
                    </form>
                </Grid> 
                <Grid item xs={3} />   
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    ui:state.ui

})

const mapActionsToProps = {
    //setAddressShipping
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(AddressShippingFormToDevicePayment));
