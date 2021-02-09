// color obj to compare

const colorPicker = () => {
    const pinks = {
        r:233,g:30,b:99
    }
    
    const pinks1 = {
        r:233,g:30,b:99
    }

    const pinks2 = {
        r:23,g:3,b:9
    }
    
    // switch
    // switch (pinks) {
    //     case pinks1 === pinks:
    //         // print
    //         console.log(`colorValue: color.pink1`);
    //         //return colors.pink
    //         break;
    //     case pinks2 === pinks:
    //         // print
    //         console.log(`colorValue: color.pink2`);
    //         //return colors.pink
    //         break;    
    //     default:
    //         break;
    // }

    obj1 = JSON.stringify(pinks);
    obj2 = JSON.stringify(pinks1);

    console.log(pinks === pinks1)   

    if((obj1 === obj2)){
        console.log(`true`);
    } else {
        console.log('false')
    }
}

colorPicker()

