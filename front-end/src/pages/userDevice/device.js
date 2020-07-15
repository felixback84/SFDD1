import React, { Component } from 'react';

// components
import HildaUI from './HildaUI';
import HaloUI from './HaloUI';
import UserDeviceSkeleton from '../../utilities/UserDeviceSkeleton';

// Redux stuff
import { connect } from 'react-redux';

// switch case
class Device extends Component {

    // if the device is active
    findActiveDevice= () => {
        const {
            userDevices,
            loading
        } = this.props;

        // find the active one
        const anyActive = userDevices.active.find(
            (userDevice) => userDevice.active === true
        )
        // devices ids
        const HALO = 'MZInC971tJYurv3OYzjR';
        const HILDA = 'gE2ySDQaMymbZe0r6KEH';

        // check if ther anyone active
        if(anyActive){
            switch(anyActive.deviceId){
                case HALO:
                        // specific component
                        let UIHildaMarkup = !loading ? (
                            <HildaUI/>
                            ) : (
                                <UserDeviceSkeleton/>
                            );
                        return(UIHildaMarkup);
                case HILDA:
                        // specific component
                        let UIHaloMarkup = !loading ? (
                            <HaloUI/>
                            ) : (
                                <UserDeviceSkeleton/>
                            );
                        return(UIHaloMarkup);
                default:
                    return null;
            }
        }
    };

    render(){
        {return this.findActiveDevice}
    }    

}

const mapStateToProps = (state) => ({
    userDevices: state.userDevices1.userDevices
    
})

export default connect(mapStateToProps)(Device);