import React, { Component } from 'react';

// components
import HildaUI from '../../components/userDevice/HildaUIParts/HildaUI';
import HaloUI from '../../components/userDevice/HaloUIParts/HaloUI';
import UserDeviceSkeleton from '../../utilities/UserDeviceSkeleton';

// Redux stuff
import { connect } from 'react-redux';
import { getUserDevices } from '../../redux/actions/userDevicesActions';

// switch case
class Device extends Component {

    componentWillMount(){
        this.props.dispatch(getUserDevices());
    }

    render(){

        const {
            userDevices,
            loading
        } = this.props;

        // devices ids
        const HALO = 'MZInC971tJYurv3OYzjR';
        const HILDA = 'gE2ySDQaMymbZe0r6KEH';
        // pick active one
        const activeOne = userDevices.filter(userDevice => userDevice.active === true);
        // pick his deviceId and thingId and other stuff
        let resultUserDeviceId = activeOne.map(({userDeviceId}) => userDeviceId);
        let resultDeviceId = activeOne.map(({deviceId}) => deviceId);
        let resultThingId = activeOne.map(({thingId}) => thingId);
        // print
        console.log(`Result of active device: ${resultDeviceId} - ${resultThingId} - ${resultUserDeviceId}`)
        // pick UI
        switch(resultDeviceId[0]){
            case HALO:
                // specific component
                let UIHildaMarkup = !loading ? (
                    <HaloUI 
                        thingid={resultThingId[0]}
                        userdeviceid={resultUserDeviceId[0]}
                    />
                    ) : (
                        <UserDeviceSkeleton/>
                    );
                return(UIHildaMarkup);
            case HILDA:
                // specific component
                let UIHaloMarkup = !loading ? (
                    <HildaUI 
                        thingid={resultThingId[0]}
                        userdeviceid={resultUserDeviceId[0]}
                    />
                    ) : (
                        <UserDeviceSkeleton/>
                    );
                return(UIHaloMarkup);
            default:
                return null;
        }
    }
}

const mapStateToProps = (state) => ({
    userDevices: state.userDevices1.userDevices
    
})

//export default Device;
export default connect(mapStateToProps)(Device);