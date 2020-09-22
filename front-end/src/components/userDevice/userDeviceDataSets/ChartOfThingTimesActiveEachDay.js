import React, { Component } from 'react';
// chart.js stuff
import { Line } from 'react-chartjs-2';
// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
// redux
import { connect } from 'react-redux';
import { chartCounterOffActiveTimes } from '../../../redux/actions/hildaUIActions';


//styles
const styles = (theme) => ({
    
});

// function to get data from dataSets
class ChartOfThingTimesActive extends Component {

    componentWillMount(){
        chartCounterOffActiveTimes('mggbCoK1pihIqDJzJf3T');
    }

    render(){
        // funtion to create the object to char.js
        // const dataDateToGraphics = () => {
        //     let data = {
        //         labels: uniques, 
        //         datasets:[
        //             {
        //                 label: "Active",
        //                 data: counter
        //             },
        //         ]
        //     }
        //     // return object
        //     return data;
        // }
        return (
            // <Line data={dataDateToGraphics}></Line>
            <div>
                hi
            </div>
        )

        
    }
}

const mapStateToProps = (state) => ({
    ui: state.ui,
    
})

//export default (withStyles(styles)(ChartOfThingTimesActive));
export default connect(mapStateToProps,{chartCounterOffActiveTimes})(ChartOfThingTimesActive);