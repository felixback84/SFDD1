const usersData = [{"userHandle":"titaja","type":"static","email":"titaja@gmail.com"},
{"userHandle":"catalae","type":"dynamic","email":"catalae@gmail.com"},
{"userHandle":"bibidise","type":"dynamic","email":"bibidise@gmail.com"},
{"userHandle":"infoIdiot","type":"static","email":"info@gmail.com"},
{"userHandle":"julyrolo","type":"dynamic","email":"julyrolo@gmail.com"},
{"userHandle":"ctoIdiot","type":"static","email":"cto@gmail.com"},
{"userHandle":"worksIdiot","type":"static","email":"works@gmail.com"},
{"userHandle":"garciala","type":"dynamic","email":"garciala@gmail.com"},
{"userHandle":"importantIdiot","type":"static","email":"important@gmail.com"},
{"userHandle":"ceoIdiot","type":"static","email":"ceo@gmail.com"},
{"userHandle":"lmfstock","type":"static","email":"lmfstock@gmail.com"},
{"userHandle":"searchIdiot","type":"static","email":"search@gmail.com"},
{"userHandle":"dataIdiot","type":"static","email":"data@gmail.com"}]

const top5Coords = [{"initialMatches":{"dcHeros":["Flash"],"fruits":["melon"],"pets":["cat"]},"coords":{"lat":4.635157,"lon":-74.070602,"nameOfPoint":"bibidisePosition"},"thingId":"bibidise-staticHeartbeat-2WUdDyX4NdeZrBt0deYC"},
{"initialMatches":{"fruits":["watermelon"]},"coords":{"lat":4.635005,"nameOfPoint":"garcialaPosition","lon":-74.070752},"thingId":"garciala-staticHeartbeat-958MuU7EdvyC4yX8WhLB"},
{"initialMatches":{"luckyNumbers":[21]},"coords":{"lat":4.63466,"lon":-74.070747,"nameOfPoint":"ctoIdiotPosition"},"thingId":"ctoIdiot-staticHeartbeat-9TQ3jPMiKU2GTxr3ywaq"},
{"initialMatches":{"pets":["fox"]},"coords":{"nameOfPoint":"searchIdiotPosition","lon":-74.070573,"lat":4.634489},"thingId":"searchIdiot-staticHeartbeat-AGNz26lv8q4SSWuNWeJL"},
{"initialMatches":{"dcHeros":["Flash"],"pets":["cat"]},"coords":{"lat":4.635131,"lon":-74.070337,"nameOfPoint":"julyroloPosition"},"thingId":"julyrolo-staticHeartbeat-Hgj2qQRqj58KOSHZpEag"},
{"initialMatches":{"fruits":["watermelon"],"pets":["cat","fox"]},"coords":{"nameOfPoint":"worksIdiotPosition","lon":-74.070406,"lat":4.634641},"thingId":"worksIdiot-staticHeartbeat-PDd834YOogSxu99axgqw"},
{"initialMatches":{"luckyNumbers":[1],"pets":["cat"]},"coords":{"lon":-74.070221,"lat":4.634837,"nameOfPoint":"lmfStockPosition"},"thingId":"lmfstock-staticHeartbeat-Q9nEDwKwXgtPpBlRfhb5"},
{"initialMatches":{"dcHeros":["Flash"],"luckyNumbers":[15],"pets":["cat"]},"coords":{"lon":-74.070106,"lat":4.634997,"nameOfPoint":"dataIdiotPosition"},"thingId":"dataIdiot-staticHeartbeat-Qv0lkc2XtEkyQqIWn4wk"},
{"initialMatches":{"dcHeros":["Flash"],"luckyNumbers":[1]},"coords":{"lon":-74.07002,"lat":4.635139,"nameOfPoint":"infoIdiotPosition"},"thingId":"infoIdiot-staticHeartbeat-inzHPHFQUYz2MsBQN26z"},
{"initialMatches":{"luckyNumbers":[1,21]},"coords":{"lon":-74.070205,"nameOfPoint":"ceoIdiotPosition","lat":4.635278},"thingId":"ceoIdiot-staticHeartbeat-szjNYHOImXDiHUHxX9Sb"},
{"initialMatches":{"dcHeros":["Flash"],"fruits":["melon"],"pets":["cat"]},"coords":{"lon":-74.070417,"nameOfPoint":"titajaPosition","lat":4.635385},"thingId":"titaja-staticHeartbeat-v3tlzUte4fmK6GCG0Nl9"},
{"initialMatches":{"fruits":["melon"],"luckyNumbers":[21],"pets":["fox"]},"coords":{"lon":-74.070578,"lat":4.634855,"nameOfPoint":"catalaePosition"},"thingId":"catalae-staticHeartbeat-yJJVeTchFDsWE9fIazfr"},
{"initialMatches":{"fruits":["watermelon"]},"coords":{"nameOfPoint":"importantIdiotPosition","lon":-74.070516,"lat":4.635275},"thingId":"importantIdiot-staticHeartbeat-zJmAt6u03hXO5aTjD97f"}]

// var to hold userHandle
let userHandle = "";
top5Coords.forEach((top5Coord,index)=>{
    // userHandle
    userHandle = top5Coord.thingId.split("-").slice(0,1).toString();
    // second obj loop
    usersData.forEach((userData,index)=>{
        if(userHandle == userData.userHandle){
            top5Coord.dataRes = userData
        }
    })
    console.log(top5Coords);
})
