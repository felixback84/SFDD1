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
import { setCreditCard } from '../../../../redux/actions/checkoutsActions';

// styles
const styles = (theme) => ({
    ...theme.notColor
});

class CreditCardFormToDevicePayment extends Component {

    constructor(){
        super();
        this.state = {
            number: '',
            expirationDate: '',
            name: ''
        }
    }
    
    // event listener of fields in form
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // event to save data
    handleClickConfirm = (event) => {
        const userCreditCardData = {
            number: this.state.number,
            expirationDate: this.state.expirationDate,
            name: this.state.name,
        };
        console.log('hi click CC')
        // redux action to set data
        this.props.setCreditCard(userCreditCardData);
    };

    render() {
        const { classes, ui: { loading } } = this.props;

        return (
            <Grid container className={classes.form} spacing={1}>
                <Grid item xs={3} />
                <Grid item xs={6}>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Credit Card Info 
                    </Typography>
                    {/* <p>Where you want receive the pacakage?</p> */}
                    <form noValidate >
                        <TextField 
                            id="number" 
                            name="number" 
                            type="number" 
                            label="number" 
                            className={classes.textField} 
                            //helperText={errors.number}
                            // error={errors.number ? true : false}
                            value={this.state.number}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField> 
                        <TextField 
                            id="expirationDate" 
                            name="expirationDate" 
                            type="expirationDate" 
                            label="expirationDate" 
                            className={classes.textField} 
                            // helperText={errors.expirationDate}
                            // error={errors.expirationDate ? true : false}
                            value={this.state.expirationDate}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField> 
                        <TextField 
                            id="name" 
                            name="name" 
                            type="name" 
                            label="name" 
                            className={classes.textField} 
                            // helperText={errors.name}
                            // error={errors.name ? true : false}
                            value={this.state.name}
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
                            onClick={this.handleClickConfirm}
                            className={classes.button}
                            disabled={loading}>
                                Confirm
                                {loading && (
                                    <CircularProgress size={30} className={classes.progress} />
                                )}
                        </Button>
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
    setCreditCard
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(CreditCardFormToDevicePayment));
