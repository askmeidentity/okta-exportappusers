const getAppsAssignedToUsers = require('./getAppsAssignedToUsers')
getAppsAssignedToUsers({
    fileName:'sample.csv',
    sleep: 2000,
    subdomain: "myoktasubdomain",
    apiKey: "myapikey",
    logFileName: "output.log"
});