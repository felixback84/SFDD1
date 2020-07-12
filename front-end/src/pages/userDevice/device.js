import React, { Component } from 'react';

// components
import DataSetHilda from './DataSetHilda';
import DataSetHalo from './DataSetHalo';
import UserDeviceSkeleton from '../../../../utilities/UserDeviceSkeleton';

// Redux stuff
import { connect } from 'react-redux';

// switch case
class Device extends Component {
    
    render(){
        // devices ids
        const HALO = 'MZInC971tJYurv3OYzjR';
        const HILDA = 'gE2ySDQaMymbZe0r6KEH';

        const {
            userDevices
        } = this.props;

        
        const mapResult = userDevices.map(userDevice => {
            let idsAndActive = [];
            let id = userDevice.userDeviceId;
            let active = userDevice.active;
            idsAndActive.push({
                id,
                active
            })
            idsAndActive = idsAndActive.filter(
                active => active !== false 
            )
                
            switch(mapResult.idsAndActive){
                case HILDA:
                    // specific component
                    let UIHildaMarkup = !loading ? (
                        <HildaUI/>
                        ) : (
                            <UserDeviceSkeleton/>
                        );
                    return(UIHildaMarkup);       
                case HALO:
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
        })
    }  
    return(
        {mapResult}
    ) 
    
}

const mapStateToProps = (state) => ({
    adventure: state.userAdventures1.userAdventure.adventure
    
})

export default connect(mapStateToProps)(withStyles(styles)(Device));

