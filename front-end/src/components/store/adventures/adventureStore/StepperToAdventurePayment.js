import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// components
import AddressShippingFormToAdventurePayment from './AddressShippingFormToAdventurePayment';
import AddressBillingFormToAdventurePayment from './AddressBillingFormToAdventurePayment';
import CreditCardFormToAdventurePayment from './CreditCardFormToAdventurePayment';
import ResumeFormToAdventurePayment from './ResumeFormToAdventurePayment';
// import SuccessToDevicePayment from './SuccessToDevicePayment';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {                                 
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

// titles steps
function getSteps() {
    return [
        'Shipping Address', 
        'Billing Address', 
        'Payment Method', 
        'Order Resumen', 
        'Adventure success buy'
    ];
}

// switch case for forms
function getStepContent(stepIndex, adventureid) {
    switch (stepIndex) {
        case 0:
            return (<AddressShippingFormToAdventurePayment/>);
        case 1:
            return (<AddressBillingFormToAdventurePayment/>);    
        case 2:
            return (<CreditCardFormToAdventurePayment/>);
        case 3:
            return (<ResumeFormToAdventurePayment adventureid={adventureid}/>);
        // case 4:
        //     return <SuccessToDevicePayment/>;
        default:
            return 'None';
    }
} 

export default function StepperToAdventurePayment(props) {

    const classes = useStyles();

    // stepper
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    // events
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        
        <Grid container className={classes.root}>
            {/* Steps icons */}
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <Grid>
                {activeStep === steps.length ? (
                <Grid>
                    <Typography className={classes.instructions}>All steps completed</Typography>
                    <Button onClick={handleReset}>Reset</Button>
                </Grid>
                ) : (
                <Grid>
                    {/* Content */}
                    {getStepContent(activeStep, props.adventureid)}
                    {/* Buttons */}
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                        >
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Grid>
                </Grid>
                )}
            </Grid>
        </Grid>
    );
}