import React from 'react'
// @material-ui/core components
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
// core components
import CardStats from "../../../../components/Cards/CardStats.js";
import SearchingModeSwitcherFour from "./SearchingModeSwitcherFour"
// Redux stuff
import { connect } from 'react-redux';

// cards
const SearchingModeCardModeFour = (props) => {
  // styles
	const theme = useTheme();
	// card markup
	const modeCardMarkupFour = (data) => {
		return (
			<>
				<CardStats
					subtitle={props.title}
					title="350,897" // number of items
					icon={props.icon}
					//color={color} // color from liveDataSets
					footer={
						<>
							{/* card footer */}
							<Box
								component="span"
								fontSize=".875rem"
								color={theme.palette.success.main}
								marginRight=".5rem"
								display="flex"
								alignItems="center"
							>
								{/* <Grid container>
									<Grid item xl={3} lg={6} xs={12}> */}
										{/* distances in meters to the next one item */}
										<Box
											width="1.5rem!important"
											height="1.5rem!important"
										>
											{"3.48 Mts"} 
										</Box> 
									{/* </Grid>
									<Grid item xl={3} lg={6} xs={12}> */}
										{/* switcher */}
										<Box component="span" whiteSpace="nowrap">
											<SearchingModeSwitcherFour
												mode={props.mode}
					        					idofspecificproduct={props.idofspecificproduct}
											/>
										</Box>
									{/* </Grid>
								</Grid> */}
							</Box>
							{/* data of the closer item */}
							<Box component="span" whiteSpace="nowrap">
								Since last month 
							</Box>
						</>
					}
				/>		
			</>
		)
	}

	// data
	const data = {
		color:props.thingLiveDataSets.colorValue,
		icon:props.icon,
		top5Product:props.top5Product,
		thingLiveDataSets:props.thingLiveDataSets
	}
	return(
		<>
			{modeCardMarkupFour(data)}
		</>
	)
}

// connect to global state in redux
const mapStateToProps = (state) => ({
	thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
	top5Product: state.userDevices1.top5Product,
});

export default connect(mapStateToProps)(SearchingModeCardModeFour);