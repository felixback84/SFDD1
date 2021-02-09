import React from 'react'
import { green, yellow, red, pink, blue } from '@material-ui/core/colors';
// Redux stuff
import { connect } from 'react-redux';

// color switcher
const ColorPicker = (props) => {
    // colors backs
    const colors = {
        green: green[500],
        yellow: yellow[500],
        red: red[500],
        pink: pink[500],
        blue: blue[500]
    }

    // color obj to compare
    const colorsDB = {
        green:{
            mix:{
                r:76,g:175,b:80
            },
            mts: "0 to 5 mts"
        },
        yellow:{
            mix:{
                r:255,g:235,b:59
            },
            mts: "5 to 10 mts"
        },
        red:{
            mix:{
                r:244,g:67,b:54
            },
            mts: "10 to 15 mts"
        },
        pink:{
            mix:{
                r:233,g:30,b:99
            },
            mts: "15 to 20 mts"
        },
        blue:{
            mix:{
                r:33,g:150,b:243
            },
            mts: "20 to 25 mts"
        },
    }
 
    const mark = () =>
        {
            // switch
            switch (JSON.stringify(props.thingLiveDataSets.colorvalue)) {
                case JSON.stringify(colorsDB.green.mix):
                    // print
                    console.log(`colorValue: color.green`);
                    return colors.green
                    break;
                case JSON.stringify(colorsDB.yellow.mix):
                    // print
                    console.log(`colorValue: color.yellow`);
                    return colors.yellow
                    break;
                case JSON.stringify(colorsDB.red.mix):
                    // print
                    console.log(`colorValue: color.red`);
                    return colors.red
                    break;
                case JSON.stringify(colorsDB.pink.mix):
                    // print
                    console.log(`colorValue: color.pink`);
                    let color = colors.pink
                    let mts = colorsDB.pink.mts
                    return(
                        <CardBody style={{backgroundColor:color}}>
                            
                        </CardBody>  
                    )
                    break;
                case JSON.stringify(colorsDB.blue.mix):
                    // print
                    console.log(`colorValue: color.blue`);
                    return colors.blue
                    break;
                default:
                    break;
            }
        }    
    
    return(
        <div>
            {mark}
        </div>
    )
    
}

// redux state
const mapStateToProps = (state) => ({
    thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
})
//export default Device;
export default connect(mapStateToProps)(ColorPicker);
