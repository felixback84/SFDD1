import React, { Component } from 'react';
// chart.js stuff
import { Line } from 'react-chartjs-2';
// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//styles
const styles = (theme) => ({
    
});

// function to get data from dataSets
class ChartOfThingTimesActive extends Component {

    render(){

        // day.js
        dayjs.extend(relativeTime);

        // state from props for dataSets
        const { 
            datasets
        } = this.props;

        // mapping and pick data from dataSets in userDevice
        const mappingDataDates = datasets.map((dataset) => {
                let activeTimesRecord = dayjs(dataset.createdAt).fromNow();
                // return result
                return activeTimesRecord;
            }
        );
        // print array of active dates dates
        console.log(`Result from dates map: ${mappingDataDates}`);
        
        // mapping and pick data from dataSets in userDevice
        const mappingDataActive = datasets.map((dataset) => {
            let activeRecord = dataset.active;
            // check the value
            if(activeRecord === "true"){
                activeRecord = 1;
            } else if (activeRecord === "false"){
                activeRecord = 0;
            }
                return activeRecord;
            }
        );
        // print array of actives
        console.log(`Result from dates map 1: ${mappingDataActive}`);

        // funtion to create the object to char.js
        const dataDateToGraphics = () => {
            let data = {
                labels: mappingDataDates, 
                datasets:[
                    {
                        label: "Active",
                        data: mappingDataActive
                    },
                ]
            }
            // return object
            return data;
        }
        return (
            <Line data={dataDateToGraphics}></Line>
        )
    }
}

export default (withStyles(styles)(ChartOfThingTimesActive));
