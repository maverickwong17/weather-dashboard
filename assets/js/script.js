// My open weather api key
var APIKey = "785f7f0c00b9b5585e2d6893363b0aa5"

var searchInput = document.querySelector('#search')
var buttonInput = document.querySelector('button')
var city = ""

buttonInput.addEventListener('click', function(){
    console.log("click")
    city = searchInput.value
    console.log(city)
    getGeocode()
} 
)


var lat 
var lon 

function getGeocode() {
    var geocode = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`
fetch(geocode)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(city)
    console.log(geocode)
    console.log("geocode data")
    console.log(data);
    lat = data[0].lat;
    lon = data[0].lon;
    console.log(lat)  
    console.log(lon)
    getWeather()
  })
}

// //pulls current temp, humidity, windspeed, uv index
function getWeather(){
  var currentWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
  fetch(currentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("current weather")
      console.log(data);
      console.log("temp : " + data.current.temp);
      console.log("humidity : " + data.current.humidity)
      console.log("windspeed : " + data.current.wind_speed)
      console.log("uvindex : " + data.current.uvi)
      console.log("Weather : " + data.current.weather[0].main)
      getForecast(data)
    });
  }

// 5 day 
function getForecast(data){
  for(let i = 1; i < 6; i++){
    console.log("Day " + i)
    console.log("dt : " + data.daily[i].dt)
    console.log("Date: " + moment(data.daily[i].dt).format('dddd, MMMM Do YYYY, h:mm:ss a'))
    console.log(data.daily[i].weather[0].main)
    console.log("Temp : " + data.daily[i].temp.day)
    console.log("Humidity : " + data.daily[i].humidity)
  }
}


/*
  - search 
        -user input
        -show history
        -add to history
    - current city , name date, icon for weather conditions
        ok    -temp
        ok    -humidity
        ok    -wind speed
        ok    -UV index  - color coded
    - 5 day forecast for current city
            -date
            -icon for weather conditions
            -temp
            -humidity
*/
