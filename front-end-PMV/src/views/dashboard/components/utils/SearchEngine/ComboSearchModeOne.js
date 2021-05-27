import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
// icons
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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

// style mixer
function getStyles(name, statePath, theme) {
    return {
        fontWeight:
        statePath.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

// tags from db
const selectorTagsList = (data,path,themez) => {
    // vars to hold args
    const statePath = path
    const theme = themez
    // print
    console.log(`data:${JSON.stringify(data)}`)
    // loop
    return data.map((tagCategoryItem)=>{
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

function ComboSearchModeOne(props) {
    // styles
    const classes = useStyles();
	const theme = useTheme();
	
	// open tab
	const [open, setOpen] = React.useState(true);
	const handleClick = () => {
		setOpen(!open);
	};

    // state of fields
    const [tagsSelectedDcHeros, setTagsDcHeros] = React.useState([]);
    const [tagsSelectedLuckyNumbers, setTagsLuckyNumbers] = React.useState([]);
    const [tagsSelectedPets, setTagsPets] = React.useState([]);
    const [tagsSelectedFruits, setTagsFruits] = React.useState([]);

    // handle change
    const handleChangeDcHeros = (event) => {
        setTagsDcHeros(
            event.target.value
        )
    }; 
    // handle change
    const handleChangeLuckyNumbers = (event) => {
        setTagsLuckyNumbers(
            event.target.value
        )
    };
    // handle change
    const handleChangePets = (event) => {
        setTagsPets(
            event.target.value
        )
    };
    // handle change
    const handleChangeFruits = (event) => {
        setTagsFruits(
            event.target.value
        )
	};

    // send data event
    const handleSubmit = (event) => {
		event.preventDefault();
		// obj to pass
		const objProfileDataOfDynamic = {
			thingId:props.userDevices.thingId,
			profileToMatch:{
				dcHeros:tagsSelectedDcHeros,
				fruits:tagsSelectedFruits,
				luckyNumbers:tagsSelectedLuckyNumbers,
				pets:tagsSelectedPets
			}
		}
        // redux action to send data to server
        props.postTagsProfileToMatch(objProfileDataOfDynamic)
	}
	
    return(
        <>
			{/* selectors creator */}
			<List
				aria-labelledby="nested-list-subheader"
			>
				<ListItem button onClick={handleClick}>
				{/* <ListItemIcon>
					<InboxIcon />
				</ListItemIcon> */}
				<ListItemText primary="Category Shop Search" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>

				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<form noValidate onSubmit={handleSubmit}>
							{/* dcHeros */}
							<FormControl className={classes.formControl}>
								<InputLabel id={`mutiple-chip-label - dcHeros`}>DC Heros</InputLabel>
								<Select
									name="dcHeros"
									labelId={`mutiple-chip-label - dcHeros`}
									id={`mutiple-chip - dcHeros`}
									multiple
									value={tagsSelectedDcHeros}
									onChange={handleChangeDcHeros}
									input={<Input id={`select-mutiple-chip - dcHeros`} />}
									renderValue={(selected) => (
										<div className={classes.chips}>
											{selected.map((value) => (
												<Chip key={value} label={value} className={classes.chip} />
											))}
										</div>
									)}
									MenuProps={MenuProps}
								>
									{/* tags */}
									{selectorTagsList(props.staticDevicesTags.dcHeros,tagsSelectedDcHeros,theme)}
								</Select>
							</FormControl>

							{/* luckyNumbers */}
							<FormControl className={classes.formControl}>
								<InputLabel id={`mutiple-chip-label - luckyNumbers`}>luckyNumbers</InputLabel>
								<Select
									labelId={`mutiple-chip-label - luckyNumbers`}
									id={`demo-mutiple-chip - luckyNumbers`}
									multiple
									value={tagsSelectedLuckyNumbers}
									onChange={handleChangeLuckyNumbers}
									input={<Input id={`demo-mutiple-chip - luckyNumbers`} />}
									renderValue={(selected) => (
										<div className={classes.chips}>
											{selected.map((value) => (
												<Chip key={value} label={value} className={classes.chip} />
											))}
										</div>
									)}
									MenuProps={MenuProps}
								>
									{/* tags */}
									{selectorTagsList(props.staticDevicesTags.luckyNumbers,tagsSelectedLuckyNumbers,theme)}
								</Select>
							</FormControl>

							{/* pets */}
							<FormControl className={classes.formControl}>
								<InputLabel id={`mutiple-chip-label - pets`}>pets</InputLabel>
								<Select
									labelId={`mutiple-chip-label - pets`}
									id={`demo-mutiple-chip - pets`}
									multiple
									value={tagsSelectedPets}
									onChange={handleChangePets}
									input={<Input id={`demo-mutiple-chip - pets`} />}
									renderValue={(selected) => (
										<div className={classes.chips}>
											{selected.map((value) => (
												<Chip key={value} label={value} className={classes.chip} />
											))}
										</div>
									)}
									MenuProps={MenuProps}
								>
									{/* tags */}
									{selectorTagsList(props.staticDevicesTags.pets,tagsSelectedPets,theme)}
								</Select>
							</FormControl>

							{/* fruits */}
							<FormControl className={classes.formControl}>
								<InputLabel id={`mutiple-chip-label - fruits`}>fruits</InputLabel>
								<Select
									labelId={`mutiple-chip-label - fruits`}
									id={`demo-mutiple-chip - fruits`}
									multiple
									value={tagsSelectedFruits}
									onChange={handleChangeFruits}
									input={<Input id={`demo-mutiple-chip - fruits`} />}
									renderValue={(selected) => (
										<div className={classes.chips}>
											{selected.map((value) => (
												<Chip key={value} label={value} className={classes.chip} />
											))}
										</div>
									)}
									MenuProps={MenuProps}
								>
									{/* tags */}
									{selectorTagsList(props.staticDevicesTags.fruits,tagsSelectedFruits,theme)}
								</Select>
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

// connect to global state in redux
const mapStateToProps = (state) => ({
    ui: state.ui,
    staticDevicesTags: state.ui.staticDevicesTags,
    userDevices: state.userDevices1.userDevices,
    thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
});

export default connect(mapStateToProps,{getTagsFromDeviceConfig,postTagsProfileToMatch})(ComboSearchModeOne)
    