// arr
let userSearch = [12,8,3,5,11,10,7,1,9,13] // total of tags especify by the buyer
let vendorsOffert = [6,3,1,4,7,8,2,1,5,9] // total of tags found per seller

// to divide values and get the closer to zero
const findMatchValueQuality = (listOne, listTwo) => {
    // val default  
    let resultRaw = 0
    listOne.forEach((item,i)=>{
        const divider = (a,b) => {
            resultRaw = a / b
            resultRounded = Math.round(resultRaw)
        }
        divider(item,listTwo[i])
        // print
        console.log(`raw:${resultRaw} - rounded:${resultRounded}`)
        
        // the match could be the number closer to zero
        switch(resultRounded){
            case 1:
                console.log(`one:${resultRounded}`)
                break
            case 2:
                console.log(`two:${resultRounded}`)
                break
            case 3:
                console.log(`three:${resultRounded}`)
                break  
            case 4:
                console.log(`four:${resultRounded}`)
                break
            case 5:
                console.log(`five:${resultRounded}`)
                break
            default:    
                console.log("none value")  
        }
    })
}

// run it
let results = findMatchValueQuality(userSearch,vendorsOffert)


