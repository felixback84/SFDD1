import React, { Component } from 'react';

// components
import HildaUI from './HildaUI';
import HaloUI from './HaloUI';
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
        const approved = userDevices.filter(userDevice => userDevice.active === true);
        // pick his deviceId and userDeviceId
        let resultDeviceId = approved.map(({deviceId}) => deviceId);
        let resultUserDeviceId = approved.map(({userDeviceId}) => userDeviceId);
        // show data
        // console.log(resultDeviceId);
        // console.log(resultUserDeviceId);
        // pick UI
        switch(resultDeviceId[0]){
            case HALO:
                // specific component
                let UIHildaMarkup = !loading ? (
                    <HaloUI userdeviceid={resultUserDeviceId[0]}/>
                    ) : (
                        <UserDeviceSkeleton/>
                    );
                return(UIHildaMarkup);
            case HILDA:
                // specific component
                let UIHaloMarkup = !loading ? (
                    <HildaUI/>
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