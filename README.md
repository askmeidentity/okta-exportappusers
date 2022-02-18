# Okta-ExportAppUsers

## Introduction
This utility script helps you to export all apps assigned to users in Okta. This requires you to generate a list of users with their okta user id (GUID) using APIs or browser plugin like [rockstar](https://chrome.google.com/webstore/detail/rockstar/chjepkekmhealpjipcggnfepkkfeimbd)

### Steps
1. Install Rockstar Okta browser plugin
2. Go to Directory -> People and export all users (you can use filters). Please make sure you export 'User Id'
3. Rename your output csv Okta id column to 'User Id'. If its already the same please ignore.
4. Import the module in your nodejs project and call the associated functions.

### Sample CSV
|User Id|Status|Username|First name|Last name|Primary email|Title|
|-------|------|--------|----------|---------|-------------|-----|
|00u114....|PROVISIONED|someone@gmail.com|Someone|Something|someone@gmail.com|Helpdesk admin|

### How to implement
```
const exportappusers = require('okta-exportappusers')
exportappusers.getAppsAssignedToUsers({
    fileName:'sample.csv',
    sleep: 1000,
    subdomain: "myoktasubdomain",
    apiKey: "myapikey",
    logFileName: "output.log"
});
```
### Different arguments available to functions
You will need to specify these arguments to make the function call.

|Parameter|Example Value|Description|
|---------|-------------|-----------|
|fileName|sample.csv|File name which contains all Okta users (eg. Exported from Rockstar)|
|sleep|1000|Time in ms to wait before consecutive API calls to control rate limit|
|subdomain|sampledomain|Your Okta domain. For example if your okta tenant is mytenant.okta.com please use 'mytenant' as subdomain|
|apiKey|your api key|Please generate API Key from your Okta tenant to run scripts|
|logFileName|output.log|Name of the output file to be generated|

### Output Sample
|user id|Application|
|--------------------|---------------------|
|00u11......|Facebook|
|00u11....|Twitter|
