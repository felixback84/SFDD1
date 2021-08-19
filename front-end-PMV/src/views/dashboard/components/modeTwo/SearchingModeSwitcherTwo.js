import React, { useState, useEffect } from 'react';

// firebase client libs
import firebase from '../../../../fb/utilities/firebase'; 
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch';
// Redux stuff
import { connect } from 'react-redux';
import { heartbeatPostSearchingMode } from '../../../../redux/actions/heartbeatUIActions';
import { 
			userDeviceTop5TagsSyncDataStatic,
			userDeviceTop5TagsSyncDataLiveDB,
			userDeviceSpecificTop5TagSyncDataStatic,
			userDeviceSpecificTop5TagSyncDataLiveDB,
		} from '../../../../redux/actions/top5TagsActions';
// styles
import SearchingModeCardStyles from "assets/theme/components/SearchingModeCard"
const useStyles = makeStyles(SearchingModeCardStyles);

// switcher
const SearchingModeSwitcherOne = (props) => {
	// styles
	const classes = useStyles();

	// hook state
	const [mode, setMode] = useState({
		checked: false,
		modeType: props.mode,
	});

	// handleChange switch
	const handleChange = (event) => {
		// state
		setMode({ 
			...mode,
			[event.target.name]: event.target.checked,
			modeType: mode.modeType, 
		})
		
		// print
		console.log(`event.target.checked: ${event.target.checked}`)

		// var	
		const thingId = props.thingid

		// checker of switcher change
		if(
			event.target.checked === true 
			&& props.loading === false
			// mode.modeType != ""
		){	
			// print pass it
			console.log('setTimeout post check')
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
			props.userDeviceTop5TagsSyncDataStatic(thingId)	
			// live data from top5Tags
			props.userDeviceTop5TagsSyncDataLiveDB(thingId)
			
			// check if exists already vendors-statics-staticDevices selected to update the redux state
			// if(props.idofspecificstaticdevices.length != 0){
			// 	// print
			// 	console.log(`idofspecificstaticdevices:${JSON.stringify(props.idofspecificstaticdevices)}`)
			// 	// static data from top5Tag
			// 	props.userDeviceSpecificTop5TagSyncDataStatic(thingId,props.idofspecificstaticdevices)
			// 	// live data from top5Tag
			// 	props.userDeviceSpecificTop5TagSyncDataLiveDB(thingId,props.idofspecificstaticdevices)
			// }
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
	// ui
	ui:state.ui,
	// userDevices
	loading:state.userDevices1.loading,
	// liveDataSets
	thingLiveDataSets:state.heartbeatThing1.thingLiveDataSets,
});

const mapActionsToProps = {
	heartbeatPostSearchingMode,
	userDeviceTop5TagsSyncDataStatic,	
	userDeviceTop5TagsSyncDataLiveDB,
	userDeviceSpecificTop5TagSyncDataStatic,
	userDeviceSpecificTop5TagSyncDataLiveDB,
};

export default connect(mapStateToProps,mapActionsToProps)(SearchingModeSwitcherOne);


