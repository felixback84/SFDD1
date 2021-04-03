// conditionals
let conditionals = {
    boolean:false, 
    string:"modeThree"
}

function obj(data){
    if(data.string === "modeOne"){
        let values = {
            dcHeros:['Batman', 'Superman', 'Cyborg', 'Flash', 'Aquaman'],
            luckyNumbers:[0,1,2,3,4,5,7,8,9],
            animals:['cat','dog','rabbit','snake','hamster','spider','bird'],
            fruits:['🍎', '🍋', '🍊', '🍇', '🍍', '🍐'],
        }
        console.table(values)
        return values
    } else if(data.string === "modeTwo"){
        let values = {
            dcHeros:['Batman', 'Superman', 'Cyborg', 'Flash', 'Aquaman'],
            luckyNumbers:[0,1,2,3,4,5,7,8,9],
            fruits:['🍎', '🍋', '🍊', '🍇', '🍍', '🍐'],
        }
        console.table(values)
        return values
    } else if(data.string === "modeThree"){
        let values = {
            dcHeros:['Batman', 'Superman', 'Cyborg', 'Flash', 'Aquaman'],
            luckyNumbers:[0,1,2,3,4,5,7,8,9],
            animals:['cat','dog','rabbit','snake','hamster','spider','bird'],
            numbers:[0.1,1.2,2.3,3.4,4.5,5.6,6.7,7.8,8.9,9]
        }
        console.table(values)
        return values
    }
}
// run it
obj(conditionals)
    
    



