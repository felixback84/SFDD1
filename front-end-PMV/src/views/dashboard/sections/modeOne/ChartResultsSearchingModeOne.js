import React, { Component } from 'react'
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import LinearProgress from "@material-ui/core/LinearProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
// comonents
import ColorMtsAvatar from "../../components/utils/ColorMtsAvatar"
import TagsMaker from "../../components/utils/TagsMaker"
import StaticDevicePropertyDetails from "./StaticDevicePropertyDetails"
// color engine
import ColorEngine from "../../components/utils/ColorEngine/ColorEngine"
// Redux stuff
import { connect } from 'react-redux';
// styles
import componentStyles from "assets/theme/views/admin/tables.js";

const arrToppersColumns = (classes,data) => {
	return data.map((item)=>{
		return(
			<TableCell
				key={item}
				classes={{
					root:
						classes.tableCellRoot + " " + classes.tableCellRootHead,
				}}
			>
				{item}
			</TableCell>
		)
	})
}

const ContentRow = (props) => {
	// color
	let color = new ColorEngine
	// data from father
	const data = props.data
	const classes = props.classes
	// arr to render results
	const arrayCells = []

	// loop over top5Tags
	data.forEach((top5Tag) => {
		arrayCells.push(
			<TableRow
				key={top5Tag.thingId}
				style={
					{
						backgroundColor:color.colorPicker(top5Tag.matchQuality)
					}
				}
			>	
				{/* comapany meters range and inicials */}
				<TableCell
					classes={{
						root:
							classes.tableCellRoot +
							" " +
							classes.tableCellRootBodyHead,
					}}
					component="th"
					variant="head"
					scope="row"
				>
					<Box alignItems="center" display="flex">
						<Box
							component={()=>{
								return(
									<ColorMtsAvatar 
										meters={top5Tag.meters} 
										companyname={top5Tag.userCredentials.companyName}
									/>
								)
							}}
							marginRight="1rem"
							alt="..."
							// src={require("assets/img/theme/bootstrap.jpg").default}
						/>
						<Box display="flex" alignItems="flex-start">
							<Box fontSize=".875rem" component="span">
								{top5Tag.userCredentials.companyName}
							</Box>
						</Box>
					</Box>
				</TableCell>
				
				{/* tags */}
				<TableCell classes={{ root: classes.tableCellRoot }}>
					<TagsMaker data={top5Tag.matchDataResults}/>
				</TableCell>
				
				{/* Vendor Details */}
				<TableCell classes={{ root: classes.tableCellRoot }}>
					<Box paddingTop=".35rem" paddingBottom=".35rem">
						<StaticDevicePropertyDetails
							top5tagid={top5Tag.top5TagId}
							thingid={top5Tag.thingId}
						/>
					</Box>
				</TableCell>
				
				{/* avatar */}
				<TableCell classes={{ root: classes.tableCellRoot }}>
					<Tooltip title="Ryan Tompson" placement="top">
						<Avatar
							classes={{ root: classes.avatarRoot }}
							alt="..."
							src={
								require("assets/img/theme/team-1-800x800.jpg")
									.default
							}
						/>
					</Tooltip>
				</TableCell>
				
				{/* meters from you */}
				<TableCell classes={{ root: classes.tableCellRoot }}>
					<Box display="flex" alignItems="center">
						<Box component="span" marginRight=".5rem">
							{top5Tag.meters.toFixed(2)} Meters
						</Box>
						<Box width="100%">
							<LinearProgress
								variant="determinate"
								value={top5Tag.meters}
								classes={{
									root: classes.linearProgressRoot,
									bar: classes.bgGradientError,
								}}
							/>
						</Box>
					</Box>
				</TableCell>
			</TableRow>
		)
	});
	return arrayCells
}

class ChartResultsSearchingModeOne extends Component {
	
	render() {
		// redux state
		const {
			classes,
			top5Tags,
			top5TagsListener,
			loading,
			thingLiveDataSets:{
				profileToMatch
			}
		} = this.props

		return (
			<div>
				{/* Page content */}
				<Card classes={{ root: classes.cardRoot }}>
					{/* Header */}
					{/* title table header  */}
					<CardHeader
						className={classes.cardHeader}
						title={"Results in this search: "} 
						titleTypographyProps={{
							component: Box,
							marginBottom: "0!important",
							variant: "h3",
						}}
					>
					</CardHeader>
					{/* tags user table header  */}
					<CardHeader
						className={classes.cardHeader}
						title={
							<TagsMaker data={profileToMatch}/>
						}
						titleTypographyProps={{
							component: Box,
							marginBottom: "0!important",
							variant: "h3",
						}}
					>
					</CardHeader>

					{/* table */}
					<TableContainer>
						<Box
							component={Table}
							alignItems="center"
							marginBottom="0!important"
						>
							{/* table head */}
							<TableHead>
								<TableRow>
									{	
										arrToppersColumns(
											classes,
											[
												'Company Name',
												'Tags offer',
												'View details',
												'Avatar',
												'Meters from you'
											]
										)
									}
								</TableRow>
							</TableHead>
							
							{/* table content */}
							<TableBody>
								{
									loading == false && 
										<ContentRow 
											data={
												top5TagsListener.length != 0 ?
													top5TagsListener:
													top5Tags
											} 
											classes={classes}
										/>
								}
							</TableBody>		
						</Box>	
					</TableContainer>
				</Card>
			</div>
		)
	}
}

// connect to global state in redux
const mapStateToProps = (state) => ({
	// userDevice
	loading:state.userDevices1.loading,
	// top5Tags
	top5Tags:state.top5Tags1.top5Tags,
	top5TagsListener:state.top5Tags1.top5TagsListener,
	// liveDataSets
	thingLiveDataSets:state.heartbeatThing1.thingLiveDataSets,
});

export default connect(mapStateToProps)(withStyles(componentStyles)(ChartResultsSearchingModeOne));


