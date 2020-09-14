import React, { Component } from 'react';
// chart.js stuff
import { Line } from 'react-chartjs-2';
// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';

//styles
const styles = (theme) => ({
    
});

// function to get data from dataSets
class DataSetsReqWithChartsForHilda extends Component {

    render(){

        // redux state for dataSets
        const { 
            datasets
        } = this.props;

        // vars to extract data
        let activeTimesRecord = [];
        let colorValuesRecord = [];
        let motorSpeedRecord = []; 

        // mapping and pick data from dataSets in userDevice
        datasets.map(dataset => {
                activeTimesRecord = [dataset.active];
                colorValuesRecord = [dataset.colorValue];
                motorSpeedRecord = [dataset.motorSpeed];
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

export default (withStyles(styles)(DataSetsReqWithChartsForHilda));
