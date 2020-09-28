import React, { Component } from 'react';
// chart.js stuff
import { Line } from 'react-chartjs-2';
// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
// redux
import { connect } from 'react-redux';
import { chartCounterOfActiveTimes } from '../../../redux/actions/hildaUIActions';


//styles
const styles = (theme) => ({
    
});

// function to get data from dataSets
class ChartOfThingTimesActiveEachDay extends Component {

    componentWillMount(){
        chartCounterOfActiveTimes(this.props.userdeviceid);
    }

    render(){
        // props for graphics
        const {
            chart:{
                counter, 
                newUniques
                }
        } = this.props;
        //funtion to create the object to char.js
        const dataDateToGraphics = () => {
            let data = {
                labels: newUniques, 
                datasets:[
                    {
                        label: "Active",
                        data: counter
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

const mapStateToProps = (state) => ({
    ui: state.ui,
    charts: state.hildaThing1.charts

})

export default connect(mapStateToProps,{chartCounterOfActiveTimes})(ChartOfThingTimesActiveEachDay);