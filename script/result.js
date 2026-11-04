import { loadQuiz, loadScore } from "./storage.js";
import { formatName, capitalize } from "./helpers.js";
import { DIFFICULTY_ICONS } from "./config.js";

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

  document.querySelector("#play-again").addEventListener("click", () => {
    window.location.href = "quiz-game.html";
  });
}
