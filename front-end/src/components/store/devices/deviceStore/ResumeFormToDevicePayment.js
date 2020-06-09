import React, { Component } from 'react'

// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { connect } from 'react-redux';
import { postDataCheckOutDevice } from '../../../../redux/actions/checkoutsActions';

// styles
const styles = (theme) => ({
    ...theme.notColor
});

class ResumeFormToDevicePayment extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        
        const {
            device:{deviceId},
            paymentData:{
                shippingAddress,
                billingAddress,
                cc:{
                    name,
                    expirationDate,
                    number,
                    paymentMethod,
                    securityCode,
                    cookie,
                    userAgent,
                    deviceSessionId,
                    ip
                }
            }
        } = this.props;

        const userData = {
            paymentData:{
                shippingAddress,
                billingAddress,
                cc:{
                    name,
                    expirationDate,
                    number,
                    paymentMethod,
                    securityCode,
                    cookie,
                    userAgent,
                    deviceSessionId,
                    ip
                }
            }
        } 
        this.props.postDataCheckOutDevice(deviceId, userData);

        console.log(userData);
        console.log('hi from finish');
    }

    render() {
        const { 
            classes, 
            ui:{loading},
            user:{
                credentials:{
                    email,
                    names,
                    lastname,
                    userHandle
                }
            },
            device:{
                ageRate,
                coverUrl,
                description,
                nameOfDevice,
                price
            },
            paymentData:{
                shippingAddress,
                billingAddress,
                cc:{
                    name,
                    expirationDate,
                    number
                }
            }
        } = this.props;

        return (
            <form noValidate onSubmit={this.handleSubmit}>
                <Grid container className={classes.form} spacing={1}>
                    {/* User Info */}
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                    
                        <Paper elevation={2}> 
                            <Typography>User Info:</Typography>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableBody>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Email:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {email}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Names:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {names}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Lastname:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {lastname}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    <Grid item xs={1}/>

                    {/* Device Info */}
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <Paper elevation={2}> 
                            <Typography>Device Info:</Typography>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableBody>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Device:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {nameOfDevice}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                For ager from:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {ageRate}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Description:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {description}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Price:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {price}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    <Grid item xs={1}/>

                    {/* Payment Info */}
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <Paper elevation={2}> 
                            <Typography>Credit Card Info:</Typography>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableBody>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Number:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {number}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Expiration Date:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {expirationDate}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Name:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {name}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    <Grid item xs={1}/>

                    {/* Shipping Address Info */}
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <Paper elevation={2}> 
                            <Typography>Shipping Address Info:</Typography>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableBody>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Street1:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {shippingAddress.street1}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Street2:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {shippingAddress.street2}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                City:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {shippingAddress.city}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Deparment:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {shippingAddress.state}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Phone:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {shippingAddress.phone}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    <Grid item xs={1}/>

                    {/* Billing Address Info */}
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <Paper elevation={2}> 
                            <Typography>Billing Address Info:</Typography>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableBody>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Street1:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {billingAddress.street1}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Street2:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {billingAddress.street2}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                City:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {billingAddress.city}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Deparment:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {billingAddress.state}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                Phone:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {billingAddress.phone}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    <Grid item xs={1}/>
                    <Button  
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        disabled={loading}>
                            Confirm
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                    </Button>
                </Grid>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    device: state.devices1.device,
    paymentData: state.checkouts1.paymentData,
    ui:state.ui
})

const mapActionsToProps = {
    postDataCheckOutDevice
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(ResumeFormToDevicePayment));