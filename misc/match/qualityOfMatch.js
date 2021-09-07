// underscore
let _ = require('underscore')

// vendors
const company = [{
    dcHeros:['Batman', 'Superman', 'Cyborg', 'Flash', 'Aquaman'],
    luckyNumbers:[0,1,4,5,7,8,9],
    animals:['cat','dog','rabbit','snake', 'hamster','spider','bird',],
    fruits:['🍋', '🍊', '🍇', ]
},
{
    dcHeros:['Batman', 'Superman', 'Flash', 'Aquaman'],
    luckyNumbers:[0,1,2,3,4,8,9],
    animals:['cat','dog','rabbit','snake', 'hamster',],
    fruits:['🍎', '🍋', '🍊', '🍇', '🍍', '🍐']
},
{
    dcHeros:['Batman', 'Superman', 'Cyborg', 'Flash', 'Aquaman'],
    luckyNumbers:[2,3,4,5,7,8,9],
    animals:['cat','dog','rabbit','snake', 'hamster','bird',],
    fruits:['🍎', '🍋', , '🍍', '🍐']
}]

// obj user in move
let bobaFett ={
    dcHeros:["Batman", 'Cyborg'],
    luckyNumbers:[1,5],
    animals:['cat'],
    fruits:['🍎', '🍍']
}

// loop the results on the array
for(let i = 0; i < company.length; i++){
    // var to hold coincidences
    let coincidences = {}
    // func to check the match
    function checkProfilesStaicsVsDynamics(args){
        // obj to extract key names
        let keyNames = args.dynamics
        // loop
        for (let key in keyNames) {
            if (keyNames.hasOwnProperty(key)) {                
                // passing the keys
                let statics = args.statics[key]
                let dynamics = args.dynamics[key]
                // intersectotion
                let intersection = _.intersection(statics, dynamics)
                // check if is empty
                if(intersection.length != 0){
                    // pass data to var obj
                    coincidences[key] = intersection
                }
            }
        } 
        // print
        console.log({coincidences})
        // return data results
        return coincidences
    }

    // counter tags
    function counterAllTags(objWithTags){
        let countFinal = 0
        // loop to count
        for (let coincidenceKey in objWithTags) {
            // counter init
            let countPerProp = 0
            // check if are not empty props
            if(objWithTags.hasOwnProperty(coincidenceKey)){ 
                // check length of c/u props
                countPerProp =+ coincidences[coincidenceKey].length
                // count all props lengths
                countFinal += countPerProp
                // print
                console.log({countPerProp})
            }
        }
        console.log({countFinal})
    }
    
    // data to pass 
    let argz = {
        statics: company[i],
        dynamics: bobaFett,
    }
    // run it 
    counterAllTags(checkProfilesStaicsVsDynamics(argz))
}



