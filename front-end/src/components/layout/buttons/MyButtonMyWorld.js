import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

// icons
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';

export default function MyButtonMyWorld() {
    
    return (
        <div>
            {/* icon button */}
            <IconButton
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
            >
                <SentimentSatisfiedAltIcon component={Link} to="/myworld/devices"/>
            </IconButton>
            
        </div>
    );
}