
let users = JSON.parse(localStorage.getItem("users")) || [];

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value;

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    const existing = users.find(u => u.username === username);
    if (existing) {
      alert("Username already exists!");
      return;
    }

    users.push({ fullname, username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! You can now login.");
    window.location.href = "login.html";
  });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login successful!");
      window.location.href = "home.html";
    } else {
      alert("Invalid username or password.");
    }
  });
}

const toggleSignupPw = document.getElementById("toggleSignupPw");
const toggleLoginPw = document.getElementById("toggleLoginPw");

if (toggleSignupPw) {
  toggleSignupPw.onclick = () => {
    const pw = document.getElementById("signupPassword");
    pw.type = pw.type === "password" ? "text" : "password";
  };
}
if (toggleLoginPw) {
  toggleLoginPw.onclick = () => {
    const pw = document.getElementById("loginPassword");
    pw.type = pw.type === "password" ? "text" : "password";
  };
}

const petContainer = document.getElementById("petContainer");
if (petContainer) {
  const pets = [
    { name: "Bella", type: "Dog", age: "2 years", img: "images/pet1.jpg", desc: "Friendly and playful Labrador." },
    { name: "Milo", type: "Cat", age: "1 year", img: "images/pet2.jpg", desc: "Loves to cuddle and nap." },
    { name: "Coco", type: "Rabbit", age: "6 months", img: "images/pet3.jpg", desc: "Soft and gentle companion." },
  ];

  petContainer.innerHTML = pets.map(pet => `
    <div class="pet-card">
      <img src="${pet.img}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <p>${pet.type} • ${pet.age}</p>
      <p>${pet.desc}</p>
      <button>Adopt</button>
    </div>
  `).join('');
}

function logout() {
  localStorage.removeItem("loggedInUser");
  alert("Logged out successfully!");
}
