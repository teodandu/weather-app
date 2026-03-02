const API_KEY = "4f05219aef5bbab0f0a8698eb4de7100";
const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const result = document.getElementById("result");


button.addEventListener("click", () => {
  const value = input.value.trim();

  if (value === "") {
    alert("Please enter a city name!");
    return;
  }

  searchWeather(value);
});


async function searchWeather(query) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("City not found.");
    }

    const data = await response.json();
    displayResult(data);

  } catch (error) {
    console.error(error);
    result.innerHTML = "<p>City not found.</p>";
  }
}


function displayResult(data) {
  result.innerHTML = `
    <h3>${data.name}</h3>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Conditions: ${data.weather[0].description}</p>
    <button onclick="addToFavorites('${data.name}')">Add to Favorites</button>
  `;
}


function addToFavorites(city) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("City added to favorites!");
  } else {
    alert("City is already in favorites!");
  }
}