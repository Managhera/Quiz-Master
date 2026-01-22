/* ================= 1. SLIDER ANIMATION ================= */
const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

/* ================= 2. VALIDATION LOGIC ================= */

// Helper function to show alerts
function showError(input, message) {
  input.classList.add("error-border");
  alert(message);
  setTimeout(() => {
    input.classList.remove("error-border");
  }, 2000);
}

// --- REGISTER ---
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById("regUser");
    const emailInput = document.getElementById("regEmail");
    const passInput = document.getElementById("regPass");

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username === "") {
      showError(usernameInput, "Please enter a username.");
      return;
    }
    if (!emailPattern.test(email)) {
      showError(emailInput, "Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      showError(passInput, "Password must be at least 6 characters long.");
      return;
    }

    const user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful! Please Login.");
    this.reset();
    container.classList.remove("active");
  });

// --- LOGIN ---
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const usernameInput = document.getElementById("loginUser");
  const passInput = document.getElementById("loginPass");

  const username = usernameInput.value.trim();
  const password = passInput.value.trim();

  if (username === "" || password === "") {
    alert("All fields are required!");
    return;
  }

  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser) {
    alert("No user found. Please Register first.");
    return;
  }

  if (username === storedUser.username && password === storedUser.password) {
    alert("Login Successful!");
    window.location.href = "../index.html";
  } else {
    showError(passInput, "Invalid Username or Password.");
  }
});

