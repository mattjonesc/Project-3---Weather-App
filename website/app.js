/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=23abe556d12b81861a4dd18bec071de8&units=imperial';
const url = 'https://api.openweathermap.org/data/2.5/weather?zip='

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const v_zip =  document.getElementById('zip').value;

  getWeather(url+v_zip+apiKey)
  // New Syntax!
  .then(function(data){
    // Add data
    console.log(data);
    postData('/addWeather', {temp:data.main.temp, feel:data.main.feels_like, date:newDate, city:data.name} );
    retrieveData()
  })
}

//Return Endpoint Data
//GET Route II: Client Side
const getWeather = async (url) =>{
    const res = await fetch(url)
    try {
      const data = await res.json();
      console.log(data);
      return data;
    } catch(error) {
      console.log("error",error);
    }
  }

//POST Route
//Client-side 
const postData = async (url = '', data = {})=>{
    const response = await fetch(url,{
    method: 'POST',
    credentials: 'same-origin',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
});

    try {
    const newData = await response.json();
    console.log('newData:');
    console.log(newData);
    return newData
    }catch(error) {
    console.log("error", error);
    }
}

const retrieveData = async () =>{
  const request = await fetch('/all');
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log('allData:');
  console.log(allData);
  const v_max_ind = allData.length - 1 ;
  console.log("Max Index: " + v_max_ind);
  // Write updated data to DOM elements
  document.getElementById('temp').innerHTML = 'The current tempature in ' + allData[v_max_ind].city + ' is ' + Math.round(allData[v_max_ind].temp) + ' degrees';
  document.getElementById('content').innerHTML = 'It currently feels like ' + Math.round(allData[v_max_ind].feel) + ' degrees';
  document.getElementById('date').innerHTML = "Today's date is " + allData[v_max_ind].date;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
 }