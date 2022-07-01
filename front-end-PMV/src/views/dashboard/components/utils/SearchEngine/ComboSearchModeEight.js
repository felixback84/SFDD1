import React from 'react'
import { useRef } from 'react'	
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CircularProgress from '@material-ui/core/CircularProgress'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
import Slider from '@mui/material/Slider';
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
// icons
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
// Redux stuff
import {connect} from 'react-redux'
import {getTagsFromDeviceConfig} from "../../../../../redux/actions/uiActions"
import {searchByGeohashesAndMetersStaticDevicesProducts} from "../../../../../redux/actions/top5ProductsActions"

// add styles
const useStyles = makeStyles((theme) => ({
    root: {
		minWidth: '100%',
		maxWidth: 600,
		//backgroundColor: theme.palette.background.paper,
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
	},
	collapse: {
		minWidth: '100%',
		maxWidth: '100%',
	},	
    formControl: {
        margin: theme.spacing(0.25),
        minWidth: "100%",
        maxWidth: 600,
	},
	button: {
        margin: theme.spacing(0.25),
        minWidth: "100%",
        borderRadius: 0
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
	},
	field: {
		minWidth: "100%",
		marginBottom: theme.spacing(1)
	}
}))

// menu props
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

// style mixer
const getStyles = (name,statePath,theme) => {
    return {
        fontWeight:
        statePath.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

const ComboSearchModeEight = (props) => {
    // styles
    const classes = useStyles()

	// state of box, field & checkboxes
	const [open, setOpen] = React.useState(true)
	const countMtsRef = useRef(0)
	const categoryRef = useRef("")

	// open tab collapser
	const handleClick = () => {
		setOpen(!open)
	}

	// change of inputs
	const handleChangeMts = (event) => {
		countMtsRef.current = event.target.value
		// print
		console.log({countMtsRef})
    }

    // submit
	const handleSubmit = (event) => { 
		event.preventDefault()
		// final data to the server
		const finish = {
			category:categoryRef.current,
            coords:props.thingLiveDataSets.coords,
            meters:countMtsRef.current,
        }
        // redux action to send data to server
		props.searchByGeohashesAndMetersStaticDevicesProducts({
			category:finish.category,
			coords:finish.coords,
			meters:finish.meters
		})
		// print
		console.log(`mts sended:${JSON.stringify(finish)}`)
	}

	// handle change for categories
	const handleChangeCheckbox = (event) => {
		// set category
		categoryRef.current = event.target.value
		// print
		console.log(`categoryRef:${JSON.stringify(categoryRef)}`)
	}

	// categories checkboxes
	const keysToCheckBoxes = (keyNames) => {
		// arr to categories
		let arrCheckBoxesToCategories = []
		// loop
		for(let key in keyNames){
			// checker
			if(keyNames.hasOwnProperty(key)){
				arrCheckBoxesToCategories.push(key)
			}
		}
		// push
		return arrCheckBoxesToCategories.map((keyCategorie)=>{
			return(
				<FormControlLabel
					value={keyCategorie}
					control={
						<Checkbox
							onChange={handleChangeCheckbox}
						/>
					}
					label={keyCategorie}
					labelPlacement="start"
				/>
			)
		})
	}

    return(
        <>
			{/* selectors creator */}
			<List
				aria-labelledby="nested-list-subheader"
			>
				<ListItem button onClick={handleClick}>
                    <ListItemText/>
                        {open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<form 
							noValidate 
							onSubmit={handleSubmit}
						>
							<Grid container >
								<Grid item xs={12}>
									{/* checkboxes */}
									<FormGroup aria-label="position" row>
										{keysToCheckBoxes(props.staticDevicesTags)}
									</FormGroup>
								</Grid>	
								<Grid item xs={12}>
									{/* slider */}
									<Slider
										onChange={handleChangeMts}
										name="meters"
										aria-label="Distance in meters"
										defaultValue={100}
										step={50}
										marks
										min={0} 
										max={500}
										valueLabelDisplay="auto"
									/>
								</Grid> 
								<Grid item xs={12}>
									{/* btn */}
									<Button 
										size="large"
										className={classes.button}
										type="submit" 
										variant="contained" 
										color="primary" 
										disabled={props.loading}>
											Search
											{props.loading && (
												<CircularProgress 
													size={30} 
													className={classes.progress} 
												/>
											)}
									</Button>
								</Grid>
							</Grid>
						</form>
					</List>
				</Collapse>
			</List>                 
        </>
    )
}

// connect to global state in redux
const mapStateToProps = (state) => ({
	// ui
	ui: state.ui,
	staticDevicesTags: state.ui.staticDevicesTags,
	// userDevices
	userDevices: state.userDevices1.userDevices,
	// liveDataSets
	thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
	// top5Products
	loading:state.top5Products1.loading,
	// top5ProductsUI: state.top5Products1.top5ProductsUI
});

export default connect(mapStateToProps,{getTagsFromDeviceConfig,searchByGeohashesAndMetersStaticDevicesProducts})(ComboSearchModeEight)
    