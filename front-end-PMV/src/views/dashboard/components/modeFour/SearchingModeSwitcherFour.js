import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch';
// Redux stuff
import store from '../../../../redux/store';
import { connect } from 'react-redux';
import { 
	heartbeatPostSearchingMode,
} from '../../../../redux/actions/heartbeatUIActions';
import {
	userDeviceTop5ProductsSyncDataStatic,
	userDeviceTop5ProductsSyncDataLiveDB
} from '../../../../redux/actions/top5ProductsActions';
// styles
//import SearchingModeCardStyles from "assets/theme/components/SearchingModeCard"
//const useStyles = makeStyles(SearchingModeCardStyles);

// switcher
const SearchingModeSwitcherFour = (props) => {
	// styles
	//const classes = useStyles()
	// hook state
	const [mode, setMode] = useState({
		checked: false,
		modeType: props.mode,
	})
	// handleChange switch
	const handleChange = (event) => {
		// state
		setMode({ 
			...mode,
			[event.target.name]: event.target.checked,
			modeType: mode.modeType, 
		})
		// thingId
		const thingId = props.thingid	
		
		// checker of switcher change
		if(
			event.target.checked === true 
			&& props.loading === false
			// mode.modeType != ""
		){	
			// obj to pass
			const dataSearchingMode = {
				objSearchingModeData:{
					searchingMode:[mode.modeType],
					thingId
				}
			}
			// post searching mode in db
			props.heartbeatPostSearchingMode(dataSearchingMode)
			// static data from top5Tags
			props.userDeviceTop5ProductsSyncDataStatic(thingId)	
			// live data from top5Tags
			props.userDeviceTop5ProductsSyncDataLiveDB(thingId)
		} 
	}

	return(
		<FormControlLabel
			control={
				<Switch
					name="checked"
					checked={mode.checked}
					onChange={handleChange}	
				/>
			}	
		/>
	)
}

// connect to global state in redux
const mapStateToProps = (state) => ({
	// userDevices
	loading:state.userDevices1.loading,
	// thing
	thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
})

// redux actions
const mapActionsToProps = {
	heartbeatPostSearchingMode,
	userDeviceTop5ProductsSyncDataStatic,
	userDeviceTop5ProductsSyncDataLiveDB
}

export default connect(mapStateToProps,mapActionsToProps)(SearchingModeSwitcherFour);


