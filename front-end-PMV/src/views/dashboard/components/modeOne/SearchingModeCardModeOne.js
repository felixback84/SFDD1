import React, { Fragment } from 'react'
// @material-ui/core components
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { green, yellow, red, pink, blue } from '@material-ui/core/colors';
// core components
import CardStats from "../../../../components/Cards/CardStats.js";
import SearchingModeSwitcherOne from "./SearchingModeSwitcherOne"
// components
import SearchEngine from "../utils/SearchEngine/SearchEngine"
// Redux stuff
import { connect } from 'react-redux';

// color picker backs
const colorPicker = (colorMix) => {

	// color obj to compare
	const colorsDB = {
		green:{r:76,g:175,b:80},
		yellow:{r:255,g:235,b:59},
		red:{r:244,g:67,b:54},
		pink:{r:233,g:30,b:99},
		blue:{r:33,g:150,b:243},
	}

	// colors backs
	const colors = {
		green: green[500],
		yellow: yellow[500],
		red: red[500],
		pink: pink[500],
		blue: blue[500]
	}

	// underscore
	let _ = require('underscore');
	
	// check
	if(_.isEqual(colorMix,colorsDB.green)){
		console.log("green")
		return colors.green
	} else if(_.isEqual(colorMix,colorsDB.yellow)){
		return colors.yellow
	} else if(_.isEqual(colorMix,colorsDB.red)){
		return colors.red
	} else if(_.isEqual(colorMix,colorsDB.pink)){
		return colors.pink
	} else if(_.isEqual(colorMix,colorsDB.blue)){
		return colors.blue
	} 
}

// cards
const SearchingModeCardModeOne = (props) => {
  	// styles
	const theme = useTheme();
	// card markup
	const modeCardMarkupOne = (data) => {
		return (
			<>
				<CardStats
					subtitle={props.title}
					title={
						data.top5Tags.length !== 0 ? 
						(data.top5Tags[0].meters.toFixed(2)):(0)
					} // number of items
					icon={data.icon}
					color={colorPicker(data.thingLiveDataSets.colorValue)} // color from liveDataSets
					footer={
						<Fragment>
							<Box
								marginLeft=".5rem"
								marginBottom=".5rem"
								component="span">
								{/* switcher */}
								<SearchingModeSwitcherOne mode={props.mode}/>
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
		color:props.thingLiveDataSets.colorValue,
		icon:props.icon,
		top5Tags:props.top5Tags,
		thingLiveDataSets:props.thingLiveDataSets
	}
	return(
		<Fragment>
			{modeCardMarkupOne(data)}
		</Fragment>
	)
}

// connect to global state in redux
const mapStateToProps = (state) => ({
	thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
	top5Tags: state.userDevices1.top5Tags,
});

export default connect(mapStateToProps)(SearchingModeCardModeOne);