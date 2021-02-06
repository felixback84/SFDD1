import React, { Component, Fragment } from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import StorefrontIcon from '@material-ui/icons/Storefront';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

// styles
import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
const useStyles = styles;


class MenuUnthenticatedUsers extends Component {
	render() {
		const {classes} = this.props
		return (
			<Fragment>
				<ListItem className={classes.listItem}>
						{/* welcome to sfdd */}
						<ListItem className={classes.listItem}>
							<CustomDropdown
								noLiPadding
								buttonText="Welcome to SFDD"
								buttonProps={{
									className: classes.navLink,
									color: "transparent"
								}}
								buttonIcon={VpnKeyIcon}
								dropdownList={[
									<Link to="/signup" className={classes.dropdownLink}>
										Signup
									</Link>,
									<Link to="/login" className={classes.dropdownLink}>
										Login
									</Link>
								]}
							/>
						</ListItem> 
						{/* devices */}
						<ListItem className={classes.listItem}>
							<Button
								round
								color="rose"
								className={classes.navLink}
							>
								<Link to="/store/devices" className={classes.link} style={{textDecoration: "none", color:"white"}}>
									<StorefrontIcon className={classes.icons} /> Devices
								</Link>
							</Button>
						</ListItem>
				</ListItem>
			</Fragment>
		)
	}
}

export default (withStyles(useStyles)(MenuUnthenticatedUsers));



