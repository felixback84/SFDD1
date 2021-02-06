import React, { Component, Fragment } from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

// @material-ui/icons
import FaceIcon from '@material-ui/icons/Face';
import GamesIcon from '@material-ui/icons/Games';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

// styles
import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
const useStyles = styles;

class MenuUserDevices extends Component {
	render() {

		const {
			classes,
			imgurl,
			names,
			lastname
		} = this.props

		return (
			<Fragment>
				<ListItem className={classes.listItem} to="/myhome">
					{/* myHome */}
					<Button
						color="transparent"
						className={classes.navLink}
					>
						<Link to="/myhome" className={classes.link} style={{textDecoration: "none", color:"white"}}>
							<HomeIcon className={classes.icons} /> My Home
						</Link>
					</Button>
				</ListItem>
				<ListItem className={classes.listItem}>
				{/* userDevice */}
					<CustomDropdown
						noLiPadding
						buttonText="My Device"
						buttonProps={{
							className: classes.navLink,
							color: "transparent"
						}}
						buttonIcon={GamesIcon}
						dropdownList={[
							<Link to="/userdevice/userdevice" className={classes.dropdownLink}>
								My Device
							</Link>,
							<Link to="/userdevice/graphs" className={classes.dropdownLink}>
								My Graphs
							</Link>,
							<Link to="/userdevice/datasets" className={classes.dropdownLink}>
								My Data Sets
							</Link>,
						]}
					/>
				</ListItem>
				<ListItem className={classes.listItem}>
				{/* notifications */}
					<Button
						color="transparent"
						className={classes.navLink}
					>
						<NotificationsIcon className={classes.icons} />
						Notifications
					</Button>
				</ListItem>
				<ListItem className={classes.listItem}>
				{/* myProfile */}
					<CustomDropdown
						noLiPadding
						buttonText="My Profile"
						buttonProps={{
							className: classes.navLink,
							color: "transparent"
						}}
						buttonIcon={FaceIcon}
						dropdownList={[
							<Link to="/profile/profiledetails" className={classes.dropdownLink}>
								<Chip
									avatar={<Avatar alt={`${names} ${lastname}`} src={imgurl} />}
									label={`${names} ${lastname}`}
									clickable
									color="white"
									variant="outlined"
								/>
							</Link>,
							<Link to="/profile/addcart" className={classes.dropdownLink}>
								Add Cart
							</Link>,
							<Link to="profile/buys" className={classes.dropdownLink}>
								My Buys
							</Link>
						]}
					/>
				</ListItem>
			</Fragment>
		)
	}
}

export default (withStyles(useStyles)(MenuUserDevices));



