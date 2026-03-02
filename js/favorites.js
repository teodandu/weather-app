const list = document.getElementById("favoritesList");

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  list.innerHTML = "";

  favorites.forEach((city, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span onclick="openDetails('${city}')">${city}</span>
      <button onclick="removeFavorite(${index})">Remove</button>
    `;

    list.appendChild(li);
  });
}

function removeFavorite(index) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  loadFavorites();
}

function openDetails(city) {
  localStorage.setItem("selectedCity", city);
  window.location.href = "favorite-details.html";
}


loadFavorites();