import React, { Component } from 'react';

// components
import HeartbeatUI from './sections/HeartbeatUI';
import NullDeviceUI from './sections/NullDeviceUI';
import UserDeviceSkeleton from '../../components/Loaders/Skeleton';

// Redux stuff
import { connect } from 'react-redux';
import { getUserDevices } from '../../redux/actions/userDevicesActions';

// switch case
class userDevice extends Component {

	componentWillMount(){
		this.props.dispatch(getUserDevices());
	}

	render(){

		const {
			userDevices, 
			loading
		} = this.props;

		// device ids
		const HEARTBEAT = 'AdPadmSiw6GnVggUAj51';
		// pick active one
		const activeOne = userDevices.filter(userDevice => userDevice.active === true);
		// check if any active device exists
		if(activeOne === false){
			// specific component
			let UINullMarkup = !loading ? (
				<NullDeviceUI />
				) : (
					<UserDeviceSkeleton/>
				);
			return(UINullMarkup);
		} else {
			// pick his deviceId and thingId and other stuff
			let resultUserDeviceId = activeOne.map(({userDeviceId}) => userDeviceId);
			let resultDeviceId = activeOne.map(({deviceId}) => deviceId);
			let resultThingId = activeOne.map(({thingId}) => thingId);
			// print
			console.log(`Result of active device: ${resultDeviceId} - ${resultThingId} - ${resultUserDeviceId}`)
			// pick UI
			switch(resultDeviceId[0]){
				case HEARTBEAT:    
					// specific component
					let UIHeartbeatMarkup = !loading ? (
						<HeartbeatUI 
							thingid={resultThingId[0]}
							userdeviceid={resultUserDeviceId[0]}
						/>
						) : (
							<UserDeviceSkeleton/>
						);
					return(UIHeartbeatMarkup);
				default:
					return null;
			}
		}
	}
}

const mapStateToProps = (state) => ({
	userDevices: state.userDevices1.userDevices,
	loading: state.userDevices1.loading
})

//export default Device;
export default connect(mapStateToProps)(userDevice);


