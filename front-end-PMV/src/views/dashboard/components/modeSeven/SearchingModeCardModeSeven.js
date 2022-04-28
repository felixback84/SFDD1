import React, { Fragment, useEffect } from 'react'
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
  	// styles
	const theme = useTheme()
	// color class
	const colorClass = new ColorEngine()
	// card markup 
	const modeCardMarkupSeven = (data) => {
		return (
			<>
				<CardStats
					subtitle={props.title}
					title={
						data[0].meters.toFixed(2)
					} 
					// icon={data.icon}
					// color={
					// 	colorClass.colorPicker(data[0].meters)
					// } 
					footer={ 
						<Fragment>
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
									data[0].meters.toFixed(2)
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
								Thre is {data.length} bussines in the search range
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
						</Fragment>
					}
				/>
			</>
		)
	}
 
	// data to fill the box fields
	const data = () => {
		if(props.responses){
			return props.responses
		} else {
			return [{
				meters:0,
				coords:{
					lat: 0,
					hash: "",
					nameOfPoint: "",
					lon: 0
				},
				profileToSearch:{}
			}]
		}
	}
	return(
		<Fragment>
			{modeCardMarkupSeven(data())}
		</Fragment>
	)
} 

// connect to global state in redux
const mapStateToProps = (state) => ({
	responses: state.top5Tags1.responses
});

export default connect(mapStateToProps)(SearchingModeCardModeSeven)