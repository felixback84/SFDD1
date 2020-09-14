import React, { Component } from 'react';
// components
import DataSetsReqWithChartsForHilda from '../../components/userDevice/DataSetsUIParts/DataSetsReqWithChartsForHilda'
// redux stuff
import { connect } from 'react-redux';
import { getAllDataSetsUserDevice } from '../../redux/actions/dataSetsActions';

class deviceDataSets extends Component {
    // find the userDevice active
    componentWillMount(){ 
        //redux state for userDevices
        const { userDevices } = this.props;
        // pick active one
        let activeOne = userDevices.filter(userDevice => userDevice.active === true);
        // pick the userDeviceId
        let resultUserDeviceId = activeOne.map(({userDeviceId}) => userDeviceId);
        // print
        console.log(`Result from userDeviceId: ${resultUserDeviceId[0]}`);
        // trigger redux action
        this.props.getAllDataSetsUserDevice(resultUserDeviceId);
    }

    render() {

        // redux state for dataSets
        const { 
            dataSets
        } = this.props;
        
        return(
            <DataSetsReqWithChartsForHilda datasets={dataSets}/>
        )
    }
}
// redux state
const mapStateToProps = (state) => ({
    userDevices: state.userDevices1.userDevices,
    dataSets: state.dataSets1.dataSets
})
export default connect(mapStateToProps,{getAllDataSetsUserDevice})(deviceDataSets);