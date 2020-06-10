import React, { Component } from 'react';

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

// ip Scan

// const ip = async () => {
//     const fetch = require('node-fetch');
//     const ipUrl = 'https://ipapi.co/json/';
//     const hi = fetch(ipUrl).then(response => response.json())
//         .then((ip) => {
//         console.log(ip.ip)
//         return ip.ip
//     })
// };

class CreditCardFormToDevicePayment extends Component {
    constructor(){
        super();
        this.state = {
            number: '',
            expirationDate: '',
            name: '',
            paymentMethod: '',
            securityCode: ''
        }
    }
    
    // event listener of fields in form
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    // event to save data
    handleClickConfirm = async () => {
        
        // cookie device
        document.cookie = "name=SFDD";
        // userAgent
        let userAgent = navigator.userAgent;
        // payu deviceSessionId
        let date = new Date();
        let milliSeconds = date.getMilliseconds();
        let deviceSessionId;
        //md5
        const md5 = require('md5');
        deviceSessionId = md5(`${document.cookie}-${milliSeconds}`);

        // ip client
        const fetch = require('node-fetch');
        let url = 'https://ipapi.co/json/';
        let response = await fetch(url);
        let ipRes = await response.json(); // read response body and parse as JSON

        // object yo send to the server
        const userCreditCardData = {
            number: this.state.number,
            expirationDate: this.state.expirationDate,
            securityCode: this.state.securityCode,
            name: this.state.name,
            paymentMethod: this.state.paymentMethod,
            deviceSessionId: deviceSessionId,
            cookie: document.cookie,
            userAgent: userAgent,
            ip: ipRes.ip
        };
        console.log('hi click CC')
        // redux action to set data
        this.props.setCreditCard(userCreditCardData);
    };

    render() {
        // redux state
        const { classes, ui: { loading } } = this.props;
        // cookie device
        document.cookie = "name=SFDD";
        // session id
        let deviceSessionId;
        let date = new Date();
        let milliSeconds = date.getMilliseconds();
        // md5
        const md5 = require('md5');
        deviceSessionId = md5(`${document.cookie}-${milliSeconds}`);

        return (
            <Grid container className={classes.form} spacing={1}>
                <Grid item xs={2} />
                <Grid item xs={8}>
                    {/* Script from payu */}
                    <script type="text/javascript" 
                        src={`https://maf.pagosonline.net/ws/fp/tags.js?id=${deviceSessionId}80200`}>
                    </script>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Credit Card Info 
                    </Typography>
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
                            id="securityCode" 
                            name="securityCode" 
                            type="securityCode" 
                            label="securityCode" 
                            className={classes.textField} 
                            // helperText={errors.securityCode}
                            // error={errors.securityCode ? true : false}
                            value={this.state.securityCode}
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
                        <TextField 
                            id="paymentMethod" 
                            name="paymentMethod" 
                            type="paymentMethod" 
                            label="paymentMethod" 
                            className={classes.textField} 
                            // helperText={errors.paymentMethod}
                            // error={errors.paymentMethod ? true : false}
                            value={this.state.paymentMethod}
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
                <Grid item xs={2} />   
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
