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
	userDeviceTop5TagsSyncData,
} from '../../../../redux/actions/userDevicesActions';
// styles
import SearchingModeCardStyles from "assets/theme/components/SearchingModeCard"
const useStyles = makeStyles(SearchingModeCardStyles);

// switcher
const SearchingModeSwitcherOne = (props) => {
	// styles
	// const classes = useStyles();

	// hook state
	const [mode, setMode] = useState({
		checkedA: false,
		modeType: "",
	});

	// handleChange switch
	const handleChange = (event) => {
		setMode({ modeType:props.mode, [event.target.name]: event.target.checked });
	};

	// effects
	useEffect(() => {
		if(mode.modeType === "modeOne"){
			// obj to pass 
			const dataSearchingMode = {
				objSearchingModeData:{
					searchingMode:[mode.modeType],
					thingId:props.thingId
				}
			}
			store.dispatch(heartbeatPostSearchingMode(dataSearchingMode));
		}
	})
	// redux action to extract data from db acoord with the search mode
	useEffect(()=>{
		if(mode.modeType === "modeOne"){
			props.userDeviceTop5TagsSyncData(props.thingId)
		}
	})
	
	return(
		<FormControlLabel
			control={
				<Switch
					name="checkedA"
					checked={mode.checkedA}
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
	userDeviceTop5TagsSyncData,
};

export default connect(mapStateToProps,mapActionsToProps)(SearchingModeSwitcherOne);


