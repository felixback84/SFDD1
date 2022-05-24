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
import ContentRowChartResultsSelectedItems from "../../components/modeSeven/ContentRowChartResultsSelectedItems"
import ContentRowChartResultsSelectedItemsLive from "../../components/modeSeven/ContentRowChartResultsSelectedItemsLive"
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
class ChartResultsSelectedItemsSearchingModeSeven extends Component {

	render() {
		// redux state
		const {
			classes,
			// ** top5Tags
			// top5Tag,
			top5TagListener,
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
												'Meters from you'
											]
										)
									}
								</TableRow> 
							</TableHead>
							
							{/* table content */}
							<TableBody>
								{
									top5Tags.length != 0 &&
										loading === false && top5TagListener.length === 0 ? 
												<>
													<ContentRowChartResultsSelectedItems 
														data={
															top5Tags
														} 
														classes={classes}
													/>
												</> 
											:
												<>
													<ContentRowChartResultsSelectedItemsLive
														lengthVendorsSelected={
															this.props.thingLiveDataSetsListener.idOfSpecificStaticDevices.length
														}
													/>
												</>
								}
								{/* {
									top5Tags.length != 0 &&
										loading === false  &&
											<>
												<ContentRowChartResultsSelectedItems 
													data={
														top5Tags
													} 
													classes={classes}
												/>
											</> 
											
								} */}
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
    top5TagListener:state.top5Tags1.top5TagListener,
	// liveDataSets
	// thingLiveDataSets:state.heartbeatThing1.thingLiveDataSets,
	thingLiveDataSetsListener:state.heartbeatThing1.thingLiveDataSetsListener
});

export default connect(mapStateToProps)(withStyles(componentStyles)(ChartResultsSelectedItemsSearchingModeSeven));



