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
import { userDeviceTop5TagsSyncDataStatic,userDeviceTop5TagsSyncData } from '../../../../redux/actions/userDevicesActions';
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
		modeType: "",
	});
 
	// handleChange switch
	const handleChange = (event) => {
		setMode({ 
			modeType:props.mode, 
			[event.target.name]: event.target.checked
		});
	};

	// effects
	useEffect(() => { 
		// 
		if(mode.modeType === "modeOne" && props.loading === false){
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
		// checker
		if(props.thingLiveDataSets.searchingMode[0] === "modeOne" && props.loading === false){
			// static data from top5Tags
			// props.userDeviceTop5TagsSyncDataStatic(props.thingid)
			// live data from top5Tags
			props.userDeviceTop5TagsSyncData(props.thingid)
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
	ui:state.ui,
	loading:state.userDevices1.loading,
	thingLiveDataSets:state.heartbeatThing1.thingLiveDataSets,
});

const mapActionsToProps = {
	heartbeatPostSearchingMode,
	userDeviceTop5TagsSyncDataStatic,	
	userDeviceTop5TagsSyncData,
};

export default connect(mapStateToProps,mapActionsToProps)(SearchingModeSwitcherOne);


