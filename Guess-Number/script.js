let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");

guessBtn.addEventListener("click", () => {
  const userGuess = Number(guessInput.value);
  attempts++;

  if (!userGuess || userGuess < 1 || userGuess > 100) {
    message.textContent = "⚠️ Please enter a number between 1 and 100.";
    return;
  }

  if (userGuess === randomNumber) {
    message.textContent = `🎉 Correct! The number was ${randomNumber}.`;
    message.style.color = "green";
    guessBtn.disabled = true;
    restartBtn.classList.remove("hidden");
  } else if (userGuess < randomNumber) {
    message.textContent = "📉 Too low! Try again.";
    message.style.color = "red";
  } else {
    message.textContent = "📈 Too high! Try again.";
    message.style.color = "red";
  }

  attemptsDisplay.textContent = attempts;
  guessInput.value = "";
  guessInput.focus();
});

restartBtn.addEventListener("click", () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  attemptsDisplay.textContent = attempts;
  message.textContent = "";
  guessBtn.disabled = false;
  restartBtn.classList.add("hidden");
});
