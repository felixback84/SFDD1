import React, { Component } from 'react'
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { red, green } from '@material-ui/core/colors';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// icons
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import BatteryStdRoundedIcon from '@material-ui/icons/BatteryStdRounded';
// components
import SwitchForActiveCommandHeartbeat from "../components/SwitchForActiveCommandHeartbeat"
// styles
import teamsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
const useStyles = teamsStyle;


class HeartbeatUIStatus extends Component {
	render() {

		const {
				classes,
				active,
				thingid, 
				connectionstatus,
				batterylife
		} = this.props;

		return (
			<div>
				<Card profile color="warning">
					<CardAvatar profile>
						{
							active == "true" ? ( 
								<PowerSettingsNewIcon 
									className={classes.icons} 
									style={
										{
										minWidth: "130px",
										minHeight: "130px",
										color: green[500]
										}
									}
								/>
							) : ( 
								<PowerSettingsNewIcon 
									className={classes.icons} 
									style={
											{
											minWidth: "130px",
											minHeight: "130px",
											color: red[500]
											}
									}
								/>
							)
						}
						</CardAvatar>
							<CardBody color>
								<Divider variant="fullWidth" />
								{/* switch active thing */}
								<h4 className={classes.cardCategorySocialWhite}>
									Active thing: 
									<span>
										<SwitchForActiveCommandHeartbeat  
											thingid={thingid}
										/>
									</span>
								</h4>
								<Divider variant="fullWidth" />
								<Grid container justify="space-between">
									{/* connection status */}
									<Card>
										<Grid container justify="space-between">
											{ connectionstatus == true ? (
													<Grid item xs={5}>
														<div className={classes.icon}> 
															<WifiIcon color="secondary" fontSize="large"/>
														</div>
														<h4 className={classes.cardCategorySocialWhite}>
															Connection status: Connected
														</h4>
													</Grid>
												) : (													
													<Grid item xs={5}>
														<div className={classes.icon}>
															<WifiOffIcon color="secondary" fontSize="large"/>
														</div>
														<h4 className={classes.cardCategorySocialWhite}>
															Connection status: Disconnected
														</h4>
													</Grid>
												)
											}
											<Divider orientation="vertical" flexItem />
											<Grid item xs={5}>
												<div className={classes.icon}>
													<BatteryStdRoundedIcon color="secondary" fontSize="large"/>
												</div>
												<h4 className={classes.cardCategorySocialWhite}>
													Battery life: {batterylife}%
												</h4>
											</Grid>
										</Grid>
									</Card>
								</Grid>
							</CardBody>    
						<CardFooter profile className={classes.justifyContent}/>
				</Card>
			</div>
		)
  }
}

export default (withStyles(useStyles)(HeartbeatUIStatus));