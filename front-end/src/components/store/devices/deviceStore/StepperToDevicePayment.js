import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// components
import AddressShippingFormToDevicePayment from './AddressShippingFormToDevicePayment';
import AddressBillingFormToDevicePayment from './AddressBillingFormToDevicePayment';
// import CreditCardFormToDevicePayment from './CreditCardFormToDevicePayment';
// import ResumeFormToDevicePayment from './ResumeFormToDevicePayment';
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
    return ['Shipping Address', 'Billing Address', 'Payment Method', 'Order Resumen', 'Success buy Device'];
}

// switch case for forms
function getStepContent(stepIndex) {
    
    switch (stepIndex) {
        case 0:
            return <AddressShippingFormToDevicePayment/>;
        case 1:
            return <AddressBillingFormToDevicePayment/>;    
        // case 2:
        //     return <CreditCardFormToDevicePayment/>;
        // case 3:
        //     return <ResumeFormToDevicePayment/>;
        // case 4:
        //     return <ResumeFormToDevicePayment/>;
        // case 5:
        //     return <SuccessToDevicePayment/>;
        default:
            return 'None';
    }
}

export default function StepperPayment() {

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
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                <div>
                    <Typography className={classes.instructions}>All steps completed</Typography>
                    <Button onClick={handleReset}>Reset</Button>
                </div>
                ) : (
                <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    {/* Buttons */}
                    <div>
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
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}