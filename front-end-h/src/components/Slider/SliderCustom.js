import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

// styles
import sliderStyle from "assets/jss/material-kit-pro-react/components/sliderStyle.js";
const useStyles = makeStyles(sliderStyle);

// base values
const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 100,
    label: '100%',
  },
];

export default function SliderCustom(props) {
  // styles connec
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-always" gutterBottom>
        Battery life
      </Typography>
      <Slider
        defaultValue={props.batteryLifeValue}
        aria-labelledby="discrete-slider-always"
        step={1}
        marks={marks}
        valueLabelDisplay="on"
      />
    </div>
  );
}

 
