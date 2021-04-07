// api urls:
// london: http://api.openweathermap.org/data/2.5/weather?q=london,gb&appid=7a477fc97ce6ec662b6caf75ca1cc2b3&units=metric
// birmingham: http://api.openweathermap.org/data/2.5/weather?q=birmingham,gb&appid=7a477fc97ce6ec662b6caf75ca1cc2b3&units=metric
// manchester: http://api.openweathermap.org/data/2.5/weather?q=manchester,gb&appid=7a477fc97ce6ec662b6caf75ca1cc2b3&units=metric
// liverpool: http://api.openweathermap.org/data/2.5/weather?q=liverpool,gb&appid=7a477fc97ce6ec662b6caf75ca1cc2b3&units=metric
// bristol: http://api.openweathermap.org/data/2.5/weather?q=bristol,gb&appid=7a477fc97ce6ec662b6caf75ca1cc2b3&units=metric

const renderCities = (citiesFromLocalStorage) => {
  // For each city construct a list item and append to the list group
};

const getCurrentData = (opeApiData) => {
  let cityName = "Manchester";
  function getCurrentData(cityName) {
    var key = "7a477fc97ce6ec662b6caf75ca1cc2b3";
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=" +
        key
    )
      .then(function (resp) {
        return resp.json();
      }) // Convert data to json
      .then(function (data) {
        console.log(data);
      })
      .catch(function () {
        // catch any errors
      });
  }

  window.onload = function () {
    getCurrentData("Manchester");
  };
  // from object extract the data points you need for the return data
  return {
    name: "",
    date: "",
    iconURL: "",
    temperature: "",
    humidity: "",
    windSpeed: "",
    uvIndex: 0,
  };
};

const getForecastData = (opeApiData) => {
  // iterate and construct the return data array
  return [
    {
      date: "",
      iconURL: "",
      temperature: "",
      humidity: "",
    },
  ];
};

const renderCurrentCardComponent = (currentData) => {
  // from current data build the current card component
};

const renderForecastCardComponent = (forecastData) => {
  // from current data build the current card component
};

// Fetch Current Weather API Function is working but not yet dynamic, from search input on form
let cityName = "London";
function getCurrentWeather(cityName) {
  const key = "7a477fc97ce6ec662b6caf75ca1cc2b3";
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      key +
      "&units=metric"
  )
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      console.log(data);
    })
    .catch(function () {
      // catch any errors
    });
}

window.onload = function () {
  getCurrentWeather("London");
};

//const fetchAllWeatherData = (cityName) => {

//  const apiUrL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

// construct URL for `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`; and store in variable called as weatherApiUrl
const functionForJSON = (responseObject) => {
  // unless you have some logic here do that before you return
  return responseObject.json();
};
const functionForApplication = (dataFromServer) => {
  // whatever your application code is goes here
  // 1. from the dataFromServer get the lat and lon
  // 2. use lat lon to construct https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API_KEY} and store in variable called oneApiUrl

  const functionForJSON = (responseObject) => {
    // unless you have some logic here do that before you return
    return responseObject.json();
  };
  const functionForApplication = (dataFromServer) => {
    // whatever your application code is goes here
    // call a function getCurrentData() to get the current data from dataFromServer
    // getCurrentData()  and store in currentData
    // getForecastData() and store in forecastData
    // renderCurrentCardComponent(currentData);
    // renderForecastCardComponent(forecastData);
  };
  const functionToHandleError = (errorObject) => {
    // handle your error here according to your application
  };
  fetch(oneApiUrl)
    .then(functionForJSON)
    .then(functionForApplication)
    .catch(functionToHandleError);
};
const functionToHandleError = (errorObject) => {
  // handle your error here according to your application
};
fetch(weatherApiUrl)
  .then(functionForJSON)
  .then(functionForApplication)
  .catch(functionToHandleError);
//};

// function called on load of the document
const onLoad = (cityName) => {
  weatherBalloon("London");
};
// fetchCurrentWeather();
// read from local storage amd store data in variable called citiesFromLocalStorage
// if data is present call renderCities and pass the data from local storage
// renderCities(citiesFromLocalStorage)
// get the last city name from citiesFromLocalStorage and store in variable called cityName
// fetchAllWeatherData(cityName)
//};

// function called when the form is submitted
const onSubmit = () => {
  // get city name and store in variable called cityName
  // fetchAllWeatherData(cityName)
};

const onClick = () => {
  // get city name from the list item that was clicked and store in variable called cityName
  // fetchAllWeatherData(cityName)
};

$("#target-your-list-items").click(onClick);

$("#your-form-id").submit(onSubmit);

$(document).ready(onLoad);
