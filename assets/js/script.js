// My open weather api key
var APIKey = "785f7f0c00b9b5585e2d6893363b0aa5"

var lat 
var lon 

var cityEl = document.querySelector('#city')

//pull geocode data
function getGeocode() {
    var geocode = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`
fetch(geocode)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(city)
    console.log("geocode data")
    console.log(data);
    cityEl.textContent = data[0].name 
    lat = data[0].lat;
    lon = data[0].lon;
    console.log(lat)  
    console.log(lon)
    getWeather()
  })
}

// //pulls one call api
function getWeather(){
  var currentWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
  fetch(currentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        currentEl(data)
        getForecast(data)
    });
  }


var dateEl= document.querySelector('#date')
var temp = document.querySelector('#temp')
var humidity = document.querySelector('#humidity')
var windEl = document.querySelector('#wind')
var uvi = document.querySelector('#uvi')
var currentIcon = document.querySelector('#currentIcon')

//current weather elements
function currentEl(data){
    console.log("current weather")
    console.log(data);
    dateEl.textContent = moment().format("L")
    temp.textContent = "Temperature: " + data.current.temp + "F";
    humidity.textContent = "Humidity: " + data.current.humidity + "%";
    windEl.textContent = "Wind Speed: " + data.current.wind_speed + " MPH";
    uvi.textContent ="UV Index: " + data.current.uvi;
    currentIcon.setAttribute("src", 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '.png')
    currentIcon.setAttribute("alt", 'Current Weather Icon')
}

// 5 day 
function getForecast(data){
    for(let i = 1; i < 6; i++){
      console.log("Day " + i)
      console.log("dt : " + data.daily[i].dt)
      console.log("Date: " + moment(data.daily[i].dt*1000).format('dddd, MMMM Do YYYY, h:mm:ss a'))
      console.log(data.daily[i].weather[0].main)
      console.log("Temp : " + data.daily[i].temp.day)
      console.log("Humidity : " + data.daily[i].humidity)
    }
  }

var searchInput = document.querySelector('#search')
var buttonInput = document.querySelector('button')
var city = ""

buttonInput.addEventListener('click', function(){
    city = searchInput.value
    if(city === ""){
        console.log('input required')
    }
    getGeocode()
} 
)
/*
  - search 
        ok    -user input
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
