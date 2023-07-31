import React, { useRef} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Slider from '@mui/material/Slider';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
// icons
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
// Redux stuff
import { connect } from 'react-redux';
import {searchByGeohashesAndMetersStaticDevices} from "../../../../../redux/actions/top5TagsActions"

// add styles
const useStyles = makeStyles((theme) => ({
    root: {
		//minWidth: '100%',
		// maxWidth: 600,
		// maxWidth: '100%',
		//backgroundColor: theme.palette.background.paper,
        '& > *': {
            //margin: theme.spacing(1),
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

const ComboSearchModeSeven = (props) => {

	// styles
    const classes = useStyles()

	// state of box, mts range
	const [open, setOpen] = React.useState(true)
	const countMtsRef = useRef(0)
	
	// FORM
	// open collapser
	const handleClickOpen = () => {
		setOpen(!open)
	}

	// submit
	const handleSubmit = (event) => {
		event.preventDefault()
		// final data to the server
		const finish = {
            meters:countMtsRef,
            coords:props.thingLiveDataSets.coords
        }
        // redux action to send data to server
		props.searchByGeohashesAndMetersStaticDevices(finish.coords,finish.meters)
		// print
		console.log(`mts sended:${JSON.stringify(finish)}`)
	}

	// change of inputs
	const handleChangeMts = (event) => {
		countMtsRef.current = event.target.value
		// print
		console.log(`btn change in mts:${JSON.stringify(countMtsRef.current)}`)
    }
		
	return ( 
		<>	
			{/* selectors creator */}
			<List
				aria-labelledby="nested-list-subheader"
			>
				<ListItem button onClick={handleClickOpen}>
					<ListItemText/>
						{open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse 
					in={open} 
					timeout="auto" 
					unmountOnExit
					className={classes.root}
				>
					<List component="div" disablePadding>
						<form 
							noValidate 
							onSubmit={handleSubmit}
						>
							<Grid container >
								<Grid item xs={12}>
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
})

export default connect(mapStateToProps,{searchByGeohashesAndMetersStaticDevices})(ComboSearchModeSeven)







// class ComboSearchModeSeven extends Component {

//     // state
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			open:false,
//             meters:0,
//             coords:{
//                 lan:this.props.thingLiveDataSets.coords.lat,
//                 lng:this.props.thingLiveDataSets.coords.lon
//             } 
// 		}
// 		// handle input changes
// 		this.handleChange = this.handleChange.bind(this)
// 		this.handleSubmit = this.handleSubmit.bind(this)
// 	}
    
//     // FORM
// 	// open collapser
// 	handleClick(){
// 		// let collapser = this.state.open 
// 		// this.setState({open:!collapser})
// 		let openRef = 
// 	}

// 	// submit
// 	handleSubmit(event){
// 		event.preventDefault()
// 		// print
// 		console.log(`before mts sended:${JSON.stringify(this.state.coords)}`)
// 		// final data to the server
// 		const finish = {
// 			...this.state,
//             meters:this.state.meters,
//             coords:this.props.thingLiveDataSets.coords
//         }
//         // redux action to send data to server
// 		this.props.searchByGeohashesAndMetersStaticDevices(finish.coords,finish.meters)
// 		// print
// 		console.log(`mts sended:${JSON.stringify(finish)}`)
// 	}

// 	// change of inputs
// 	handleChange(event){
// 		this.setState({
// 			...this.state,
// 			meters:event.target.value
// 		})
// 		// print
// 		console.log(`btn change:${JSON.stringify(this.state)}`)
//     }
    
//     render() {
// 		let classes = this.props
		
//         return ( 
// 			<>	{/* selectors creator */}
// 			<List
// 				aria-labelledby="nested-list-subheader"
// 			>
// 				<ListItem button onClick={this.handleClick}>
//                     <ListItemText/>
//                         {this.state.open ? <ExpandLess /> : <ExpandMore />}
// 				</ListItem>
// 					<Collapse in={this.state.open} timeout="auto" unmountOnExit>
// 						<List component="div" disablePadding>
// 							<form 
// 								noValidate 
// 								onSubmit={this.handleSubmit}
// 							>
// 								<Grid container >
// 									<Grid item xs={12}>
// 										<Slider
// 											onChange={this.handleChange}
// 											name="meters"
// 											aria-label="Distance in meters"
// 											defaultValue={100}
// 											step={50}
// 											marks
// 											min={0}
// 											max={500}
// 											valueLabelDisplay="auto"
// 										/>
// 									</Grid> 
// 									<Grid item xs={12}>
// 										{/* btn */}
// 										<Button 
// 											size="large"
// 											className={classes.button}
// 											type="submit" 
// 											variant="contained" 
// 											color="primary" 
// 											disabled={this.props.loading}>
// 												Search
// 												{this.props.loading && (
// 													<CircularProgress 
// 														size={30} 
// 														className={classes.progress} 
// 													/>
// 												)}
// 										</Button>
// 									</Grid>
// 								</Grid>	
// 							</form>
// 						</List>
// 					</Collapse>
// 				</List>
// 			</>
            
//         )
//     }
// }

// // connect to global state in redux
// const mapStateToProps = (state) => ({
// 	// ui
// 	ui: state.ui,
// 	staticDevicesTags: state.ui.staticDevicesTags,
// 	// userDevices
// 	userDevices: state.userDevices1.userDevices,
// 	// liveDataSets
//     thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
// });

// export default connect(mapStateToProps,{searchByGeohashesAndMetersStaticDevices})(withStyles(componentStyles)(ComboSearchModeSeven))
