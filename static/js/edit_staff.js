document.addEventListener('DOMContentLoaded', function() {
    console.log("Edit staff page script is running.");
  
    const editFirstnameInput = document.getElementById('edit_firstname');
    const editLastnameInput = document.getElementById('edit_lastname');
    const editUsernameInput = document.getElementById('edit_username');
    const editPasswordInput = document.getElementById('edit_password');
  
    editFirstnameInput.addEventListener('input', function (event) {
      validateInput(event.target, 'edit-firstname-feedback', /^[a-zA-Z-]{1,}( [a-zA-Z-]{1,})*$/, 'First name must be letters');
    });
  
    editLastnameInput.addEventListener('input', function (event) {
      validateInput(event.target, 'edit-lastname-feedback',/^[a-zA-Z-]{1,}( [a-zA-Z-]{1,})*$/, 'Last name must be letters');
    });
  
    editUsernameInput.addEventListener('input', function (event) {
      if (!event.target.value) {
        validateInput(event.target, 'edit-username-feedback', /^[a-z]+$/, 'Username must be in lowercase letter');
      } else {
        validateInput(event.target, 'edit-username-feedback', /^[a-z]+$/, 'Looks good!');
      }
    });
  
    editPasswordInput.addEventListener('input', function (event) {
      if (!event.target.value || event.target.value.length < 6) {
        validateInput(event.target, 'edit-password-feedback', /^(?=.*[a-z]).{6,}$/, 'Password must be contain at least 6 characters long with lowercase letter');
      } else {
        validateInput(event.target, 'edit-password-feedback', /^(?=.*[a-z]).{6,}$/, 'Looks good!');
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
  