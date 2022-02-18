var fs = require('fs'); 
var parse = require('csv-parse');
var axios = require('axios');

const getAppsAssignedToUsers = (object) => {
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var csvData=[];
fs.createReadStream(object.fileName)
    .pipe(parse.parse({delimiter: ',',columns:true}))
    .on('data', function(csvrow) {
        csvData.push(csvrow);        
    })
    .on('end', async function() {
      console.log(csvData[0]['User Id']);

      for(let i=0; i<2; i++){
        await sleep(object.sleep);
        var config = {
            method: 'get',
            url: `https://${object.subdomain}.okta.com/api/v1/apps?filter=user.id+eq+"${csvData[i]['User Id']}"`,
            headers: { 
              'Accept': 'application/json', 
              'Content-Type': 'application/json', 
              'Authorization': `SSWS ${object.apiKey}`
            }
        };
        
        await axios(config)
        .then(function (response) {
        if(response.data.length>0){
            response.data.forEach(element => {
                let $logMsg = `${csvData[i]['User Id']},${element.label}`
                console.log($logMsg);
                let log = fs.createWriteStream(object.logFileName, { flags: 'a' });
                log.write(`${$logMsg}\n`);
                log.close()
            });
        }else{
            let $logMsg = `${csvData[i]['User Id']},"No app"`
            console.log($logMsg);
            let log = fs.createWriteStream(object.logFileName, { flags: 'a' });
            log.write(`${$logMsg}\n`);
            log.close() 
        }
        })
        .catch(function (error) {
        console.log(error);
        });
        }
    });
}

module.exports = getAppsAssignedToUsers;