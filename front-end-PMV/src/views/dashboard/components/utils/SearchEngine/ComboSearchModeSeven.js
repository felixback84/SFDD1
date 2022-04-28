import React, { Component } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Slider from '@mui/material/Slider';
// icons

// Redux stuff
import { connect } from 'react-redux';
import {searchByGeohashesAndMetersStaticDevicesProducts} from "../../../../../redux/actions/top5TagsActions"

class ComboSearchModeSeven extends Component {

    // state
	constructor(props) {
		super(props)
		this.state = {
			open:false,
            meters:0,
            coords:{
                lan:this.props.thingLiveDataSets.coords.lat,
                lng:this.props.thingLiveDataSets.coords.lon
            } 
		}
		// handle input changes
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
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
		// print
		console.log(`before mts sended:${JSON.stringify(this.state.coords)}`)
		// final data to the server
		const finish = {
			...this.state,
            meters:this.state.meters,
            coords:this.props.thingLiveDataSets.coords
        }
        // redux action to send data to server
		this.props.searchByGeohashesAndMetersStaticDevicesProducts(finish.coords,finish.meters)
		// print
		console.log(`mts sended:${JSON.stringify(finish)}`)
	}

	// change of inputs
	handleChange(event){
		this.setState({
			...this.state,
			meters:event.target.value
		})
		// print
		console.log(`btn change:${JSON.stringify(this.state)}`)
    }
    
    render() {
		const {
			classes
		} = this.props 
        return (
			<>
				<form 
					noValidate 
					onSubmit={this.handleSubmit}
				>
					<Grid container >
						<Grid item xs={12}>
							<Slider
								onChange={this.handleChange}
								name="meters"
								aria-label="Distance in meters"
								defaultValue={100}
								//getAriaValueText={this.state.meters}
								step={50}
								marks
								min={0}
								max={500}
								valueLabelDisplay="auto"
								//value={this.state.meters}
							/>
						</Grid>
						<Grid item xs={12}>
							{/* btn */}
							<Button 
								size="large"
								//className={classes.button}
								type="submit" 
								variant="contained" 
								color="primary" 
								disabled={this.props.loading}>
									Search
									{this.props.loading && (
										<CircularProgress 
											size={30} 
											className={classes.progress} 
										/>
									)}
							</Button>
						</Grid>
					</Grid>	
				</form>
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

export default connect(mapStateToProps,{searchByGeohashesAndMetersStaticDevicesProducts})(ComboSearchModeSeven)
