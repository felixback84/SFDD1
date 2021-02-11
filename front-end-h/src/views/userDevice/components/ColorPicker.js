import React from 'react'
import { green, yellow, red, pink, blue } from '@material-ui/core/colors';
// core components
import CardBody from "components/Card/CardBody.js";

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
        green:{r:76,g:175,b:80},
        yellow:{r:255,g:235,b:59},
        red:{r:244,g:67,b:54},
        pink:{r:233,g:30,b:99},
        blue:{r:33,g:150,b:243},
    }
    
	// switch
	switch (JSON.stringify(props.colorvalue)) {
		case JSON.stringify(colorsDB.green):
			// print
			console.log(`colorValue: color.green`);
			return(
				<CardBody style={{backgroundColor:colors.green}}>
					{props.content}
				</CardBody>  
			)
			break;
		case JSON.stringify(colorsDB.yellow):
			// print
			console.log(`colorValue: color.yellow`);
			return colors.yellow
			break;
		case JSON.stringify(colorsDB.red):
			// print
			console.log(`colorValue: color.red`);
			return colors.red
			break;
		case JSON.stringify(colorsDB.pink):
			// print
			console.log(`colorValue: color.pink`);
			return(
				<CardBody style={{backgroundColor:colors.pink}}>
					{props.content}
				</CardBody>  
			)
			break;
		case JSON.stringify(colorsDB.blue):
			// print
			console.log(`colorValue: color.blue`);
			return colors.blue
			break;
		default:
			return null;
			break;
	}
    
}
//export default Device;
export default ColorPicker;
