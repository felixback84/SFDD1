import React, { Component } from 'react';

// componets
import CardForHeartbeatUI from './CardForHeartbeatUI';

// Redux stuff
import { connect } from 'react-redux';
import { heartbeatThingSyncDataWithLiveDB } from '../../../redux/actions/heartbeatUIActions';

class HeartbeatUI extends Component {
    //redux action
    componentWillMount(){
        const thingId = this.props.thingid;
        this.props.heartbeatThingSyncDataWithLiveDB(thingId);
    } 

    render(){  
        // props
        const {thingLiveDataSets} = this.props;
        // print data from db liveDataSets
        console.log(`data from db for heartbeat: ${thingLiveDataSets}`);
        return (
            <CardForHeartbeatUI userdeviceid={this.props.userdeviceid}/>
        );
    }  
}  

// redux state
const mapStateToProps = (state) => ({
    thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets
})
//export default Device;
export default connect(mapStateToProps,{heartbeatThingSyncDataWithLiveDB})(HeartbeatUI);