import React, { Component, useState } from 'react'
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
//import StaticDevicePropertyDetails from "./StaticDevicePropertyDetails"
// Redux stuff
import { connect } from 'react-redux';
// styles
import componentStyles from "assets/theme/views/admin/tables.js";
import SwitchToMarkFromModeOneToModeTwo from '../../components/modeTwo/SwitchToMarkFromModeOneToModeTwo';

// titles of columns (child)
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

// table content component (child)
const ContentRow = (props) => {

	// styles
	const classes = props.classes
	
	// vars to arrs
	let arrFinal = []
	let arrCells = []

	// promise
	const myPromise = new Promise((resolve, reject) => {
		// print
		console.log(`hi filter of selected ones: ${JSON.stringify(props.idofspecificstaticdevices)}`)
		// check if none static is selected
		if(props.idofspecificstaticdevices.length === 0){
			arrFinal.push({...props.data[0]})
		} else {
			// loop over selection
			props.idofspecificstaticdevices.map((id)=>{
				// filter
				props.data.filter((arrItem)=>{
					// checker
					if(arrItem.thingId === id.thingIdToSearch
							// && ids.length != 0
						){
							arrFinal.push({...arrItem})
						} 
				})	
			})
		}
		// print
		console.log(`arrFinal: ${JSON.stringify(arrFinal)}`)
		// promise resolve
		resolve(arrFinal)
	})

	// list of data for table
	myPromise
		.then((data)=>{
			// print
			console.log(`top5Tag data after filter: ${JSON.stringify(data)}`)
			// loop over top5Tags
			data.forEach((top5Tag) => {
				// push it on arr
				arrCells.push(
					<TableRow
						key={top5Tag.thingId}
					>	
						{/* company meters range color and inicials */}
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
								{/* <StaticDevicePropertyDetails
									top5tagid={top5Tag.top5TagId}
									thingid={top5Tag.thingId}
								/> */}
							</Box>
						</TableCell>
						
						{/* avatar */}
						<TableCell classes={{ root: classes.tableCellRoot }}>
							<Tooltip title="Ryan Tompson" placement="top">
								<Avatar
									classes={{ root: classes.avatarRoot }}
									alt="..."
									src={
										require("assets/img/theme/team-1-800x800.jpg").default
									}
								/>
							</Tooltip>
						</TableCell>

						{/* switcher marker */}
						<TableCell classes={{ root: classes.tableCellRoot }}>
							<SwitchToMarkFromModeOneToModeTwo
								thingid={top5Tag.thingId}
								docId={top5Tag.top5TagId}
							/>
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
			})
			// print
			console.log(`arrCells:${JSON.stringify(arrCells)}`)
		})
		.catch((err) => console.log('There was an error:' + err)) 
	
	// paint cells
	return(
		arrCells
	)		
}


// parent-main component
class ChartResultsSelectedItemsSearchingModeTwo extends Component {

	// filter in top5Tags the select ones statics
	// filterArrToTheListOfSelectOnes(arr,ids){
	// 	// print
	// 	console.log(`hi filter of selected ones: ${JSON.stringify(arr)} - ${JSON.stringify(ids)}`)
	// 	// vars
	// 	let arrFinal = []
	// 	let arrAll = arr
	// 	// loop
	// 	ids.map((id)=>{
	// 		// filter
	// 		arrAll.filter((arrItem)=>{
	// 			// checker
	// 			if (arrItem.thingId === id.thingId && ids.length != 0){
	// 				arrFinal.push({...arrItem})
	// 				return arrFinal
	// 			} else if (ids.length === 0){
	// 				return arrAll[0]
	// 			} 
	// 		})
	// 	})
	// 	// print
	// 	console.log({arrFinal})
	// }

	render() {
		// redux state
		const {
			classes,
			// ** top5Tags
			// top5Tag,
			// top5TagListener,
			loading,
			top5Tags,
			// top5TagsListener,
			// ** thing
			thingLiveDataSetsListener:{
				idOfSpecificStaticDevices
			},
		} = this.props

		return (
			<div>
				{/* Page content */}
				<Card classes={{ root: classes.cardRoot }}>
					{/* Header */}
					{/* title table header  */}
					<CardHeader
						className={classes.cardHeader}
						title={"Vendors selected: "} 
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
                                                'Sales Agent',
                                                'Seek',
												'Meters from you'
											]
										)
									}
								</TableRow>
							</TableHead>
							
							{/* table content */}
							<TableBody>
								{
									loading === false && 
										<ContentRow 
											data={
												// this.filterArrToTheListOfSelectOnes(
												// 	top5Tags,
												// 	idOfSpecificStaticDevices
												// )
												top5Tags
											} 
											idofspecificstaticdevices={idOfSpecificStaticDevices}
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
	//loading:state.userDevices1.loading,
	// loading:state.heartbeatThing1.loading,
	loading:state.top5Tags1.loading,
	// top5Tags
	top5Tags:state.top5Tags1.top5Tags,
	// top5TagsListener:state.top5Tags1.top5TagsListener,
	// top5Tag:state.top5Tags1.top5Tag,
    // top5TagListener:state.top5Tags1.top5TagListener,
	// liveDataSets
	// thingLiveDataSets:state.heartbeatThing1.thingLiveDataSets,
    thingLiveDataSetsListener:state.heartbeatThing1.thingLiveDataSetsListener
});

export default connect(mapStateToProps)(withStyles(componentStyles)(ChartResultsSelectedItemsSearchingModeTwo));



