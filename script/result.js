import { loadQuiz, loadScore } from "./storage.js";
import { formatName, capitalize } from "./helpers.js";
import { DIFFICULTY_ICONS, POINTS } from "./config.js";
import { fireConfetti } from "./confetti.js";

const quiz = loadQuiz();
const score = loadScore();

if (!quiz || score === null) {
  window.location.href = "../index.html";
} else {
  const { category, difficulty } = quiz;

  document.querySelector("#quiz-category").textContent = formatName(category);
  document.querySelector("#quiz-difficulty").textContent =
    capitalize(difficulty);
  document.querySelector("#difficulty-icon").className =
    `fa-regular ${DIFFICULTY_ICONS[difficulty]}`;

  document.querySelector("#quiz-score").textContent = score;

  // Perfect score = every question answered correctly
  const maxScore = quiz.questions.length * POINTS[difficulty];
  const isPerfect = score === maxScore;

  if (isPerfect) {
    fireConfetti();
  }

  document.querySelector("#play-again").addEventListener("click", () => {
    window.location.href = "quiz-game.html";
  });
}
