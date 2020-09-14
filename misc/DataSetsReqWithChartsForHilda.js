import React, { Component } from 'react';
// chart.js stuff
import { Line } from 'react-chartjs-2';
// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
// redux stuff
import store from '../../../redux/store';
import { connect } from 'react-redux';
import { getAllDataSetsUserDevice } from '../../../redux/actions/dataSetsActions';

//styles
const styles = (theme) => ({
    
});

// function to get data from dataSets
class DataSetsReqWithChartsForHilda extends Component {

    state = {
        userDeviceId: this.props.userdeviceid,
    }

    onSomeTaskStart = () => {
        // do something
        // if(this.state.userDeviceId != undefined){
        //     this.props.getAllDataSetsUserDevice(this.state.userdeviceid);
        // }    
        // } else if (this.state.userDeviceId){
        //     this.props.getAllDataSetsUserDevice(this.state.userdeviceid);
        // }
        store.dispatch(getAllDataSetsUserDevice(this.state.userdeviceid));
    }

    componentWillMount(){
        // const { userdeviceid } = this.props;
        // // redux action
        // this.props.getAllDataSetsUserDevice(userdeviceid);
        this.onSomeTaskStart()
    }

    // with enclousure    
    // onSomeTaskStart = (function() {
    //     let executed = false; 
    //     return function() {
    //         if (!executed) {
    //             executed = true;
    //             // do something
    //             const { userdeviceid } = this.props;
    //             this.props.getAllDataSetsUserDevice(userdeviceid);
    //         }
    //     };
    // })();
    
    render(){

        // let hi = () => {
        //     let executed = false; 
        //     return () => {
        //         if (!executed) {
        //             executed = true;
        //             // do something
        //             this.onSomeTaskStart()
        //         }
        //     };
        // }

        // {hi()}

        // redux state for dataSets
        const { 
            dataSets
        } = this.props;

        // vars to extract data
        let activeTimesRecord = [];
        let colorValuesRecord = [];
        let motorSpeedRecord = [];

        // mapping and pick data from dataSets in userDevice
        dataSets.map(dataSet => {
                activeTimesRecord = [dataSet.active];
                colorValuesRecord = [dataSet.colorValue];
                motorSpeedRecord = [dataSet.motorSpeed];
            }
        );
        // print arrays
        console.log(`Result from map: ${activeTimesRecord} - ${colorValuesRecord} - ${motorSpeedRecord}`);
        
        // funtion to create the object to char.js
        const dataToGraphics = (activeTimes, colorValues, motorSpeed) => {
            let data = {
                labels:[
                    "hi"
                ],
                datasets:[
                    {
                        label: "Active",
                        data: activeTimes
                    },
                    {
                        label: "colorValue",
                        data: colorValues
                    },
                    {
                        label: "motorSpeed",
                        data: motorSpeed
                    }
                ]
            }
            // return object
            return data;
        }
        return (
            <Line data={
                dataToGraphics(
                    activeTimesRecord,
                    colorValuesRecord,
                    motorSpeedRecord
                    )
                }>
            </Line>
        )
    }
}

// redux state
const mapStateToProps = (state) => ({
    dataSets: state.dataSets1.dataSets
})
export default connect(mapStateToProps)(withStyles(styles)(DataSetsReqWithChartsForHilda));



////////////////////////////////

import { getUserDevices } from '../../redux/actions/userDevicesActions';

class deviceDataSets extends Component {
    // find the userDevice active
    componentWillMount(){
        // trigger redux action
        this.props.getUserDevices();
    }

    render() {
        
        return(
            <DataSetsReqWithChartsForHilda userdeviceid={resultUserDeviceId[0]}/>
        )
    }
}
// redux state
const mapStateToProps = (state) => ({
    userDevices: state.userDevices1.userDevices
})
export default connect(mapStateToProps,{getUserDevices})(deviceDataSets);