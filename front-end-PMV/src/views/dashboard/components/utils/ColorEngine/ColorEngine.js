// mui
import { green, yellow, red, pink, blue } from '@material-ui/core/colors';
// underscore
let _ = require('underscore');

export default class ColorEngine {

    constructor(colorValue,meters){
        this.colorValue = colorValue
        this.meters = meters
    }

    // return color MUI mix with meters range given
    colorMuiMix(meters){
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

    // return hex values with meters given
    metersToColorHex(meters){
        // check ranges
        if(meters >= 0 && meters <= 5){
            let colorObj = {
                colorValue:{r:76,g:175,b:80}, 
                colorName:"green", 
                colorMix:green[500],
                hex:"#4CAF50"
            }
            console.log("hi from meters range match: 0-5");
            return colorObj.hex
        } else if (meters >= 5.1 && meters <= 10){
            let colorObj = {
                colorValue:{r:255,g:235,b:59}, 
                colorName:"yellow", 
                colorMix: yellow[500],
                hex:"#FFEB3B"
            }
            console.log("hi from meters range match: 5-10");
            return colorObj.hex
        } else if (meters >= 10.1 && meters <= 15){
            let colorObj = {
                colorValue:{r:244,g:67,b:54}, 
                colorName:"red", 
                colorMix:red[500],
                hex:"#F44336"
            }
            console.log("hi from meters range match: 10-15");
            return colorObj.hex
        } else if (meters >= 15.1 && meters <= 20){
            let colorObj = {
                colorValue:{r:233,g:30,b:99}, 
                colorName:"fucsia", 
                colorMix: pink[500],
                hex:"#E91E5A"
            }
            console.log("hi from meters range match: 15-20");
            return colorObj.hex
        } else if (meters >= 20.1 && meters <= 25){
            let colorObj = {
                colorValue:{r:33,g:150,b:243}, 
                colorName:"blue", 
                colorMix: blue[500],
                hex:"#2196F3"
            }
            console.log("hi from meters range match: 20-25");
            return colorObj.hex
        } 
    }
    
    // return MUI mix with RGB values given
    colorPicker(colorValue){
    
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
            green:green[500],
            yellow:yellow[500],
            red:red[500],
            pink:pink[500],
            blue:blue[500]
        }
    
        // check
        if(_.isEqual(colorValue,colorsDB.green)){
            console.log("green")
            return colors.green
        } else if(_.isEqual(colorValue,colorsDB.yellow)){
            console.log("yellow")
            return colors.yellow
        } else if(_.isEqual(colorValue,colorsDB.red)){
            console.log("red")
            return colors.red
        } else if(_.isEqual(colorValue,colorsDB.pink)){
            console.log("pink")
            return colors.pink
        } else if(_.isEqual(colorValue,colorsDB.blue)){
            console.log("blue")
            return colors.blue
        } 
    }

    // return hex with rgb values given
    rgbToColorHex(colorValue){
    
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
            green:"#4CAF50",
            yellow:"#FFEB3B",
            red:"#F44336",
            pink:"#E91E5A",
            blue:"#2196F3"
        }
    
        // check
        if(_.isEqual(colorValue,colorsDB.green)){
            console.log("green")
            return colors.green
        } else if(_.isEqual(colorValue,colorsDB.yellow)){
            console.log("yellow")
            return colors.yellow
        } else if(_.isEqual(colorValue,colorsDB.red)){
            console.log("red")
            return colors.red
        } else if(_.isEqual(colorValue,colorsDB.pink)){
            console.log("pink")
            return colors.pink
        } else if(_.isEqual(colorValue,colorsDB.blue)){
            console.log("blue")
            return colors.blue
        } 
    }
}

