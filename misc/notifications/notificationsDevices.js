// react
import React, { Component, Fragment } from 'react';
// comoponets
import Notifications from '../../components/notifications/Notifications'

class notificationDevices extends Component {
    
    render(){
        
        return (
            <Fragment>
                {/* notification */}
                <Notifications/>
            </Fragment>  
        ) 
    }
}

export default notificationDevices