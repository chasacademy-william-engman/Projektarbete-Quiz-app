import { loadQuiz, loadScore, saveScore, clearQuiz } from "./storage.js";
import { POINTS, SECONDS_PER_QUESTION, ANSWER_DELAY } from "./config.js";
import { shuffle, formatTime, createElement } from "./helpers.js";

const quiz = loadQuiz();
const optionsBox = document.querySelector(".quiz-options");
const timerText = document.querySelector(".timer");
const exitButton = document.querySelector("#exit-quiz");
const exitModal = document.querySelector("#error-modal");

const totalQuestions = quiz?.questions.length ?? 0;
const startTime = SECONDS_PER_QUESTION * totalQuestions;

let currentQuestion = 0;
let score = 0;
let timeLeft = startTime;
let timer = null;
let nextTimer = null;

// TIMER
function updateTimer() {
  timerText.textContent = formatTime(timeLeft);
}

function tick() {
  timeLeft--;
  updateTimer();

  if (timeLeft <= 0) {
    endQuiz();
  }
}

// QUIZ
function renderQuestionPage() {
  const { question, options, correct } = quiz.questions[currentQuestion];

  document.querySelector("#question").textContent = question;

  const questionNumber = currentQuestion + 1;
  const percent = Math.round((questionNumber / totalQuestions) * 100);
  document.querySelector(".quiz-progress__bar").style.width = `${percent}%`;

  // Mix up the answers so the right one isn't always first
  const answers = shuffle(options);

  const buttons = answers.map((answer) => {
    const button = createElement("button", "quiz-option", answer);
    button.type = "button";
    button.addEventListener("click", () => checkAnswer(button, correct));
    return button;
  });

  optionsBox.replaceChildren(...buttons);
}

function checkAnswer(clickedButton, correctAnswer) {
  const buttons = optionsBox.querySelectorAll(".quiz-option");

  buttons.forEach((button) => {
    button.disabled = true;

    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (clickedButton.textContent === correctAnswer) {
    score += POINTS[quiz.difficulty];
  } else {
    clickedButton.classList.add("incorrect");
  }

  nextTimer = setTimeout(nextQuestion, ANSWER_DELAY); // wait 1.5 seconds, then go on
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < totalQuestions) {
    renderQuestionPage();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  saveScore(score);
  window.location.href = "result.html";
}

// EXIT
function exitQuiz() {
  clearInterval(timer);
  clearTimeout(nextTimer);

  timeLeft = startTime;
  updateTimer();

  const hasBeenCompleted = loadScore() !== null;

  if (!hasBeenCompleted) {
    clearQuiz(); // only remove quizzes that were never finished
  }

  document.querySelector("main").replaceChildren();

  exitButton.classList.add("hidden");

  window.location.href = "../index.html";
}

// EXIT
exitButton.addEventListener("click", () => {
  exitModal.hidden = false;
});

exitModal.querySelector("[data-confirm]").addEventListener("click", () => {
  exitModal.hidden = true;
  exitQuiz();
});

exitModal.querySelector("[data-cancel]").addEventListener("click", () => {
  exitModal.hidden = true;
});

// Popup Modal
function showErrorModal() {
  const modal = document.getElementById("error-modal");
  if (!modal) return;
  modal.hidden = false;

  let choice = false;

  const close = () => {
    modal.hidden = true;
    choice = true;
  };

  const cancel = () => {
    modal.hidden = true;
  };

  modal
    .querySelector("[data-close]")
    .addEventListener("click", close, { once: true });
  modal
    .querySelector("[data-cancel]")
    .addEventListener("click", cancel, { once: true });

  return choice;
}

// function prettifyName(name) {
//  return name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
// }

// START
if (!quiz) {
  window.location.href = "../index.html";
} else {
  quiz.questions = shuffle(quiz.questions); // shuffle the questions once
  renderQuestionPage();
  updateTimer();
  timer = setInterval(tick, 1000);
}
