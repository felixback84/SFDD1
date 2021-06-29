import React, { Component } from 'react'
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Switch from '@material-ui/core/Switch';
import LinearProgress from "@material-ui/core/LinearProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/lab components
//import AvatarGroup from '@material-ui/lab/AvatarGroup';
// import Pagination from "@material-ui/lab/Pagination";
// comonents
import ColorMtsAvatar from "../../components/utils/ColorMtsAvatar"
import TagsMaker from "../../components/utils/TagsMaker"
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
				
				{/* ask for */}
				<TableCell classes={{ root: classes.tableCellRoot }}>
					<Box paddingTop=".35rem" paddingBottom=".35rem">
						<Box
							marginRight="10px"
							component="i"
							width=".375rem"
							height=".375rem"
							borderRadius="50%"
							display="inline-block"
							className={
								classes.verticalAlignMiddle + " " + classes.bgWarning
							}
						></Box>
						{`${top5Tag.userCredentials.lastname} ${top5Tag.userCredentials.names}`} 
					</Box>
				</TableCell>
				
				{/* avatar */}
				<TableCell classes={{ root: classes.tableCellRoot }}>
					{/* <AvatarGroup> */}
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
					{/* </AvatarGroup> */}
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
						// error here
						title={()=>{
							return(
								<>
									<TagsMaker data={profileToMatch}/>
								</>
							)
						}}
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
												'Ask for',
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
	top5Tags:state.userDevices1.top5Tags,
	top5TagsListener:state.userDevices1.top5TagsListener,
	// device
	thingLiveDataSets:state.heartbeatThing1.thingLiveDataSets,
});

export default connect(mapStateToProps)(withStyles(componentStyles)(ChartResultsSearchingModeOne));


