const API_KEY = "4f05219aef5bbab0f0a8698eb4de7100";


function loadUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("welcome").textContent =
  `Welcome, ${user.username}!`;
}


function getLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCoords(lat, lon);
    },
    () => {
      alert("Unable to retrieve your location.");
    }
  );
}


async function getWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Weather request failed.");
    }

    const data = await response.json();
    displayWeather(data);

  } catch (error) {
    console.error(error);
    alert("Error while fetching weather data.");
  }
}


function displayWeather(data) {
  document.getElementById("location").textContent = data.name;

  document.getElementById("temp").textContent =
    `Temperature: ${data.main.temp}°C`;

  document.getElementById("desc").textContent =
    `Conditions: ${data.weather[0].description}`;

  document.getElementById("humidity").textContent =
    `${data.main.humidity}%`;

  document.getElementById("wind").textContent =
    `${data.wind.speed} m/s`;

  document.getElementById("weatherIcon").src =
  `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png?nocache=${Date.now()}`;
}

loadUser();
getLocation();
