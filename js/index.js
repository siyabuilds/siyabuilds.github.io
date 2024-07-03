const apiKey = "0883dc447160ed4c424abff77c1cd79c";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherInfo = document.querySelector(".weather");
const errorMessage = document.querySelector(".error-message");
const toggleBtn = document.querySelector(".toggle-mode");
async function checkWeather(city) {
  try {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)} °C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity} %`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
    const weatherIcons = {
      Clouds: "images/clouds.png",
      Clear: "images/clear.png",
      Rain: "images/rain.png",
      Drizzle: "images/drizzle.png",
      Mist: "images/mist.png",
    };
    weatherIcon.src = weatherIcons[data.weather[0].main] || "images/default.png";
    weatherInfo.style.display = "block";
    errorMessage.style.display = "none";
  } catch (error) {
    weatherInfo.style.display = "none";
    errorMessage.style.display = "block";
    errorMessage.innerHTML = error.message;
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    errorMessage.style.display = "block";
    errorMessage.innerHTML = "Please enter a city name.";
    weatherInfo.style.display = "none";
  }
});

function updateToggleButton() {
  if (document.body.classList.contains("light-mode")) {
    toggleBtn.innerHTML = "Switch to Dark Mode";
  } else {
    toggleBtn.innerHTML = "Switch to Light Mode";
  }
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  updateToggleButton();
});

updateToggleButton();
