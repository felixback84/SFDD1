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
} from '../../../../redux/actions/top5ProductsActions'
// styles
import searchingModeCardStyles from "assets/theme/views/admin/searchingModeCard"
const useStyles = makeStyles(searchingModeCardStyles);

// switcher
const SearchingModeSwitcherThree = (props) => {
	// styles
	const classes = useStyles()
	
	// hook state
	const [mode, setMode] = useState({
		checked: false,
		modeType: "",
	})

	// handleChange switch
	const handleChange = (event) => {
		setMode({ 
			modeType:props.mode,  
			[event.target.name]: event.target.checked
		});

		const thindId = props.thingId
		// trigger	
		//if(mode.checked === true){
			// static data from top5Tags
			props.userDeviceTop5ProductsSyncDataStatic(thindId)
			// live data from top5Tags
			props.userDeviceTop5ProductsSyncDataLiveDB(thindId)
		//}
	}
 
	// effects
	useEffect(() => {
		if(mode.modeType == "modeThree"){
			// obj to pass
			const dataSearchingMode = {
				objSearchingModeData:{
					searchingMode:[mode.modeType],
					thingId:props.thingId
				}
			}
			// redux action
			store.dispatch(heartbeatPostSearchingMode(dataSearchingMode))
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
	//thingId: state.userDevices1.userDevices[0].thingId,
	thingId:state.heartbeatThing1.thingLiveDataSets.thingId,
	thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
});

const mapActionsToProps = {
	heartbeatPostSearchingMode,
	userDeviceTop5ProductsSyncDataStatic,
	userDeviceTop5ProductsSyncDataLiveDB
};

export default connect(mapStateToProps,mapActionsToProps)(SearchingModeSwitcherThree);


