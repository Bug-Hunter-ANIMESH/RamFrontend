// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    navLinks.classList.remove("active");
  });
});

// Animated hero CTA
document.querySelector('.cta-btn').addEventListener('click', () => {
  window.scrollTo({
    top: document.querySelector('#join').offsetTop,
    behavior: 'smooth'
  });
});

// 🔹 Redirect to login and register pages
document.querySelectorAll('.login-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = './login/login.html';
  });
});

document.querySelectorAll('.register-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = './register/register.html';
  });
});
