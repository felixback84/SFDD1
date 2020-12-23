import React from 'react';
import { Link } from 'react-router-dom';
// mui stuff
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
// icons
import FaceIcon from '@material-ui/icons/Face';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ReceiptIcon from '@material-ui/icons/Receipt';
// Redux stuff
import { connect } from 'react-redux';

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

function MyButtonProfile(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    // to open menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // to close menu
    const handleClose = () => {
        setAnchorEl(null);
    };
    // redux state
    const { 
            credentials:
                {
                    imgUrl, 
                    names, 
                    lastname
                }
        } = props;

    return (
        <div>
            {/* icon button */}
            <IconButton
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleClick}
            >
                <FaceIcon/>
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
                <StyledMenuItem component={Link} to="/profile">
                    <ListItemIcon >
                        <Chip
                            avatar={<Avatar alt={`${names} ${lastname}`} src={imgUrl} />}
                            label={`${names} ${lastname}`}
                            clickable
                            color="white"
                            variant="outlined"
                        />
                    </ListItemIcon>
                </StyledMenuItem>    
                <StyledMenuItem component={Link} to="/profile">
                    <ListItemIcon >
                        <AssignmentIndIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Edit Profile" />
                </StyledMenuItem>
                <StyledMenuItem component={Link} to="/addcart">
                    <ListItemIcon >
                        <CreditCardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Add card" />
                </StyledMenuItem>
                <StyledMenuItem component={Link} to="/buys">
                    <ListItemIcon >
                        <ReceiptIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="buys" />
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}

const mapStateToProps = state => ({
    credentials: state.user.credentials
    //user: state.user
})

export default connect(mapStateToProps)(MyButtonProfile);