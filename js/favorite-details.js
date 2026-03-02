const API_KEY = "4f05219aef5bbab0f0a8698eb4de7100";
const city = localStorage.getItem("selectedCity");
document.getElementById("cityName").textContent = city;


async function getCityWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Weather request failed.");
    }

    const data = await response.json();
    displayDetails(data);

  } catch (error) {
    console.error(error);
    alert("Error while fetching city weather.");
  }
}


function displayDetails(data) {
  document.getElementById("weatherDetails").innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind: ${data.wind.speed} m/s</p>
    <p>Conditions: ${data.weather[0].description}</p>
  `;
}

getCityWeather();