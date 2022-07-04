var apikey = "785f7f0c00b9b5585e2d6893363b0aa5"

// var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=' + apiKey;

// var latLonURL = 'http://api.openweathermap.org/geo/1.0/direct?q=${City}&appid=${key}'

var sample = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=" + apikey;

fetch(sample)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
