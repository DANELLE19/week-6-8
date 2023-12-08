const weatherData = {
  Nababeep: {
    currentTemperature: "30°C",
    forecast: [
      {
        day: "Thursday",
        temperature: "30°C | 10°C",
        description: "Mostly sunny",
      },
      {
        day: "Friday",
        temperature: "25°C | 7°C",
        description: "Partly cloudy",
      },
      { day: "Saturday", temperature: "25°C | 10°C", description: "Sunny" },
      { day: "Sunday", temperature: "26°C | 9°C", description: "Cloudy" },
      { day: "Monday", temperature: "28°C | 12°C", description: "Sunny" },
    ],
  },
  Paris: {
    currentTemperature: "25°C",
    forecast: [
      { day: "Thursday", temperature: "25°C | 15°C", description: "Cloudy" },
      { day: "Friday", temperature: "23°C | 12°C", description: "Rainy" },
      { day: "Saturday", temperature: "20°C | 11°C", description: "Showers" },
      {
        day: "Sunday",
        temperature: "22°C | 14°C",
        description: "Partly cloudy",
      },
      {
        day: "Monday",
        temperature: "24°C | 16°C",
        description: "Sunny intervals",
      },
    ],
  },
};
const currentCityElement = document.getElementById("city");

function updateWeather(city) {
  const currentTemperature = document.getElementById("temperature");
  const forecastCards = document.querySelectorAll(".forecast-card");

  if (weatherData[city]) {
    currentCityElement.textContent = city;
    currentTemperature.textContent = `Temperature: ${weatherData[city].currentTemperature}`;
    forecastCards.forEach((card, index) => {
      const forecast = weatherData[city].forecast[index];
      card.querySelector(".day").textContent = forecast.day;
      card.querySelector(".temperature-range").textContent =
        forecast.temperature;
      card.querySelector(".weather-description").textContent =
        forecast.description;
    });
  } else {
    alert(`Sorry, we don't have weather information for ${city}.`);
  }
}
function updateDateTime() {
  const dateTimeElement = document.getElementById("date-time");
  const currentDate = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[currentDate.getDay()];

  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  minutes = minutes < 10 ? "0" + minutes : minutes;

  const formattedTime = `${day} ${hours}:${minutes}`;
  dateTimeElement.textContent = formattedTime;
}
updateDateTime();

const defaultCity = prompt("Enter a city (e.g., Nababeep)");
if (defaultCity) {
  updateWeather(defaultCity);
} else {
  updateWeather("Nababeep");
}
async function searchWeather() {
  const cityInput = document.getElementById("cityInput").value;
  const apiKey = "bf3ccbcobafd70tb80f0400b80e3e34f";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod === 200) {
      currentCityElement.textContent = data.name;
      temperatureElement.textContent = `${data.main.temp}°C`;
    } else {
      alert("City not found. Please try again.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("An error occurred. Please try again later.");
  }
}
const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const enteredCity = document.getElementById("cityInput").value.trim();
  searchWeather(enteredCity);
});