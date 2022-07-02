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

appStatic.use('/static', express.static(path.join(__dirname, 'app')));
const server = http.createServer(appStatic);
const PORT = 8080 || process.env.PORT;
server.listen(PORT, () => console.log(`StaticServer running on port ${PORT}`));

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

/* // Create the server for serving static files (html, css etc.)
  http.createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(8080);  */


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







appStatic.post("/",function(req,res){
    console.log(req.body.cityName);
    console.log("Post request received");
  
    const apiKey = "642b59f7e25207e8d23c497d5f7ad128";
    const city = req.body.cityName;
    const units = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?appid="+ apiKey +"&q="+city+"&units=" +units;
  
    https.get(url,function(response){
      response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const city = weatherData.name;
        const icon = weatherData.weather[0].icon;
        const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<h1> The Temperatur in " +city+  " is: " + temp + " Celcius degree</h1>");
        res.write("<p> How it is felt like: " + description + "</p>");
        res.write("<img src=" + iconURL + ">");
  
        res.send();
      });
    });
  });