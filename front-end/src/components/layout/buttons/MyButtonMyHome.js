import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// icons
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import GamesIcon from '@material-ui/icons/Games';

    
export default function MyButtonMyHome() {
    

    return (
        <div>
            {/* icon button */}
            <IconButton
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                
            >
                <GamesIcon component={Link} to="/myHome"/>
            </IconButton>
            
        </div>
    );
}
