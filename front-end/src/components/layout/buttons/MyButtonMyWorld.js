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

export default function MyButtonMyWorld() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {/* icon button */}
            <IconButton
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleClick}
            >
                <SentimentSatisfiedAltIcon/>
            </IconButton>
            {/* sub-menu */}
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/* sub-menu-items */}
                <StyledMenuItem component={Link} to="/myworld/devices">
                    <ListItemIcon>
                        <DevicesOtherIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Devices" />
                </StyledMenuItem>
                <StyledMenuItem component={Link} to="/myworld/adventures">
                    <ListItemIcon>
                        <GamesIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Adventures" />
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}