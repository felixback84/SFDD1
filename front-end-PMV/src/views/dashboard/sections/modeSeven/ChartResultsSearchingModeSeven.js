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
	data.forEach((staticDevice) => {
		arrayCells.push(
			<TableRow
				key={staticDevice.thingId}
				// style={
				// 	{
				// 		backgroundColor:color.colorPicker(staticDevice.matchQuality)
				// 	}
				// }
			>	
				
				{/* tags */}
				<TableCell classes={{ root: classes.tableCellRoot }}>
					<TagsMaker data={staticDevice.profileToSearch}/>
				</TableCell>
				
				{/* meters from you */}
				<TableCell classes={{ root: classes.tableCellRoot }}>
					<Box display="flex" alignItems="center">
						<Box component="span" marginRight=".5rem">
							{staticDevice.meters.toFixed(2)} Meters
						</Box>
						<Box width="100%">
							<LinearProgress
								variant="determinate"
								value={staticDevice.meters}
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

class ChartResultsSearchingModeSeven extends Component {
	
	render() {
		// redux state
		const {
			classes,
			responses,
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
												'Tags offer',
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
												responses.length != 0 ?
													responses:
													alert("don´t exist match for this criteria")
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
	// staticDevices
	responses:state.top5Tags1.responses,
	// liveDataSets
	thingLiveDataSets:state.heartbeatThing1.thingLiveDataSets,
});

export default connect(mapStateToProps)(withStyles(componentStyles)(ChartResultsSearchingModeSeven));


