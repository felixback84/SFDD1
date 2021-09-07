import React, { Component, useState } from 'react'
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// components
import ContentRowChartResultsSelectedItems from "../../components/modeTwo/ContentRowChartResultsSelectedItems"
// Redux stuff
import { connect } from 'react-redux';
// styles
import componentStyles from "assets/theme/views/admin/tables.js";


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
										<ContentRowChartResultsSelectedItems 
											data={
												top5Tags
											} 
											// idofspecificstaticdevices={idOfSpecificStaticDevices}
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



