import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CircularProgress from '@material-ui/core/CircularProgress'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
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
import {searchStaticDevicesProductsByCategoriesAndTags} from "../../../../../redux/actions/top5ProductsActions"

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
function getStyles(name, statePath, theme) {
    return {
        fontWeight:
        statePath.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

const ComboSearchModeFive = (props) => {
    // styles
    const classes = useStyles()
	const theme = useTheme()

	// state of box, field & checkboxes
	const [open, setOpen] = React.useState(true)
    const [categoriesSelected, setCategories] = React.useState([])
	const [tagsSelected, setTags] = React.useState({})
	const [selectState, setSelectState] = React.useState(false)
    // const [filteredData, setFilteredData] = React.useState()
	
	// open tab collapser
	const handleClick = () => {
		setOpen(!open)
	}

	// to create dynamic keys from the model data of the device in use
	const createKeys = (obj) => {
		let resultKeys = {}
		for(let item in obj){
			if(obj.hasOwnProperty(item)){
				resultKeys[item] = []
			}
		}
		// console.log(`result:${JSON.stringify(resultKeys)}`)
		return resultKeys
	}

    // handle change for tags
    const handleChangeTags = (event) => {
        setTags({
			...tagsSelected,
			[event.target.name]:event.target.value
		})
		// print
		console.log(`tagsSelected_:${JSON.stringify(tagsSelected)}`)
    } 

    // send data event 
    const handleSubmit = async (event) => {
		event.preventDefault()
		// obj to pass
		const dataToSend = {
			userDeviceId:props.thingLiveDataSets.thingId.split("-").slice(2).toString(),
			dataProductToSearch:{
				taxonomy:tagsSelected
			}
		}
		// console.log({dataToSend})
        // redux action to send data to server
		await props.searchStaticDevicesProductsByCategoriesAndTags(dataToSend)
	}

	// handle change for categories
	const handleChangeCheckbox = (event) => {
		// create empty arrs to hold tags
		setTags(createKeys(props.staticDevicesTags))
		// set category
		setCategories([
			...categoriesSelected,
			event.target.value
		])
		// print
		console.log(`categoriesSelected:${JSON.stringify(categoriesSelected)}`)
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

	// tags from db
	const selectorTagsList = (data)=>{
		let tg = data
		//print
		console.log(`data fields tags:${JSON.stringify(tg)}`)
		// loop
		return tg.map((tagCategoryItem)=>{
			return(
				<MenuItem 
					key={tagCategoryItem} 
					value={tagCategoryItem} 
					// style={getStyles(tagCategoryItem,statePath,theme)}
				>
					{tagCategoryItem}
				</MenuItem>
			)
		})
	}

	// active input
	// const handleFilter = (event) => {
	// 	const searchWord = event.target.value
	// 	const newFilter = props.staticDevicesTags[categorySelected].filter((value)=>{ 
	// 		return value.toLowerCase().includes(searchWord.toLowerCase()) // title needs to be the key name
	// 	})
	// 	// checker of use of field
	// 	if(searchWord === ""){
	// 		// hook state
	// 		setFilteredData([])
	// 	} else {
	// 		// hook state
	// 		setFilteredData(newFilter)
	// 	}
	// }

	// category selected field
	
	const field = (tags) => {
		return categoriesSelected.map((categorySelected)=>{
			// console.log(`categorySelected:${JSON.stringify(categorySelected)}`)
			// console.log(`tags[categorySelected]:${JSON.stringify(tags[categorySelected])}`)
			return(
				<Select
					name={categorySelected}
					labelId={categorySelected}
					id={categorySelected}
					// multiple
					value={tags[categorySelected]}
					onChange={handleChangeTags}
					// active input
					input={
						<Input 
							id={`select-mutiple-chip`} 
							//onChange={handleFilter}
							className={classes.field} 
						/>
					}
					renderValue={
						(selected)=>(
							<div className={classes.chips}>
								<Chip 
									key={selected} 
									label={selected} 
									className={classes.chip} 
								/>
							</div>
						)
					}
					MenuProps={MenuProps}
				>
					{/* all tags of selected key to init*/}
					{selectorTagsList(props.staticDevicesTags[categorySelected])}
				</Select>
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
									{/* fields */}
									{field(tagsSelected)}
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

export default connect(mapStateToProps,{getTagsFromDeviceConfig,searchStaticDevicesProductsByCategoriesAndTags})(ComboSearchModeFive)
    