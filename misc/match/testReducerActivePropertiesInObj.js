const objt = {
    arr0:[0.1,0.2,0.3],
    arr1:[1.1,1.2,1.3],
    arr2:[2.1,2.2,2.3],
    arr3:[3.1,3.2,3.3],
}

// const printValues = (values) => {
//     values.map((value)=>{
//         console.log(`values:${value}`)
//         return value
//     })
// }

const test = async (obj) => {
    let resultKeys = {}
    for(let item in obj){
        if(obj.hasOwnProperty(item)){
            resultKeys[item] = obj[item]
            // printValues(obj[item])
        }
    }
    console.log(`result:${JSON.stringify(resultKeys)}`)
}
test(objt)
