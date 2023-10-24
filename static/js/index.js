// to show and hide the notification when add new product is success
function hideNotification() {
  setTimeout(function() {
    $('.notification').alert('close');
  }, 10000);
}
// Call the hideNotification function when the page loads
$(document).ready(function() {
  hideNotification();
});


document.addEventListener('DOMContentLoaded', function() {
  console.log("add staff page script is running.");

  // Real Time Validation with bootstrap class
const firstnameInput = document.getElementById('firstname');
const lastnameInput = document.getElementById('lastname');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');


firstnameInput.addEventListener('input', function (event) {
  validateInput(event.target, 'firstname-feedback', /^[a-zA-Z-]{1,}( [a-zA-Z-]{1,})*$/, 'First name must be letters');
});

lastnameInput.addEventListener('input', function (event) {
  validateInput(event.target, 'lastname-feedback',/^[a-zA-Z-]{1,}( [a-zA-Z-]{1,})*$/, 'Last name must be letters');
});

usernameInput.addEventListener('input', function (event) {
  if (!event.target.value) {
    validateInput(event.target, 'username-feedback', /^[a-z]+$/, 'Username must be in lowercase letter');
  } else {
    validateInput(event.target, 'username-feedback', /^[a-z]+$/, 'Looks good!');
  }
});

passwordInput.addEventListener('input', function (event) {
  if (!event.target.value || event.target.value.length < 6) {
    validateInput(event.target, 'password-feedback', /^(?=.*[a-z]).{6,}$/, 'Password must be contain at least 6 characters long with lowercase letter');
  } else {
    validateInput(event.target, 'password-feedback', /^(?=.*[a-z]).{6,}$/, 'Looks good!');
  }
});

function validateInput(input, feedbackId, regex, message) {
  const feedback = document.getElementById(feedbackId);
  if (!input.value || !regex.test(input.value)) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    feedback.classList.remove('valid-feedback');
    feedback.classList.add('invalid-feedback');
    feedback.textContent = message;
  } else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    feedback.classList.remove('invalid-feedback');
    feedback.classList.add('valid-feedback');
    feedback.textContent = 'Looks good!';
  }
}
});

