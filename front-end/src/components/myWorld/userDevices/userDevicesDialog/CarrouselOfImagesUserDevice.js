// react
import React from 'react';

// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = (theme) => ({
    root: {
        maxWidth: 7200,
        flexGrow: 1,
    },
    img: {
        
        display: 'block',
        maxWidth: 720,
        overflow: 'hidden',
        width: '100%',
    },
});

const CarrouselOfImagesUserDevice = (props) => {
    // img props
    const {imgurl, classes} = props;
    const theme = useTheme();

    // stepper
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = imgurl.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className={classes.root}>
            <img
                className={classes.img}
                src={imgurl[activeStep]}
            />
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                    Next
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    Back
                    </Button>
                }
            />
        </div>
    );
}

export default (withStyles(styles)(CarrouselOfImagesUserDevice));
