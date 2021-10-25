import React, { Fragment } from 'react'
// @material-ui/core components
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
// core components
import CardStats from "../../../../components/Cards/CardStats.js";
import SearchingModeSwitcherThree from "./SearchingModeSwitcherThree"
// components
import SearchEngine from "../utils/SearchEngine/SearchEngine"
import ColorEngine from "../utils/ColorEngine/ColorEngine"
// Redux stuff
import { connect } from 'react-redux';

// cards
const SearchingModeCardModeThree = (props) => {
  	// styles
	const theme = useTheme()
	// card markup
	const modeCardMarkupThree = (data) => {
		return (
			<>
				<CardStats
					subtitle={props.title}
					title="350,897" // number of items
					icon={props.icon}
					//color={color} // color from liveDataSets
					footer={
						<Fragment>
							<Box
								marginLeft=".5rem"
								marginBottom=".5rem"
								component="span">
								{/* switcher */}
								<SearchingModeSwitcherThree 
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
									data.top5Tags.length !== 0 ? 
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
								You match with {data.top5Tags.length} bussines
							</Box>
							<Box
								component="div"
								fontSize=".875rem"
								marginRight=".5rem"
								display="flex"
								alignItems="center"
							>
								{/* search engine */}
								<SearchEngine searchingmode="modeThree"/>
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
		<>
			{modeCardMarkupThree(data)}
		</>
	)
}

// connect to global state in redux
const mapStateToProps = (state) => ({
	// liveDataSets
	thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
	thingLiveDataSetsListener: state.heartbeatThing1.thingLiveDataSetsListener,
	// top5Tags
	top5Tags: state.top5Tags1.top5Tags,
	top5TagsListener: state.top5Tags1.top5TagsListener,
});

export default connect(mapStateToProps)(SearchingModeCardModeThree);