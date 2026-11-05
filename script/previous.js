import { loadQuiz, loadScore } from "./storage.js";
import { getCategories } from "./api.js";
import { formatName, capitalize, createElement } from "./helpers.js";

const container = document.querySelector("#previous-quiz-container");

// CREATE CARD
function createPreviousCard(quiz, score, image) {
  const { category, difficulty } = quiz;
  const name = formatName(category);

  const img = createElement("img");
  img.src = image ?? "https://placehold.co/80x80?text=image";
  img.width = 80;
  img.height = 80;
  img.alt = "";
  img.style.borderRadius = "12px";
  img.onerror = () => {
    img.src = "https://placehold.co/80x80?text=image";
  };

  // Title row: name + score
  const title = createElement("p", "quiz-card-desc-title", name);
  const scoreValue = createElement("span", "quiz-score", score ?? "–");
  const scoreBox = createElement("span", "quiz-card-desc-title", scoreValue);
  const titleContainer = createElement(
    "div",
    "desc-title-container",
    title,
    scoreBox,
  );

  // Info: category • difficulty + description
  const categorySpan = createElement("span", "", name);
  const difficultySpan = createElement("span", "", capitalize(difficulty));
  const meta = createElement("p", "", categorySpan, " • ", difficultySpan);
  const text = createElement(
    "p",
    "",
    `Take this quiz about ${name.toLowerCase()}`,
  );

  const info = createElement("div", "", meta, text);
  const desc = createElement("div", "quiz-card-desc", titleContainer, info);

  const card = createElement("button", "previous-quiz-card", img, desc);
  card.type = "button";
  card.addEventListener("click", () => {
    window.location.href = `start-quiz.html?category=${category}&difficulty=${difficulty}`;
  });

  return card;
}

// EMPTY MESSAGE
function createEmptyMessage() {
  return createElement(
    "p",
    "quiz-card text-center",
    "You haven't played any quizzes yet.",
  );
}

// INIT
const quiz = loadQuiz();
const score = loadScore();

if (!quiz) {
  container.replaceChildren(createEmptyMessage());
} else {
  getCategories()
    .then(({ categories }) => {
      const image = categories[quiz.category]?.image ?? "";
      container.replaceChildren(createPreviousCard(quiz, score, image));
    })
    .catch((error) => {
      console.warn("Could not load category image:", error);
      container.replaceChildren(createPreviousCard(quiz, score, ""));
    });
}
