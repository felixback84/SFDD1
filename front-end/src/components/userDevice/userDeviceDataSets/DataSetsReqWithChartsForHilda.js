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

        // state from props for dataSets
        const { 
            datasets
        } = this.props;

        // vars to extract data
        let activeTimesRecord = [];
        let dates = [];

        // mapping and pick data from dataSets in userDevice
        datasets.map(dataset => {
                activeTimesRecord = [dataset.active];
                dates = [dataset.createdAt]
            }
        );
        // print arrays
        console.log(`Result from map: ${activeTimesRecord} - ${dates}`);
        
        // funtion to create the object to char.js
        const dataDateToGraphics = (activeTimes) => {
            let data = {
                labels: dates, 
                datasets:[
                    {
                        label: "Active",
                        data: activeTimes
                    },
                ]
            }
            // return object
            return data;
        }
        return (
            <Line data={dataDateToGraphics(activeTimesRecord)}/>
        )
    }
}

export default (withStyles(styles)(DataSetsReqWithChartsForHilda));
