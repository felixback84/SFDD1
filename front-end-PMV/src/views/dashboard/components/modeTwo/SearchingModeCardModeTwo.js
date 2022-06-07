import React, { Fragment, useEffect } from 'react'
// @material-ui/core components
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
// core components
import CardStats from "../../../../components/Cards/CardStats.js";
import SearchingModeSwitcherTwo from "./SearchingModeSwitcherTwo"
// components
// import SearchEngine from "../utils/SearchEngine/SearchEngine"
import ColorEngine from "../utils/ColorEngine/ColorEngine"
// Redux stuff
import { connect } from 'react-redux';

// cards
const SearchingModeCardModeTwo = (props) => {
  	// styles
	const theme = useTheme();
	// color class
	const colorClass = new ColorEngine()
	// card markup 
	const modeCardMarkupTwo = (data) => {
		return (
			<>
				<CardStats
					subtitle={props.title}
					title={
						data.top5Tag.length != 0 ? 
						(
							//with array in reducer
							data.top5TagListener.length != 0 && props.searchingMode === "modeTwo" ?
								data.top5TagListener[0].meters.toFixed(2):
								data.top5Tag[0].meters.toFixed(2)
						):(0)
					} 
					icon={data.icon}
					color={
						props.searchingMode === "modeTwo" && colorClass.colorPicker(data.colorValue)
					} 
					footer={
						<Fragment>
							{/* switcher */}
							<Box
								marginLeft=".5rem"
								marginBottom=".5rem"
								component="span">
								<SearchingModeSwitcherTwo
									mode={props.mode} 
									thingid={props.thingid}
								/>
							</Box>
							{/* bussines item closer */}
							<Box
								component="span"
								fontSize=".875rem"
								marginRight=".5rem"
								display="flex"
								alignItems="center"
							>
								The closer bussines to you is: {
									data.top5Tag.length !== 0 && props.searchingMode === "modeTwo"? 
									(data.top5Tag[0].userCredentials.companyName):("")
								}
							</Box>
							{/* # of bussines searching */}
							<Box
								component="span"
								fontSize=".875rem"
								marginRight=".5rem"
								display="flex"
								alignItems="center"
							>
								{/* number of items */}
								You match with {props.searchingMode === "modeTwo" && data.top5Tag.length} bussines
							</Box>
						</Fragment>
					}
				/>
			</>
		)
	}
 
	// data
	const data = {
		// device
		thingLiveDataSets:props.thingLiveDataSets,
		thingLiveDataSetsListener:props.thingLiveDataSetsListener,
		colorValue:props.thingLiveDataSetsListener.colorValue === undefined ?
			(props.thingLiveDataSets.colorValue):
			(props.thingLiveDataSetsListener.colorValue),
		// icon		
		icon:props.icon,
		// top5Tags
		top5Tag:props.top5Tag,
		top5TagListener:props.top5TagListener,
	}
	return(
		<Fragment>
			{modeCardMarkupTwo(data)}
		</Fragment>
	)
} 

// connect to global state in redux
const mapStateToProps = (state) => ({
	// liveDataSets
	thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
	thingLiveDataSetsListener: state.heartbeatThing1.thingLiveDataSetsListener,
	searchingMode:state.heartbeatThing1.thingLiveDataSetsListener.searchingMode,
	// top5Tags
	top5Tag: state.top5Tags1.top5Tag,
	top5TagListener: state.top5Tags1.top5TagListener,
	//top5TagArr: state.top5Tags.top5TagArr
});

export default connect(mapStateToProps)(SearchingModeCardModeTwo);