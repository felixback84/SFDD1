import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
// icons
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// Redux stuff
import {connect} from 'react-redux';
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
        maxWidth: 600,
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
}));

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
};

// style mixer
function getStyles(name, statePath, theme) {
    return {
        fontWeight:
        statePath.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

const ComboSearchModeThree = (props) => {
    // styles
    const classes = useStyles()
	const theme = useTheme()
	
	// open tab collapser
	const [open, setOpen] = React.useState(true)
	const handleClick = () => {
		setOpen(!open)
	}

    // state of field & checkbox
    const [categorySelected, setCategory] = React.useState("")
    const [tagsSelected, setTags] = React.useState({luckyNumbers:[],dcHeros:[],pets:[],fruits:[]})
    const [filteredData, setFilteredData] = React.useState()
	
    // handle change for tags
    const handleChangeTags = (event) => {
        setTags(
            event.target.value
        )
    } 

    // send data event
    const handleSubmit = (event) => {
		event.preventDefault()
		// obj to pass
		const objData = {
			category:categorySelected,
			tag:tagsSelected
		}
        // redux action to send data to server
		props.searchStaticDevicesProductsByCategoriesAndTags(objData)
	}

	// handle change for categories
	const handleChangeCheckbox = (event) => {
		setCategory(
            event.target.value
		)
		// print
		console.log(`tagsSelected:${{tagsSelected}}`)
	}

	// categorie checkboxes
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
		// print
		// console.log(`data fields tags:${JSON.stringify(tg)}`)
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
	const handleFilter = (event) => {
		const searchWord = event.target.value
		const newFilter = props.staticDevicesTags[categorySelected].filter((value)=>{ 
			return value.toLowerCase().includes(searchWord.toLowerCase()) // title needs to be the key name
		})
		// checker of use of field
		if(searchWord === ""){
			// hook state
			setFilteredData([])
		} else {
			// hook state
			setFilteredData(newFilter)
		}
	}

	// category selected field
	const field = (categorySelected) => {
		return categorySelected != "" && 
		(
			<Select
				name={categorySelected}
				labelId={categorySelected}
				id={categorySelected}
				multiple
				value={tagsSelected[categorySelected]}
				onChange={handleChangeTags}
				// active input
				input={
					<Input 
						id={`select-mutiple-chip`} 
						//onChange={handleFilter}
					/>
				}
				renderValue={
					(selected) => (
						<div className={classes.chips}>
							{selected.map((value) => (
								<Chip key={value} label={value} className={classes.chip} />
							))}
						</div>
					)
				}
				MenuProps={MenuProps}
			>
				{/* all tags of selected key to init*/}
				{selectorTagsList(props.staticDevicesTags[categorySelected])}
				{/* {filteredData} */}
			</Select>
		)
	}
	
    return(
        <>
			{/* selectors creator */}
			<List
				aria-labelledby="nested-list-subheader"
			>
				<ListItem button onClick={handleClick}>
                    <ListItemText primary="Category Shop Search" />
                        {open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>

				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<form noValidate onSubmit={handleSubmit}>
                            <FormControl>
                                {/* checkboxes categories*/}
                                <FormLabel component="legend">Categories</FormLabel>
								<FormGroup aria-label="position" row>
									{keysToCheckBoxes(props.staticDevicesTags)}
								</FormGroup>
								
							    {/* field tag label*/}
								<InputLabel id={`mutiple-chip-label`}>{`Tags in ${categorySelected}`}</InputLabel>
								{/* {field of category selected} */}
								{field(categorySelected)}
							</FormControl>

							{/* btn */}
							<Button 
								className={classes.button}
								type="submit" 
								variant="contained" 
								color="primary" 
								variant="outlined"
								disabled={props.loading}>
									Buscar
									{props.loading && (
										<CircularProgress 
											size={30} 
											className={classes.progress} 
										/>
									)}
							</Button>
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
});

export default connect(mapStateToProps,{getTagsFromDeviceConfig,searchStaticDevicesProductsByCategoriesAndTags})(ComboSearchModeThree)
    