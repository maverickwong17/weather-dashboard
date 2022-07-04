// My open weather api key
var APIKey = "785f7f0c00b9b5585e2d6893363b0aa5"

var city = 'London';
//todo take input from user

var geocode = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=' + APIKey

var lat 
var lon 

function getGeocode() {
fetch(geocode)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("geocode data")
    console.log(data);
    lat = data[0].lat
    lon = data[0].lon
    console.log(lat)  
    console.log(lon)
    getCurrent()
    getForecast()
  })
}

// //pulls current temp, humidity, windspeed, uv index
function getCurrent(){
  var currentWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon='+ lon +/*'&exclude={part}'*/'&appid=' + APIKey
  fetch(currentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("current weather")
      console.log(data);

    });
  }

// 5 day 
function getForecast(){
  var fiveDay = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid='+ APIKey
  fetch(fiveDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("5 day forecast")
      console.log(data);
    });
}



/*
  - search 
        -show history
        -add to history
    - current city , name date, icon for weather conditions
            -temp
            -humidity
            -wind speed
            -UV index  - color coded
    - 5 day forecast for current city
            -date
            -icon for weather conditions
            -temp
            -humidity
*/
function init(){
  getGeocode()
}
init()