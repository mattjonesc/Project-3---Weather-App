// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;


const server = app.listen(port, listening);
// callback function to show the server is running
 function listening(){
    console.log(`running on localhost: ${port}`);
  };

//Return Endpoint Data
//GET Route I: Server Side
app.get('/all', getData)

function getData(req,res){
    res.send(projectData)
    console.log(projectData)
}

app.post('/addWeather', addWeather);

//POST Route
//Client side
function addWeather(req,res){
  console.log(req.body)
  newEntry = {
    temp: req.body.temp,
    feel: req.body.feel,
    date: req.body.date,
    city: req.body.city
  }

  projectData.push(newEntry)
  res.send(projectData)
  console.log(projectData)
}