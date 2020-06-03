import React, { Component } from 'react'

// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

// Redux stuff
import { connect } from 'react-redux';
//import { postDataCheckOutDevice } from '../../../../redux/actions/devicesActions';

// styles
const styles = (theme) => ({
    ...theme.notColor
});

class ResumeFormToDevicePayment extends Component {
    render() {
        const { 
            classes, 
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
            checkouts:{
                shippingAddress:{
                    street1,
                    street2,
                    city,
                    state,
                    phone
                },
                billingAddress:{
                    street1,
                    street2,
                    city,
                    state,
                    phone
                },
                cc:{
                    number,
                    expirationDate,
                    name
                }
            }
        } = this.props;

        return (
            <Grid container className={classes.form} spacing={1}>
                <Grid item xs={2} />
                <Grid item xs={8}>
                    <Paper elevation={2}> 
                        <Typography>Payment Information</Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableBody>
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
                <Grid item xs={2}/>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    device: state.devices1.device,
    checkouts: state.checkouts1.checkouts
})

const mapActionsToProps = {
    //postDataCheckOutDevice
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(ResumeFormToDevicePayment));