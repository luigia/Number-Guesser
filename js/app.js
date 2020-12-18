// enable submit only if there is input
window.onload = () => {
  userInput.addEventListener("keyup", inputExists);
};

// enable the form if there is input
const inputExists = () => {
  let empty = false;
  if (userInput.value.length == 0) empty = true;
  empty ? disableForm() : enableForm();
};

// compare the submitted answer to the correct one
const checkInput = (e) => {
  // range to guess from
  const min = 1;
  const max = 10;
  // user answer and generated answer
  let answer = Math.floor(Math.random() * max + 1);
  let userAnswer = userInput.value;
  // check if the user's answer is in the max and min range
  const inRange = userAnswer >= min && userAnswer <= max;
  // log the answer & submitted answer
  console.log(`Correct answer: ${answer}`);
  console.log(`User submitted: ${userAnswer}`);
  // used up all guesses/user lost
  if (remaining <= 0 || total >= 3) {
    showError(`You ran out of guesses! The correct answer was: ${answer}`);
    // setting up new game
    setup();
    // don't let the user reenable the form after it's disabled
    userInput.removeEventListener("keyup", inputExists);
    console.log("User ran out of guesses");
    console.log(`Total: ${total}, Remaining: ${remaining}`);
  }
  // result
  // answer not in range
  if (!inRange && userAnswer) {
    showError(
      `${userAnswer} is not in between ${min} and ${max}. Please enter a valid number.`
    );
    console.log(`${userAnswer} is not in between ${min} and ${max}`);
  } else if (userAnswer && userAnswer != answer && remaining > 0) {
    // wrong answer and still has guesses left
    showError(`The correct answer was: ${answer} (${remaining} guesses left)`);
    console.log("User did not guess correctly");
    remaining--;
    total++;
  } else if (userAnswer == answer) {
    // user won
    showSuccess(
      `The correct answer was: ${answer} - You won! (${total} total tries and ${remaining} tries left)`
    );
    console.log(
      `The user used a total of ${total} tries with ${remaining} left to spare`
    );
    remaining--;
    total++;
    // setting up new game
    setup();
    // prevent the user from reenabling the form after it's disabled
    userInput.removeEventListener("keyup", inputExists);
  }
  e.preventDefault();
};

// disable the input
const disableForm = () => {
  // give the submit a disabled style
  submit.disabled = true;
  submit.style.background = "#b4b4b4";
  submit.style.color = "#938e8e";
  submit.style.bordercolor = "#b4b4b4";
};

// enable the form
const enableForm = () => {
  // let the user start guessing
  submit.value = "Guess";
  userInput.readOnly = false;
  // revert to the original submit style
  submit.disabled = false;
  submit.style.background = "#1EAEDB";
  submit.style.color = "#fff";
  submit.style.bordercolor = "#1EAEDB";
};

// show an error message
const showError = (message) => {
  // change the border color to red
  userInput.style.borderColor = "rgb(203, 46, 46)";
  // create the element under the form
  const createErrorMsg = document.createElement("p");
  // append the error message
  createErrorMsg.appendChild(document.createTextNode(message));
  createErrorMsg.style.color = "rgb(203, 46, 46)";
  // add an id
  createErrorMsg.setAttribute("id", "error-message");
  // don't create another error message if it exists
  const errorMsg = document.querySelector("#error-message");
  // replace the message instead
  errorMsg
    ? (errorMsg.textContent = message)
    : form.appendChild(createErrorMsg);
};

// show a success message
const showSuccess = (message) => {
  // change the border color to red
  userInput.style.borderColor = "rgb(52, 160, 52)";
  // create the element under the form
  const createSuccessMsg = document.createElement("p");
  // append the success message
  createSuccessMsg.appendChild(document.createTextNode(message));
  createSuccessMsg.style.color = "rgb(52, 160, 52)";
  // add an id
  createSuccessMsg.setAttribute("id", "success-message");
  const successMsg = document.querySelector("#success-message");
  const errorMsg = document.querySelector("#error-message");
  // delete the errors after winning
  if (errorMsg) errorMsg.remove();
  // don't create another success message if it exists
  successMsg
    ? (successMsg.textContent = message)
    : form.appendChild(createSuccessMsg);
};

// setup a new game
const setup = () => {
  // clear the input
  userInput.value = "";
  // disable changes to the input
  userInput.readOnly = true;
  // try again
  submit.value = "Try again";
  // start a new game on click
  submit.addEventListener("click", newGame);
};

// prepare a new game
const newGame = () => {
  // reset values
  total = 1;
  remaining = 2;
  // let the user know they can guess again
  submit.value = "Guess";
  userInput.style.borderColor = "#D1D1D1";
  // remove error/success messages
  const error = document.querySelector("#error-message");
  const success = document.querySelector("#success-message");
  error ? error.remove() : null;
  success ? success.remove() : null;
  // disable the form but let the user enter a value
  // enable the form when a value is entered
  disableForm();
  userInput.readOnly = false;
  userInput.addEventListener("keyup", inputExists);
  // don't start another new game
  submit.removeEventListener("click", newGame);
};

const form = document.querySelector("form");
const userInput = document.querySelector("#input");
const submit = document.querySelector("#guess");
let total = 1;
let remaining = 2;

// check the input when answer is submitted
form.addEventListener("submit", checkInput);
// disable and clear the form in the beginning
!userInput.value ? disableForm() : enableForm();
userInput.value = "";
