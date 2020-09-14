import React, { Component } from 'react';
// componets
import CardForHildaUI from './CardForHildaUI';
// Redux stuff
import { connect } from 'react-redux';
import { hildaThingSyncDataWithLiveDB } from '../../../redux/actions/hildaUIActions';

// Hilda UI  
class HildaUI extends Component {
    //redux action to liveDataSets
    componentWillMount(){
        // var with thingId
        const thingId = this.props.thingid;
        // liveDataSets Sync
        this.props.hildaThingSyncDataWithLiveDB(thingId);
    } 

    render(){   
        // props
        const {thingData} = this.props;
        // print data from db liveDataSets
        console.log(`data from db for hilda: ${thingData}`);
        return (
            // card
            <CardForHildaUI userdeviceid={this.props.userdeviceid}/>
        );
    }
}

// redux state
const mapStateToProps = (state) => ({
    thingData : state.hildaThing1.thingData, 
})
 
//export default Device;
export default connect(mapStateToProps,{hildaThingSyncDataWithLiveDB})(HildaUI);