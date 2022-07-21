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
import TagsMakerForProducts from "../../components/utils/TagsMakerForProducts"
//import StaticDevicePropertyDetails from "./StaticDevicePropertyDetails"
// Redux stuff
import { connect } from 'react-redux';
// styles
import componentStyles from "assets/theme/views/admin/tables.js";
import SwitchToMarkTop5ProductsTempsResultsModeEight from '../../components/modeEight/SwitchToMarkTop5ProductsTempsResultsModeEight';

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

// content table results
const ContentRow = (props) => {

	// data from father
	const data = props.data
	const classes = props.classes
	// arr to render results
    const arrayCells = []
    
	// loop over top5Tags
	data.forEach((top5Product) => {
		arrayCells.push(
			<TableRow
				key={top5Product.thingId}
			>	
				{/* comapany meters range color and inicials */}
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
										meters={top5Product.meters} 
										companyname={top5Product.companyData.companyName}
									/>
								)
							}}
							marginRight="1rem"
							alt="..."
							// src={require("assets/img/theme/bootstrap.jpg").default}
						/>
						<Box display="flex" alignItems="flex-start">
							<Box fontSize=".875rem" component="span">
								{top5Product.companyData.companyName}
							</Box>
						</Box>
					</Box>
				</TableCell>
				
				{/* tags */}
				<TableCell classes={{ root: classes.tableCellRoot }}>
					<TagsMaker data={top5Product.product.categories}/>
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
								require("assets/img/theme/team-1-800x800.jpg")
									.default
							}
						/>
					</Tooltip>
				</TableCell>

                {/* switcher marker */}
                <TableCell classes={{ root: classes.tableCellRoot }}>
                    {/* switcher selector of prducts */}
                    <SwitchToMarkTop5ProductsTempsResultsModeEight
                        thingid={top5Product.thingId}
                        docId={top5Product.product.productId}
						dataIdProducts={top5Product}
                    />
				</TableCell>

				{/* meters from you */}
				<TableCell classes={{ root: classes.tableCellRoot }}>
					<Box display="flex" alignItems="center">
						<Box component="span" marginRight=".5rem">
							{top5Product.meters.toFixed(2)} Meters
						</Box>
						<Box width="100%">
							<LinearProgress
								variant="determinate"
								value={top5Product.meters}
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
	return arrayCells 
}

class ProductsResultsSearchingModeEight extends Component {

	render() {
		// redux state
		const {
			classes,
			// top5Products,
			responsesWithData,
			loading,
			thingLiveDataSets:{
				profileToMatch,
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
							<TagsMakerForProducts data={responsesWithData}/>
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
									loading == false && 
										<ContentRow 
											data={
												responsesWithData
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
	// top5Products
	responsesWithData:state.top5Products1.responsesWithData,
	// top5Products:state.top5Products1.top5Products,
    // top5ProductsListener:state.top5Products1.top5ProductsListener,
	// liveDataSets
	thingLiveDataSets:state.heartbeatThing1.thingLiveDataSets,
});

export default connect(mapStateToProps)(withStyles(componentStyles)(ProductsResultsSearchingModeEight));


