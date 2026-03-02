const API_KEY = "4f05219aef5bbab0f0a8698eb4de7100";

function getLocationForForecast() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getDailyForecast(lat, lon);
    },
    () => {
      alert("Unable to retrieve your location.");
    }
  );
}


async function getDailyForecast(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Forecast request failed.");
    }

    const data = await response.json();
    const dailyForecast = data.list.filter((_, index) => index % 8 === 0);
    displayForecast(dailyForecast);

  } catch (error) {
    console.error(error);
    alert("Error while fetching forecast data.");
  }
}


function displayForecast(days) {
  const container = document.getElementById("forecast");
  container.innerHTML = "";

  days.forEach((day) => {
    const date = new Date(day.dt_txt).toLocaleDateString();

    const card = document.createElement("div");
    card.classList.add("day-card");

    card.innerHTML = `
      <h4>${date}</h4>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Weather icon">
      
      <p><strong>Min:</strong> ${day.main.temp_min.toFixed(1)}°C</p>
      <p><strong>Max:</strong> ${day.main.temp_max.toFixed(1)}°C</p>
      <p style="text-transform: capitalize;">${day.weather[0].description}</p>
    `;

    container.appendChild(card);
  });
}

getLocationForForecast();