// react
import React, { Component } from 'react';

// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import { useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

// Redux stuff
import { connect } from 'react-redux';

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

const CarrouselOfImagesAdventure = (props) => {
    // img props
    const {adventure:{imgUrl}, classes} = props;
    const theme = useTheme();

    // stepper
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = imgUrl.length;

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
                src={imgUrl[activeStep]}
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

const mapStateToProps = (state) => ({
    adventure: state.adventures1.adventure
})

export default connect(mapStateToProps)(withStyles(styles)(CarrouselOfImagesAdventure));


