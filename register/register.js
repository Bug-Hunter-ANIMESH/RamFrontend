const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const institution = document.getElementById("institution").value.trim();
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  const dobPattern = /^([0-2]\d|3[0-1])\/(0\d|1[0-2])\/\d{4}$/;
  const usernamePattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,13}$/;

  if (!dobPattern.test(dob)) {
    alert("Please enter a valid DOB in DD/MM/YYYY format.");
    return;
  }

  if (!usernamePattern.test(username)) {
    alert("Username must be 6-10 chars with 1 capital letter, 1 digit, and no special chars.");
    return;
  }

  if (!passwordPattern.test(password)) {
    alert("Password must be 8-13 chars, 1 capital letter, 1 digit, and 1 special character.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  alert(`Registration successful! Welcome, ${name}!`);
  form.reset();
});
