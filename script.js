const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmedPassword = document.getElementById('password__confirm');
const passwordForm = document.querySelector('.form-password');
const btnCloseModal = document.querySelector('.btn--close--modal');
let valid = false;

// Show input error message
const showError = function (input, message) {
  const formControl = input.closest('.form-control');
  const small = formControl.querySelector('small');

  formControl.classList.add('error');
  small.innerText = message;
  valid = false;
};

// Show success out Line
const showSuccess = function (input) {
  const formControl = input.closest('.form-control');

  passwordForm.style.marginBottom = '0';
  formControl.classList.remove('error');
  formControl.classList.add('success');
  valid = true;
};

// Check Email is valid
const checkEmail = function (input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(input.value.trim())) {
    showError(input, 'Email is not valid');
  }
};

// Convert first letter to uppercase
const getFieldName = function (input) {
  const id = input.id;
  return id.replace(id[0], id[0].toUpperCase());
};

// Check required fields
const checkRequired = function (inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// Check required length
const checkLength = function (input, min, max) {
  const inputLength = input.value.length;

  if (inputLength > 0 && inputLength < min)
    showError(
      input,
      `${getFieldName(input)} must contain at least ${min} characters`
    );

  if (inputLength > max)
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
};

// Check valid password
const checkPassword = function (input) {
  const validPasswdord = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  if (input.value.match(validPasswdord)) return;

  showError(
    input,
    'password must be between 8 to 15 characters which contain at least 1 uppercase letter and 1 special character'
  );
  passwordForm.style.marginBottom = '40px';
};

// Check password match
const checkMatchedPassword = function (input1, input2) {
  if (input1.value === input2.value) return;

  showError(input2, 'Passwords do NOT match.');
};

// Check user name and email address match
const checkMatchedName = function (input1, input2) {
  if (input1.value !== input2.value) return;

  showError(input1, 'Name and email address must be different.');
};

const overay = document.querySelector('.overay');

// Event Listener
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, confirmedPassword]);
  checkLength(username, 4, 15);
  checkPassword(password);
  checkEmail(email);
  checkMatchedPassword(password, confirmedPassword);
  checkMatchedName(username, email);

  if (valid) {
    btnCloseModal.closest('.submit__window').classList.remove('hidden');
    overay.classList.remove('hidden');
  }
});

btnCloseModal.addEventListener('click', function () {
  btnCloseModal.closest('.submit__window').classList.add('hidden');
  overay.classList.add('hidden');
});

overay.addEventListener('click', function () {
  btnCloseModal.closest('.submit__window').classList.add('hidden');
  overay.classList.add('hidden');
});

window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    btnCloseModal.closest('.submit__window').classList.add('hidden');
    overay.classList.add('hidden');
  }
});
