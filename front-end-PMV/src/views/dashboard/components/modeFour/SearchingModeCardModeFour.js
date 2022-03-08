import React from 'react'
// @material-ui/core components
import { useTheme } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Grid from '@material-ui/core/Grid'
// modules
import ColorEngine from "../utils/ColorEngine/ColorEngine"
// core components
import CardStats from "../../../../components/Cards/CardStats.js"
import SearchingModeSwitcherFour from "./SearchingModeSwitcherFour"
// Redux stuff
import { connect } from 'react-redux'

// cards
const SearchingModeCardModeFour = (props) => {
  // styles
	const theme = useTheme()
	// color class
	const colorClass = new ColorEngine()
	// card markup
	const modeCardMarkupFour = (data) => {
		return (
			<>
				<CardStats
					subtitle={props.title}
					// distance to the closer
					title={
						data.top5Products.length != 0 ? 
						(
							//with array in reducer
							data.top5ProductsListener.length != 0 ?
								data.top5ProductsListener[0].meters.toFixed(2):
								data.top5Products[0].meters.toFixed(2)
						):(0)
					}
					//icon={props.icon}
					// color from liveDataSets
					color={
						colorClass.colorPicker(data.color)
					} 
					footer={
						<>
							<Box
								marginLeft=".5rem"
								marginBottom=".5rem"
								component="span">
								{/* switcher */}
								<SearchingModeSwitcherFour 
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
								The closer product to you is: {
									data.top5Products.length !== 0 ? 
									(data.top5Products[0].meters.toFixed(2)):("")
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
								You match with {data.top5Products.length} products
							</Box>
						</>
					}
				/>		
			</>
		)
	}

	// data
	const data = {
		icon:props.icon, 
		// liveDataSets
		color:props.thingLiveDataSets.colorValue,
		thingLiveDataSets:props.thingLiveDataSets,
		// top5Products
		top5Products:props.top5Products,
		top5ProductsListener:props.top5ProductsListener,
	}
	return(
		<>
			{modeCardMarkupFour(data)}
		</>
	)
}

// connect to global state in redux
const mapStateToProps = (state) => ({
	// liveDataSets
	thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
	thingLiveDataSetsListener: state.heartbeatThing1.thingLiveDataSetsListener,
	// top5Products
	top5Products: state.top5Products1.top5Products,
	top5ProductsListener: state.top5Products1.top5ProductsListener,
})

export default connect(mapStateToProps)(SearchingModeCardModeFour)