import React, { Fragment, useState, useEffect } from 'react'
// @material-ui/core components
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
// core components
import CardStats from "../../../../components/Cards/CardStats.js";
import SearchingModeSwitcherSeven from "./SearchingModeSwitcherSeven"
// components
import SearchEngine from "../utils/SearchEngine/SearchEngine"
import ColorEngine from "../utils/ColorEngine/ColorEngine"
// Redux stuff
import { connect } from 'react-redux';

// cards
const SearchingModeCardModeSeven = (props) => {

	// theme
	const theme = useTheme()
	// color class
	const colorClass = new ColorEngine()
	
	// card markup 
	const modeCardMarkupSeven = (data) => {
		console.log(`data from sett: ${JSON.stringify(data)}`)
		// try to get the right obj (closer distance) to fill box from the growing array
		return (
			<>
				<CardStats
					subtitle={props.title}
					title={ 
						(data.length != 0) ? 
							(data[0].meters.toFixed(2)):
							(0) 
						(props.searchingMode === "modeSeven" && props.top5Tags.length === 0) ?
							(data[0].meters.toFixed(2)):
							(props.top5Tags[0].meters.toFixed(2))
					} 
					color={
						props.searchingMode === "modeSeven" && colorClass.colorPicker(data.color)
					} 
					footer={  
						<>
							<Box
								marginLeft=".5rem"
								marginBottom=".5rem"
								component="span">
								{/* switcher */}
								<SearchingModeSwitcherSeven
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
									props.searchingMode === "modeSeven" && data[0].meters.toFixed(2)
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
								You are listed {props.searchingMode === "modeSeven" && data.length} differents bussines 
							</Box>
							<Box
								component="div"
								fontSize=".875rem"
								marginRight=".5rem"
								display="flex"
								alignItems="center"
							>
								{/* search engine */}
                                <SearchEngine 
                                    searchingmode="modeSeven" 
                                />
							</Box>
						</>
					}
				/>
			</>
		) 
	}

	// top5Tags markup
	const usedData = () => {
		// print
		console.log(`props.top5Tags in modeSeven card:${JSON.stringify(...props.top5Tags)}`)
		// data markup
		return modeCardMarkupSeven([
			// find the closer distance
			props.top5Tags.reduce((
					previousValue, 
					currentValue, 
					index, 
					array
				) => {
					return(currentValue.meters < previousValue.meters ? 
						currentValue : previousValue)
				}
			) 
		])
	}
	
	// to pass the right data to the card
	const pickerDataToCard = () => {
		// check to find the right data
		if(props.responsesWithData === undefined){
			// print
			console.log("data markup 1")
			// data markup
			return modeCardMarkupSeven([{
				meters:0,
				coords:{
					lat: 0,
					lon: 0,
					hash: "",
					nameOfPoint: "",
				},
			}])
		} 
		
		else if (props.responsesWithData != undefined){
			// print
			console.log("data markup 2")
			// data markup
			return modeCardMarkupSeven([	// if modeSeven
				// find the closer distance
				props.responsesWithData.reduce((
						previousValue, 
						currentValue, 
						// index, 
						// array
					) => {
						return(currentValue.meters < previousValue.meters ? 
							currentValue : previousValue)
					}
				) 
			])
		} 
		
		else {
			console.log("data markup empty")
			return []
		}
	}

	return(
		<>
			{
				props.top5Tags.length === 0 ? pickerDataToCard() : usedData()
			}	
		</>
	)
} 

// connect to global state in redux
const mapStateToProps = (state) => ({
	// liveDataSets
	searchingMode:state.heartbeatThing1.thingLiveDataSetsListener.searchingMode,
	// top5Tags
	loading: state.top5Tags1.loading,
	responsesWithData: state.top5Tags1.responsesWithData,
	top5Tags: state.top5Tags1.top5Tags
});

export default connect(mapStateToProps)(SearchingModeCardModeSeven)