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
	userDeviceSpecificTop5ProductSyncData,
} from '../../../../redux/actions/userDevicesActions';
// styles
import SearchingModeCardStyles from "assets/theme/components/SearchingModeCard"
const useStyles = makeStyles(SearchingModeCardStyles);

// switcher
const SearchingModeSwitcherFour = (props) => {
	// styles
	const classes = useStyles();
	// hook state
	const [mode, setMode] = useState("");
	// effects
	useEffect(() => {
		if(mode === "modeFour"){
			// obj to pass
			const dataSearchingMode = {
				objSearchingModeData:{
					searchingMode:[mode],
					thingId:props.thingId
				}
			}
			store.dispatch(heartbeatPostSearchingMode(dataSearchingMode));
		}
	})
	// redux action to extract data from db acoord with the search mode
	useEffect(()=>{
		if(mode === "modeFour"){
			props.userDeviceSpecificTop5ProductSyncData(
				props.thingId,
				props.thingLiveDataSets.idOfSpecificProduct
			)
		}
	})
	
	return(
		<FormControlLabel
			control={
				<Switch
					checked={props.thingLiveDataSets.onMode}
					onChange={() => setMode(props.mode)}
					value="checkedB"
					classes={{
						switchBase: classes.switchBase,
						checked: classes.switchChecked,
						thumb: classes.switchIcon,
						track: classes.switchBar
					}}
				/>
			}
			classes={{
				label: classes.label,
				root: classes.labelRoot
			}} 
			label="Toggle is off"
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
	userDeviceSpecificTop5ProductSyncData,
};

export default connect(mapStateToProps,mapActionsToProps)(SearchingModeSwitcherFour);


