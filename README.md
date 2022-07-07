# weather-dashboard

## Description 

## [Deployed Website](https://github.com/microsoft/vscode).

This is an application that implements calling to several apis [Open Weather APIs](https://openweathermap.org/api/) to display weather information. It takes users input, and calls on the first result in their geocode api. We do this becasue the [one call API 1.0] uses the latitude and longitude coordinates and not the input information. This application also stores your last 10 searches locally and displays that information within a sidebar.


## Installation

Clone repository and run on local machine or use deployed link above

## Usage 

There are several ways to use the application. There is a search input or the sidebar search history to display the weatehr information of the citys. Either use the search history or click on one of the list sidebar items. 

How the page looks with a search result and full sidebar history:
![alt text](./assets/images/Screenshot%20.png)


Code snippet of the fetch call to the open weather api. Upon a fullfilled promise, it runs 2 functions
```md
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
```


## Credits

[Stack Overflow](https://stackoverflow.com/)

[W3 Schools](w3schools.com)

[MDN Web Docs](https://developer.mozilla.org/en-US/)

[Open Weather API](https://openweathermap.org/api/one-call-api)

[Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/)

[Moment](https://momentjs.com/)


## License

MIT License