const megaFunc = datasets.map((dataset) => {
    // first process
    let activeTimesRecord = dayjs(dataset.createdAt).fromNow();

    // second process
    // to hold equal dates
    let valuesAlreadySeen = [];
    // loop
    for (let i = 0; i < activeTimesRecord.length; i++) {
        let value = activeTimesRecord[i]
        if (valuesAlreadySeen.indexOf(value) !== -1) {
            return true
        }
        valuesAlreadySeen.push(value);
    }
    // count the result of equal values
    let counter = valuesAlreadySeen.length
    // return obj
    return {
        activeTimesRecord,
        counter
    }
})