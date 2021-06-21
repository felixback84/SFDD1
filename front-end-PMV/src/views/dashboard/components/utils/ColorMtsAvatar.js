import React from 'react'
// mui
import { makeStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import { green, yellow, red, pink, blue } from '@material-ui/core/colors';
// class colorAndMeters
import ColorAndMeters from "./ColorEngine/ColorEngine"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

export default function ColorMtsAvatar(props) {
    // styles
    const classes = useStyles();
    // short name
    const companyNameBadge = props.companyname
    let companyNameShort = companyNameBadge.substring(0, 2);
    console.log(`short name: ${companyNameShort}`)
    // instance
    const inst = new ColorAndMeters
    const colorMuiMix = inst.colorMuiMix(props.meters)

    return (
        <>
            <Avatar
                style={{backgroundColor:colorMuiMix}}
                //classes={classes.large}
            >  
                {companyNameShort}
            </Avatar>    
        </>
    )
}
