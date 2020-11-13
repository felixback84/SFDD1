let array = [1,1,2,2,2,2,3,3,3,4,3,5,5,6,6,6,6,7,8,8,9,9,9,9,9,9,9,9]
let unos = 0, dos= 0, tres= 0, cuatro= 0, cinco= 0, seis= 0, siete= 0, ocho= 0, nueve= 0

for(let i = 0; i < array.length; i++){

    if(array[i] == 1){
        unos ++
    }else if (array[i] == 2){
        dos ++
    }else if (array[i] == 3){
        tres ++
    }else if (array[i] == 4){
        cuatro ++
    }else if (array[i] == 5){
        cinco ++
    }else if (array[i] == 6){
        seis ++
    }else if (array[i] == 7){
        siete ++
    }else if (array[i] == 8){
        ocho ++
    }else if (array[i] == 9){
        nueve ++
    }
}

console.log(unos, dos, tres, cuatro, cinco, seis, siete, ocho, nueve)
