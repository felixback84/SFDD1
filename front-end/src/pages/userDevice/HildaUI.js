import React, { Component } from 'react';
// componets
import CardForHildaUI from './HildaUIParts/CardForHildaUI';
// Redux stuff
import { connect } from 'react-redux';
import { hildaThingSyncDataWithLiveDB } from '../../redux/actions/hildaUIActions';

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
        const {data} = this.props;
        // print data from db liveDataSets
        console.log(`data from db for hilda: ${data}`);
        return (
            // card
            <CardForHildaUI userdeviceid={this.props.userdeviceid}/>
        );
    }
}

// redux state
const mapStateToProps = (state) => ({
    data: state.hildaThing1.data, 
})

//export default Device;
export default connect(mapStateToProps,{hildaThingSyncDataWithLiveDB})(HildaUI);