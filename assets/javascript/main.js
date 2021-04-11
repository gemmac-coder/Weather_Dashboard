// My API Key
const API_KEY = "7a477fc97ce6ec662b6caf75ca1cc2b3";

// Gets cities from local storage
const getFromLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("cities"));

  // Returns local storage data, unless local storage is empty
  if (localStorageData === null) {
    return [];
  } else {
    return localStorageData;
  }
};

// Async function fetches data
const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Gets data by city name function
const getDataByCityName = async (event) => {
  // When a list item is clicked, all cards will be rendered for the specified city
  const target = $(event.target);
  if (target.is("li")) {
    const cityName = target.data("city");

    renderAllCards(cityName);
  }
};

// Gets relevant data for current forecast information
const transformCurrentDayData = (data, name) => {
  const current = data.current;
  return {
    cityName: name,
    temperature: current.temp,
    humidity: current.humidity,
    windSpeed: current.wind_speed,
    date: moment.unix(current.dt).format("MM/DD/YYYY"),
    iconURL: `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
    uvi: current.uvi,
  };
};

// Retrieves the date from moment.js and gets relevant data for 5-day forecast cards
const transformForecastData = (data) => {
  return {
    date: moment.unix(data.dt).format("MM/DD/YYYY"),
    iconURL: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    temperature: data.temp.day,
    humidity: data.humidity,
  };
};

// On submit the user-inputted city name will be saved to local storage
const onSubmit = async (event) => {
  event.preventDefault();

  const cityName = $("#city-input").val();
  const cities = getFromLocalStorage();
  // If the user-inputted city name is not in the array, it will be pushed to the cities array
  if (!cities.includes(cityName)) {
    cities.push(cityName);
  }
  // This updated cities array  will then be stored in local storage
  localStorage.setItem("cities", JSON.stringify(cities));

  renderCitiesFromLocalStorage();

  $("#city-input").val("");
  // Renders all cards for that city name
  renderAllCards(cityName);
};

const renderAllCards = async (cityName) => {
  //  Dynamic URL for current day data
  const currentDayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metricl&appid=${API_KEY}`;
  //  Awaits the response from the fetch data current day request
  const currentDayResponse = await fetchData(currentDayUrl);
  // Dynamic URL for forecast data
  const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentDayResponse.coord.lat}&lon=${currentDayResponse.coord.lon}&units=metric&exclude=minutely,hourly&appid=${API_KEY}`;
  // Awaits the response from the fetch data forecast request
  const forecastResponse = await fetchData(forecastUrl);

  const cardsData = forecastResponse.daily.map(transformForecastData);
  // Clears forecast cards container
  $("#forecast-cards-container").empty();
  // Only shows data for the next 5 days and renders a card for each
  cardsData.slice(1, 6).forEach(renderForecastCard);

  const currentDayData = transformCurrentDayData(
    forecastResponse,
    currentDayResponse.name
  );

  renderCurrentDayCard(currentDayData);
};
// Renders cities from local storage
const renderCitiesFromLocalStorage = () => {
  $("#searched-cities").empty();

  const cities = getFromLocalStorage();
  // Dynamically creates a unordered list
  const ul = $("<ul>").addClass("list-group");

  // Dynamically appends a list item to the unordered list
  const appendListItemToUl = (city) => {
    const li = $("<li>")
      .addClass("list-group-item")
      .attr("data-city", city)
      .text(city);

    ul.append(li);
  };

  // For each item in the cities array a list item is added to the unordered list
  cities.forEach(appendListItemToUl);

  ul.on("click", getDataByCityName);

  // This unordered list is then appended to the searched cities
  $("#searched-cities").append(ul);
};

// Dynamically colours div based on the UV index value
const getUvIndexClass = (uvIndex) => {
  if (uvIndex < 3) {
    return "uvi-low";
  } else if (uvIndex > 3 && uvIndex < 6) {
    return "uvi-medium";
  } else {
    return "uvi-high";
  }
};

// Renders a card with the weather for the current day
const renderCurrentDayCard = (data) => {
  $("#current-day").empty();

  // Elements and data in current day weather card
  const card = `<div class="card my-2">
    <div class="card-body">
      <h2>
        ${data.cityName} (${data.date}) <img src="${data.iconURL}" />
      </h2>
      <div class="py-2">Temperature: ${data.temperature}&deg; C</div>
      <div class="py-2">Humidity: ${data.humidity}%</div>
      <div class="py-2">Wind Speed: ${data.windSpeed} MPH</div>
      <div class="py-2">UV Index: <span class="uvi ${getUvIndexClass(
        data.uvi
      )}">${data.uvi}</span></div>
    </div>
  </div>`;

  $("#current-day").append(card);
};

// Renders a card for the 5-day forecast
const renderForecastCard = (data) => {
  // Elements and data in current day weather card
  const card = `<div class="card mh-100 bg-primary text-light rounded card-block">
    <h5 class="card-title p-1">${data.date}</h5>
    <img src="${data.iconURL}" />
    <h6 class="card-subtitle mb-2 text-light p-md-2">
      Temperature: ${data.temperature}&deg; C
    </h6>
    <h6 class="card-subtitle mb-2 text-light p-md-2">
      Humidity: ${data.humidity}%
    </h6>
  </div>`;

  $("#forecast-cards-container").append(card);
};

// On ready the saved cities will be rendered from local storage
const onReady = () => {
  renderCitiesFromLocalStorage();
};

// Adds event listener to form on submit
$("#search-by-city-form").on("submit", onSubmit);

$(document).ready(onReady);
