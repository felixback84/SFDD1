// day.js
dayjs.extend(relativeTime);

// state from props for dataSets
const { 
    datasets
} = this.props;

// mapping and pick equal dates of actives
let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);

// mapping and pick data from dataSets in userDevice
const mappingDataDatesEachDay = datasets.map((dataset) => {
        let activeTimesRecord = dayjs(dataset.createdAt).fromNow();
            // return result
            return activeTimesRecord;
    }
);

const uniques = [...new Set(findDuplicates(mappingDataDatesEachDay))];
const counter = findDuplicates(mappingDataDatesEachDay);
// print array of active dates
console.log(`Result from dates uniques: ${uniques}`);
// print 
console.log(`Result from function findDuplicates(): ${counter}`) // All duplicates