//Lets require import the FS module
var fs = require('fs');

// Express is our web framework for building a rest API
var express = require('express');
var  app = express();
var cors = require('cors');
app.use(cors()); // enable CORS to allow requests from frontend

var nodestatic = require('node-static');

// register handler to return driver data
app.get('/', function (req, res) {
    fs.readFile('./index.get.json', 'utf8' , (err, data) => {
        res.send(data);
    });
});

var randopeep = require('randopeep');
/*
* randopeep is for generating stuff that we can include in our fake data.
* */

var file = new nodestatic.Server('../app');

fs.writeFileSync("./index.get.json", '[]');

//Generate 10 objects to work with in the backend for the front end

genobj(); genobj(); genobj(); genobj(); genobj();
genobj(); genobj(); genobj(); genobj(); genobj();
genobj(); genobj(); genobj(); genobj(); genobj();
genobj(); genobj(); genobj(); genobj(); genobj();

function genobj() {
    var o = JSON.parse(fs.readFileSync('./index.get.json', 'utf8'));
    var d = {
        driverName: randopeep.name(),
        driverCityOrigin: randopeep.address.city(),
        "driverLanguage": ['de', 'en', 'nl', 'fr', 'es', 'ar'][Math.floor(Math.random()*7)],
        driverPhone: randopeep.address.phone(),
        "driverGender": ['male', 'female'][Math.floor(Math.random()*2)],
        driverInfo: randopeep.corporate.catchPhrase(0),
        carMake: randopeep.corporate.name('large', 0),
        "kmDriven": Math.floor(Math.random() * 100000),
        'location': randopeep.address.geo()
    };
    o.push(d);
    fs.writeFileSync("./index.get.json", JSON.stringify(o));
}

//TODO: Move driver to different location randomly every 5 seconds

var http = require('http');
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