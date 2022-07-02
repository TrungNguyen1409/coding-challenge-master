// jshint esversion: 6
const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');


const fs = require('fs');
const http = require('http');

const nodestatic = require('node-static');
const randopeep = require('randopeep'); // using to generate new random, fake data


const app = express();
var file = new nodestatic.Server('../app');


// enable CORS to allow requests from frontend
app.use(cors()); 

// register handler to return driver data
app.get('/', function (req, res) {
    fs.readFile('./index.get.json', 'utf8' , (err, data) => {
        res.send(data);
    });
});


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


// Create the server for serving static files (html, css etc.)
http.createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(8080);

// Start the REST API server
app.listen(3000, function() {
    console.log(`API Server is running`)
});