import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// componets
import DialogWithNotifications from '../../../components/notifications/DialogWithNotifications'

const StyledMenu = withStyles( 
        {
            paper: {
                border: '1px solid #d3d4d5',
                background: 'linear-gradient(45deg, #FEB900 30%, #FD8E53 90%)'
            },
        }
    )((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function MyButtonNotifications() {
    
    return (
        <div>
            {/* icon button */}
            <IconButton
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
            >
                {/* dialog for notifications */}
                <DialogWithNotifications/>
            </IconButton>
        </div>
    );
}