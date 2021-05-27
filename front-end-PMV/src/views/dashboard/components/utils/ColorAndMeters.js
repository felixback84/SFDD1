import { green, yellow, red, pink, blue } from '@material-ui/core/colors';

export default class ColorAndMeters {

    constructor(colorValue,meters){
        this.colorValue = colorValue
        this.meters = meters
    }

    colorMuiMix = (meters) => {
        // check ranges
        if(meters >= 0 && meters <= 5){
            let colorObj = {
                colorValue:{r:76,g:175,b:80}, 
                colorName:"green", 
                colorMix:green[500],
            }
            console.log("hi from meters range match: 0-5");
            return colorObj.colorMix
        } else if (meters >= 5.1 && meters <= 10){
            let colorObj = {
                colorValue:{r:255,g:235,b:59}, 
                colorName:"yellow", 
                colorMix: yellow[500]
            }
            console.log("hi from meters range match: 5-10");
            return colorObj.colorMix
        } else if (meters >= 10.1 && meters <= 15){
            let colorObj = {
                colorValue:{r:244,g:67,b:54}, 
                colorName:"red", 
                colorMix: red[500],
            }
            console.log("hi from meters range match: 10-15");
            return colorObj.colorMix
        } else if (meters >= 15.1 && meters <= 20){
            let colorObj = {
                colorValue:{r:233,g:30,b:99}, 
                colorName:"fucsia", 
                colorMix: pink[500],
            }
            console.log("hi from meters range match: 15-20");
            return colorObj.colorMix
        } else if (meters >= 20.1 && meters <= 25){
            let colorObj = {
                colorValue:{r:33,g:150,b:243}, 
                colorName:"blue", 
                colorMix: blue[500]
            }
            console.log("hi from meters range match: 20-25");
            return colorObj.colorMix
        }  
    }
    
    colorPicker = (colorMix) => {
    
        // color obj to compare
        const colorsDB = {
            green:{r:76,g:175,b:80},
            yellow:{r:255,g:235,b:59},
            red:{r:244,g:67,b:54},
            pink:{r:233,g:30,b:99},
            blue:{r:33,g:150,b:243},
        }
    
        // colors backs
        const colors = {
            green: green[500],
            yellow: yellow[500],
            red: red[500],
            pink: pink[500],
            blue: blue[500]
        }
    
        // underscore
        let _ = require('underscore');
        
        // check
        if(_.isEqual(colorMix,colorsDB.green)){
            console.log("green")
            return colors.green
        } else if(_.isEqual(colorMix,colorsDB.yellow)){
            return colors.yellow
        } else if(_.isEqual(colorMix,colorsDB.red)){
            return colors.red
        } else if(_.isEqual(colorMix,colorsDB.pink)){
            return colors.pink
        } else if(_.isEqual(colorMix,colorsDB.blue)){
            return colors.blue
        } 
    }
}
