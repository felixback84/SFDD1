import React, { Component, Fragment } from 'react'
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// components
import Header from "../../components/Headers/Header.js";
import GoogleMap from "./sections/GoogleMap"
import SkeletonDashboard from "./components/SkeletonDashboard.js";
// Redux stuff
import { connect } from 'react-redux';
import { getUserDevices } from '../../redux/actions/userDevicesActions';
import { heartbeatThingSyncDataWithLiveDB } from '../../redux/actions/heartbeatUIActions';
// srtyles
import componentStyles from "assets/theme/views/admin/dashboardOne.js";
const useStyles = componentStyles;

class Dashboard extends Component {

	// trigger redux action
  componentDidMount() {
    // userDevices redux action
    this.props.getUserDevices()
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userDevices !== prevProps.userDevices) {
      // liveDataSets & products redux action
      this.props.heartbeatThingSyncDataWithLiveDB(this.props.userDevices[0].thingId);
    }
  }

	render(){
		// redux props
		const {
			classes,
			ui,
			thingLiveDataSets:{
				coords,
				searchingMode,
				idOfSpecificStaticDevice,
				idOfSpecificProduct
			}
		} = this.props

		// dash markup
		const dashboardMarkUp = !ui.loading ? (
			<>
				{/* static bg */}
				<Header 
					idofspecificstaticdevice={idOfSpecificStaticDevice}
					idofspecificproduct={idOfSpecificProduct}
				/>
				{/* Page content */}
				<Container
					maxWidth={false}
					component={Box}
					marginTop="-6rem"
					classes={{ root: classes.containerRoot }}
				>
					<Grid container>
						<Grid item xs={12}>
							<Card classes={{ root: classes.cardRoot }}>
								{/* google map */}
								{/* <MapWrapper 
									searchingmode={searchingMode[0]}
									coords={coords} 
								/> */}
								<GoogleMap
									searchingmode={searchingMode[0]}
									//coords={coords}
								/>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</>
		) : (
			<SkeletonDashboard/>
		);

		return(
			<>
				{dashboardMarkUp}
			</>
		)
	}
}

// connect to global state in redux
const mapStateToProps = (state) => ({
  userDevices: state.userDevices1.userDevices,
  thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
  ui: state.ui
});

export default connect(mapStateToProps,{getUserDevices,heartbeatThingSyncDataWithLiveDB})(withStyles(useStyles)(Dashboard));



