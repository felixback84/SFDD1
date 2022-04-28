// 'holasoylacartaquenuncallegaràalasmanosdecarlosporqueaèlrealmenrenoleimporta''holasoylalitaynotengoideadecomofuncionaesteprogram
// ñññññññññññeroooooooooooooooozooooooooooooooooooodeeeeeeeeeeeeemieeeeerdaaaaaaaaaaaa

import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
// icons
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';

// Redux stuff
import { connect } from 'react-redux';
import {getTagsFromDeviceConfig} from "../../../../../redux/actions/uiActions"
import {postTagsProfileToMatch} from "../../../../../redux/actions/heartbeatUIActions"

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

class ComboSearchModeOne extends Component {

	// state
	constructor(props) {
		super(props)
		this.state = {
			open:false,
			tagsSelected:{},
			allTagsToAllCategories:{},
		}
		// handle input changes
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	// FORM
	// open collapser
	handleClick(){
		let collapser = this.state.open 
		this.setState({open:!collapser})
	}

	// submit
	handleSubmit(event){
		event.preventDefault()
		// final data to the server
		const finish = {
			objProfileDataOfDynamic:{
				thingId:this.props.userDevices.thingId,
				profileToMatch:this.state.tagsSelected
			}
		}
        // redux action to send data to server
        this.props.postTagsProfileToMatch(finish.objProfileDataOfDynamic)
	}

	// change of inputs
	handleChange(event){
		this.setState({
			...this.state,
			tagsSelected:{
				...this.state.tagsSelected,
				[event.target.name]:[...event.target.value]
			}
		})
		// print
		console.log(`btn change:${JSON.stringify(this.state)}`)
	}

	// tags from db
	selectorTagsList(data){
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

	// create empty fields for everyone key
	createFields(data,classes){
		// var to hold the list of nodes
		let listFields = []
		// loop for fields
		for(let item in data){
			// print
			// console.log(`item map: ${JSON.stringify(item)}`)
			// arr push
			listFields.push(item)
		}

		// arr of fields
		return listFields.map((item)=>{
			return(
				// node
				<FormControl className={classes.formControl}>
					<InputLabel 
						id={`mutiple-chip-label - ${item}`}
					>	
						{item}
					</InputLabel>
					<Select
						name={item}
						labelId={`${item}`}
						id={`${item}`}
						multiple
						value={this.state.tagsSelected[item]}
						onChange={this.handleChange}
						input={<Input id={`${item}`}/>}
						renderValue={(selected) => (
							<div className={classes.chips}>
								{selected.map((value) => (
									<Chip key={value} label={value} className={classes.chip}/>
								))}
							</div>
						)}
						MenuProps={MenuProps}
					>
						{this.selectorTagsList(data[item])} 
					</Select>
				</FormControl>
			)
		})
	}

	// STATE
	// update state method
	updateState(data,key){
		// obj to pass
		const updata = this.setState({
			...this.state,
			tagsSelected:this.createKeysInState(data), // to create empty keys to hold user selections
			allTagsToAllCategories: {...data},
		})
		console.log(`updata: ${JSON.stringify(updata)}`)
		return updata
	}

	// to create keys
	createKeysInState(obj){
		let keysInObj = {}
		for(let item in obj){
			if(obj.hasOwnProperty(item)){
				keysInObj[item] = []
			}
		}
		console.log(`result:${JSON.stringify(keysInObj)}`)
		return keysInObj
	}
	
	// to create fields
    componentWillReceiveProps(nextProps){	
		// print
		console.log(`data init`)
		// style var
		let classes = this.props
		// checker
		if(nextProps.staticDevicesTags){
			// print
			console.log(`data init 1`)			
			// var to hold tags from device in his keys
			let tags = {}
			// loop
			let key = ""
			for(key in nextProps.staticDevicesTags){
				// checker keys
				if(nextProps.staticDevicesTags.hasOwnProperty(key)){
					// pass tags to hold tags
					tags[key] = nextProps.staticDevicesTags[key] 
				}
			} 
			// run it in a while
			setTimeout(this.updateState(tags,key),500)
			console.log(`state complete: ${JSON.stringify(this.state)}`)
		}
	}

	render(){
		// styles
		let classes = this.props
		// var with data of state
		// const data = this.state.objProfileDataOfDynamic.profileToMatch
		const data = this.state.allTagsToAllCategories
		return(
			<>
				{/* selectors creator */}
				<List
					aria-labelledby="nested-list-subheader"
				>
					<ListItem button onClick={this.handleClick}>
						<ListItemText primary="Category Shop Search" />
							{this.state.open ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					{/* collapse content */}
					<Collapse 
						in={this.state.open} 
						timeout="auto" 
						unmountOnExit
					>
						<List component="div" disablePadding>
							<form noValidate onSubmit={this.handleSubmit}>
								{/* tags selectors */}
								{this.createFields(data,classes)}
								{/* btn */}
								<Button 
									className={classes.button}
									type="submit" 
									variant="contained" 
									color="primary" 
									variant="outlined"
									disabled={this.props.loading}>
										Buscar
										{this.props.loading && (
											<CircularProgress size={30} className={classes.progress} />
										)}
								</Button>
							</form>
						</List>
					</Collapse>
				</List>                 
			</>
		)
	}
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

export default connect(mapStateToProps,{getTagsFromDeviceConfig,postTagsProfileToMatch})(ComboSearchModeOne)
