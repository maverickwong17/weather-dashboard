// My open weather api key
var APIKey = "785f7f0c00b9b5585e2d6893363b0aa5"


var cityEl = document.querySelector('#city')

var searchInput = document.querySelector('#search')
var buttonInput = document.querySelector('button')
var city = ""

//on click of search
buttonInput.addEventListener('click', function(){
    city = searchInput.value
    if(city === ""){
        console.log('input required')
        return
    }
    getGeocode(city)
} 
)

//on click of history search
var historyEl = document.querySelector('#history')
historyEl.addEventListener('click', function(event){
    var element = event.target
    if (element.matches("li")){
        var selected = (element.innerHTML)
        getGeocode(selected)
    }
})

// on page startup
function init(){
    generateHistory()
}
init()

var lat 
var lon 
//pull geocode data
function getGeocode(input) {
    var geocode = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${APIKey}`
    fetch(geocode)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        cityEl.textContent = data[0].name 
        lat = data[0].lat;
        lon = data[0].lon;
        createHistory(data[0].name)
        getWeather()    
    })
}


//generate list of history
function generateHistory(){
    var inputArr = [] 
    inputArr = JSON.parse(localStorage.getItem("inputArr"))
    document.getElementById("history").innerHTML = "";
    if (inputArr === null){
    }else{
    var history = document.querySelector('#history')
        for(let j = 0; j < inputArr.length; j++){
            var cityItem = document.createElement('li')
            cityItem.textContent = inputArr[j]
            cityItem.setAttribute("class", 'list-group-item')
            history.appendChild(cityItem)
        }
    }}

//create history list
function createHistory(input){
    var inputArr = []
    inputArr = JSON.parse(localStorage.getItem("inputArr"))
    if(inputArr == null){
    inputArr = [] 
    }
    if (!(inputArr.includes(input))){
        inputArr.push(input)
        if(inputArr.length > 10){
            inputArr.shift()
        }
    }
    console.log(inputArr)
    localStorage.setItem("inputArr", JSON.stringify(inputArr))
    generateHistory()
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
    dateEl.textContent = moment().format("L")
    temp.textContent = "Temperature: " + data.current.temp + "F";
    humidity.textContent = "Humidity: " + data.current.humidity + "%";
    windEl.textContent = "Wind Speed: " + data.current.wind_speed + " MPH";
    currentIcon.setAttribute("src", 'https://openweathermap.org/img/wn/' + data.current.weather[0].icon + '.png')
    currentIcon.setAttribute("alt", 'Current Weather Icon')
    uvi.innerHTML ="UV Index: " + "<span>" + data.current.uvi + "</span>";
    if (data.current.uvi <= 2){
        uvi.setAttribute("id", "low")
    }else if (data.current.uvi <= 5 && data.current.uvi > 2){
        uvi.setAttribute("id", "moderate")
    }else if (data.current.uvi <= 7 && data.current.uvi > 5){
        uvi.setAttribute("id", "high")
    }else if (data.current.uvi <= 10 && data.current.uvi > 7){
        uvi.setAttribute("id", "very-high") 
    }else if (data.current.uvi > 10){
        uvi.setAttribute("id", "extreme")
    }
}

var fiveDay = document.querySelector('#five-day')
// 5 day forecast
function getForecast(data){
    while (fiveDay.hasChildNodes()) {
        fiveDay.removeChild(fiveDay.firstChild);
      }
    for(let i = 1; i < 6; i++){
        //card
        var cardDiv = document.createElement("div")
        cardDiv.setAttribute("class", 'card mr-1 p-2 bg-primary text-light')
        cardDiv.setAttribute("style", 'width: 10rem')
        //card-body
        // var cardBody = document.createElement("div")
        // cardBody.setAttribute('class', "card-body")
        //card-title - Date
        var cardTitle = document.createElement("h5")
        cardTitle.setAttribute("class", "card-title")
        cardTitle.textContent = moment(data.daily[i].dt*1000).format("M/D")
        //icon
        var cardIcon = document.createElement("img")
        cardIcon.setAttribute("src", 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '.png')
        currentIcon.setAttribute("alt", 'Weather Icon ' + i)
        //Temp
        var cardTemp = document.createElement('p')
        cardTemp.setAttribute('class','card-text')
        cardTemp.textContent = "Temp: " + data.daily[i].temp.day
        //Humidity
        var cardHumid = document.createElement('p')
        cardHumid.setAttribute('class','card-text')
        cardHumid.textContent = "Humidity : " + data.daily[i].humidity + '%'
        //append all bootstrap elements
        fiveDay.appendChild(cardDiv)
        // cardDiv.appendChild(cardBody)
        cardDiv.appendChild(cardTitle)
        cardDiv.appendChild(cardIcon)
        cardDiv.appendChild(cardTemp)
        cardDiv.appendChild(cardHumid)
    }
  }
