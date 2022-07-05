// jshint esversion: 6
const express = require('express');
const cors = require('cors');
const path = require('path');
const { uuid } = require('uuidv4');
const bodyParser = require("body-parser");

const fs = require('fs');
const https = require('https');
const http = require('http');


const nodestatic = require('node-static');
const randopeep = require('randopeep'); // using to generate new random, fake data

const app = express();
const appStatic = express();
//var file = new nodestatic.Server('../app');

appStatic.use('/', express.static('../app'))


//const server = http.createServer(appStatic);
const PORT = 8080 || process.env.PORT;
appStatic.listen(PORT, () => console.log(`StaticServer running on port ${PORT}`));

 appStatic.get("/",function(req,res){

    res.sendFile("/Users/trungnguyen/Desktop/coding-challenge-master/app/index.html");
   
   }); 

// enable CORS to allow requests from frontend
app.use(cors()); 
appStatic.use(bodyParser.urlencoded({extended: true}));


fs.writeFileSync("./index.get.json", '[]');
for (let driver = 0; driver < 21; driver++){ 
    getRenterData(); 
}

function getRenterData() {
    var userData = JSON.parse(fs.readFileSync('./index.get.json', 'utf8'));
    var driver = {
        driverID: uuid(),
        driverName: randopeep.name(),
        driverCityOrigin: randopeep.address.city(),
        "driverLanguage": ['de', 'en', 'nl', 'fr', 'es', 'ar'][Math.floor(Math.random()*7)],
        driverPhone: randopeep.address.phone(),
        "driverGender": ['male', 'female'][Math.floor(Math.random()*2)],
        driverInfo: randopeep.corporate.catchPhrase(0),
        carMake: randopeep.corporate.name('large', 0),
        "kmDriven": Math.floor(Math.random() * 100000),
        'location': randopeep.address.geo() // this informtion could be used to get user's location
    };
    userData.push(driver);
    fs.writeFileSync("./index.get.json", JSON.stringify(userData));
}

//TODO: Move driver to different location randomly every 5 seconds
function moveDriverLocation(){

}

// register handler to return driver data
app.get('/', function (req, res) {
    fs.readFile('./index.get.json', 'utf8' , (err, data) => {
        res.send(data);
    });
});
// Start the REST API server
app.listen(3000, function() {
    console.log(`API Server is running`)
});



