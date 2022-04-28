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
import { userDeviceTop5TagsSyncDataStatic,userDeviceTop5TagsSyncDataLiveDB } from '../../../../redux/actions/top5TagsActions';
// styles
import searchingModeCardStyles from "assets/theme/views/admin/searchingModeCard"
const useStyles = makeStyles(searchingModeCardStyles);

// switcher
const SearchingModeSwitcherOne = (props) => {
	// styles
	const classes = useStyles();

	// hook state
	const [mode, setMode] = useState({
		checked: false,
		modeType: "",
	});
 
	// handleChange switch
	const handleChange = (event) => {
		setMode({ 
			modeType:props.mode, 
			[event.target.name]: event.target.checked
		});
		// trigger	
		//if(mode.checked === true){
			// static data from top5Tags
			props.userDeviceTop5TagsSyncDataStatic(props.thingid)
			// live data from top5Tags
			props.userDeviceTop5TagsSyncDataLiveDB(props.thingid)
		//}
	};

	// effects
	useEffect(() => { 
		// 
		if(
			mode.modeType === "modeSeven" 
			&& props.loading === false
		){
			// obj to pass 
			const dataSearchingMode = {
				objSearchingModeData:{
					searchingMode:[mode.modeType],
					thingId:props.thingid
				}
			}
			// run static query data
			props.heartbeatPostSearchingMode(dataSearchingMode)
			
		}
	})
	
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
};

export default connect(mapStateToProps,mapActionsToProps)(SearchingModeSwitcherOne);


