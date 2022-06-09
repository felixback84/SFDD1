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
	setTop5TagsCollectionWithMatchBetweenStaticsAndDynamics
} from '../../../../redux/actions/top5TagsActions';
// styles
import searchingModeCardStyles from "assets/theme/views/admin/searchingModeCard"
const useStyles = makeStyles(searchingModeCardStyles);

// switcher
const SearchingModeSwitcherOne = (props) => {
	// styles
	const classes = useStyles()

	// hook state
	const [mode, setMode] = useState({
		checked: false,
		modeType: props.mode,
	})
 
	// handleChange switch
	const handleChange = async (event) => {
		// state
		setMode({ 
			...mode,
			[event.target.name]: event.target.checked,
			modeType: mode.modeType, 
		})

		// set searching mode
		if(
			event.target.checked === true 
			&& props.loading === false
		){
			// obj to pass 
			const dataSearchingMode = {
				objSearchingModeData:{
					searchingMode:[mode.modeType],
					thingId:props.thingid
				}
			}
			props.heartbeatPostSearchingMode(dataSearchingMode)
			// post searchingMode
			console.log("hi enter responsesToUILDS")
			// check if already exists entries in the obj
			if(
				Object.entries(props.profileToMatch).length != 0 
			){
				// final data to the server
				const finish = {
					objData:{
						thingId:props.userDevices[0].thingId,
						profileToMatch:props.profileToMatch
					}
				}
				// print
				console.log(`profile:${JSON.stringify(finish)}`)
				// redux action to create docs in db with top5Tags match
				props.setTop5TagsCollectionWithMatchBetweenStaticsAndDynamics(finish)
			} 
			else if(Object.entries(props.profileToMatch).length === 0){
				console.log(`profile: nothing yet`)
			}
		} else {
			console.log("it´s not ready to switch")
		}
	}

	// trigger to watch top5Tags recs in db
	const getTop5TagsDocs = () => {
		// print
		console.log(`mode:${JSON.stringify(mode)}`)
		// timer to wait the db records
		setTimeout(()=>{
			// check response
			if(
				props.responsesToUI === "all matches now in db"
			){
				props.userDeviceTop5TagsSyncDataStatic(props.thingid)
				props.userDeviceTop5TagsSyncDataLiveDB(props.thingid)
			} else {
				console.log("it´s not modeOne checked")
			}
		},3000)
	}

	// to trigger the top5Tags watch
	useEffect(() => {
		getTop5TagsDocs()
	}, [props.responsesToUI])

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
	userDevices:state.userDevices1.userDevices,
	// top5Tags
	responsesToUI:state.top5Tags1.responsesToUI,
	// liveDataSets
	thingLiveDataSets:state.heartbeatThing1.thingLiveDataSets,
	profileToMatch:state.heartbeatThing1.thingLiveDataSetsListener.profileToMatch,
	responsesToUILDS:state.heartbeatThing1.responsesToUILDS,
});

const mapActionsToProps = {
	heartbeatPostSearchingMode,
	userDeviceTop5TagsSyncDataStatic,	
	userDeviceTop5TagsSyncDataLiveDB,
	setTop5TagsCollectionWithMatchBetweenStaticsAndDynamics
};

export default connect(mapStateToProps,mapActionsToProps)(SearchingModeSwitcherOne);


