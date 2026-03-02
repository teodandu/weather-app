function register() {
  const user = regUser.value;
  const email = regEmail.value;
  const pass = regPass.value;

  const account = {
    username: user,
    email: email,
    password: pass
  };

  localStorage.setItem("user", JSON.stringify(account));
  localStorage.setItem("loggedIn", "true");   
  alert("Account created!");
  window.location.href = "profile.html";
}

function login() {
  const user = loginUser.value;
  const pass = loginPass.value;

  const stored = JSON.parse(localStorage.getItem("user"));

  if (!stored) {
    alert("No account found. Please sign up first.");
    return;
  }

  if (stored.username === user && stored.password === pass) {
    localStorage.setItem("loggedIn", "true");   
    window.location.href = "profile.html";
  } else {
    alert("Incorrect data!");
  }
}

function logout() {
  localStorage.removeItem("loggedIn");   
  window.location.href = "index.html";
}


function protectPage() {
  const isLoggedIn = localStorage.getItem("loggedIn");

  if (!isLoggedIn) {
    window.location.href = "index.html";
  }
}