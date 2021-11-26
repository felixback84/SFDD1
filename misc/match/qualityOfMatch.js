// ** data
// vendors
const companies = [
    {
        dcHeros:['Batman', 'Superman', 'Cyborg', 'Flash', 'Aquaman'],
        luckyNumbers:[0,1,4,5,7,8,9],
        animals:['cat','dog','rabbit','snake', 'hamster','spider','bird',],
        fruits:['🍋', '🍊', '🍇',],
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
        fruits:['🍎', '🍋', '🍍', '🍐']
    },
    {
        dcHeros:['Flash', 'Aquaman'],
        luckyNumbers:[8,9],
        animals:['bird',],
        fruits:['🍎',]
    }
]

// obj user in move
let bobaFett ={
    dcHeros:["Batman", 'Cyborg'],
    luckyNumbers:[1,5],
    animals:['cat'],
    fruits:['🍎', '🍍']
}

// final qualify
const findMatchValueQuality = async (a,b) => {
    
    // math
    let resultRaw = a / b
    let resultRounded = Math.round(resultRaw)
    
    // print
    console.log(`raw:${resultRaw} - rounded:${resultRounded}`)
    
    // the match could be the number closer to zero
    if(resultRounded === 1 | resultRounded === 2){
        console.log(`one or two  - green:${resultRounded}`)
        return(
            {
                r:76,
                g:175,
                b:80,
                name:"green"
            }
        )
    }else if(resultRounded === 3 | resultRounded === 4){
        console.log(`three or four - yellow:${resultRounded}`)
        return(
            {
                r:255,
                g:235,
                b:59,
                name:"yellow"
            }
        )
    }else if(resultRounded === 5 | resultRounded === 6){
        console.log(`five or six - red:${resultRounded}`)
        return(
            {
                r:244,
                g:67,
                b:54,
                name:"red"
            }
        )
    }else if(resultRounded === 7 | resultRounded === 8){
        console.log(`seven or eight - fucsia:${resultRounded}`)
        return(
            {
                r:233,
                g:30,
                b:99,
                name:"fucsia"
            }
        )
    }else if(resultRounded === 9){
        console.log(`nine - blue:${resultRounded}`)
        return(
            {
                r:33,
                g:150,
                b:243,
                name:"blue"
            }
        )
    }else if(resultRounded > 9){
        console.log("grather than nine")  
        return(
            {
                r:0,
                g:0,
                b:0,
                name:"none"
            }
        )
    } 
}

//** match init */
const initMatchQualify = async () => {
    // underscore
    let _ = require('underscore')

    // loop the results on the array
    for(let i = 0; i < companies.length; i++){
        // counter global of tags 
        let counterFinalTagsDynamics = 0
        // var to hold coincidences
        let coincidences = {}
        // func to check the match
        const checkProfilesStaicsVsDynamics = async (args) => {
            // obj to extract key names
            let keyNames = args.dynamics
            // loop
            for(let key in keyNames){
                // counter init
                let countPerProp = 0
                // checker
                if(keyNames.hasOwnProperty(key)) {
                    // print
                    console.log(`to compare --> statics: ${args.statics[key]} 
                        & dynamic: ${args.dynamics[key]}`
                    )
                    // passing the keys
                    let statics = args.statics[key]
                    let dynamics = args.dynamics[key]
                    // counter for dynamics tags
                    countPerProp += dynamics.length
                    counterFinalTagsDynamics += countPerProp
                    // print
                    console.log({counterFinalTagsDynamics})
                    // isntersector
                    let intersection = _.intersection(statics, dynamics)
                    // check if is empty
                    if(intersection.length != 0){
                        // pass data to var obj
                        coincidences[key] = intersection
                        // print
                        console.log(`coincidences: ${JSON.stringify(coincidences)}`)
                    }
                }
            }
            // return data results
            return coincidences
        }

        // counter tags
        const counterCoincidenceTagsWithStatics = async (objWithTags) => {
            // global counter
            let countFinal = 0
            // loop to count
            for(let coincidenceKey in objWithTags){
                // counter init
                let countPerProp = 0
                // check if are not empty props
                if(objWithTags.hasOwnProperty(coincidenceKey)){ 
                    // check length of c/u props
                    countPerProp += coincidences[coincidenceKey].length
                    // count all props lengths
                    countFinal += countPerProp
                    // print
                    console.log({countPerProp})
                }
            }
            // print
            console.log({countFinal})
            return countFinal
        }

        // data to pass 
        let argz = {
            statics: companies[i],
            dynamics: bobaFett,
        }

        // check it, run it & push it
        let matchDataResults = await checkProfilesStaicsVsDynamics(argz)
        let matchDataResultsAndQualityOfMatch = await counterCoincidenceTagsWithStatics(matchDataResults)
        
        // ** quality match metric
        // run it
        let resultsQualityMatch = await findMatchValueQuality(
            counterFinalTagsDynamics,
            matchDataResultsAndQualityOfMatch
        )
    } 
}

// run it all
initMatchQualify()







