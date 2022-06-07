import React, { Fragment, useEffect } from 'react'
// @material-ui/core components
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
// core components
import CardStats from "../../../../components/Cards/CardStats.js";
import SearchingModeSwitcherOne from "./SearchingModeSwitcherOne"
// components
import SearchEngine from "../utils/SearchEngine/SearchEngine"
import ColorEngine from "../utils/ColorEngine/ColorEngine"
// Redux stuff
import { connect } from 'react-redux';

// cards
const SearchingModeCardModeOne = (props) => {
  	// styles
	const theme = useTheme();
	// color class
	const colorClass = new ColorEngine()
	// card markup 
	const modeCardMarkupOne = (data) => {
		return ( 
			<>
				<CardStats
					subtitle={props.title}
					title={ 
						data.top5Tags.length != 0 && props.searchingMode === "modeOne" ? 
						(
							//with array in reducer
							data.top5TagsListener.length != 0 && props.searchingMode === "modeOne" ?
								data.top5TagsListener[0].meters.toFixed(2):
								data.top5Tags[0].meters.toFixed(2)
						):(0)
					} 
					icon={data.icon}
					color={
						props.searchingMode === "modeOne" && colorClass.colorPicker(data.colorValue)
					} 
					footer={ 
						<Fragment> 
							<Box
								marginLeft=".5rem"
								marginBottom=".5rem"
								component="span">
								{/* switcher */}
								<SearchingModeSwitcherOne 
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
									data.top5Tags.length !== 0 && props.searchingMode === "modeOne" ? 
									(data.top5Tags[0].userCredentials.companyName):("")
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
								You match with {props.searchingMode === "modeOne" && data.top5Tags.length} bussines
							</Box>
							<Box
								component="div"
								fontSize=".875rem"
								marginRight=".5rem"
								display="flex"
								alignItems="center"
							>
								{/* search engine */}
								<SearchEngine searchingmode="modeOne"/>
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
		colorValue: props.thingLiveDataSetsListener.colorValue === undefined ?
			(props.thingLiveDataSets.colorValue):
			(props.thingLiveDataSetsListener.colorValue),
		// icon		
		icon:props.icon,
		// top5Tags
		top5TagsListener:props.top5TagsListener,
		top5Tags:props.top5Tags,
	}
	return(
		<Fragment>
			{modeCardMarkupOne(data)}
		</Fragment>
	)
} 

// connect to global state in redux
const mapStateToProps = (state) => ({
	// ui
	ui: state.ui,
	// liveDataSets
	thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
	thingLiveDataSetsListener: state.heartbeatThing1.thingLiveDataSetsListener,
	searchingMode:state.heartbeatThing1.thingLiveDataSetsListener.searchingMode,
	// top5Tags
	top5Tags: state.top5Tags1.top5Tags,
	top5TagsListener: state.top5Tags1.top5TagsListener,
});

export default connect(mapStateToProps)(SearchingModeCardModeOne);