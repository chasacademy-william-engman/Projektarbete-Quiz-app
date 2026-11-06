import { saveQuiz, loadQuiz } from "./storage.js";
import { getQuestions, getCategories } from "./api.js";
import { formatName, capitalize, createElement } from "./helpers.js";
import {
  DIFFICULTIES,
  QUESTION_COUNT,
  DIFFICULTY_ICONS,
  DEFAULT_DIFFICULTY,
  MIN_LOADING_TIME,
} from "./config.js";

const params = new URLSearchParams(window.location.search);
const category = params.get("category");
const difficultyFromUrl = params.get("difficulty");

// Use the difficulty from the URL only if it's a real one
let selectedDifficulty = DIFFICULTIES.includes(difficultyFromUrl)
  ? difficultyFromUrl
  : DEFAULT_DIFFICULTY;

const startLink = document.querySelector(".quiz-start-link");
const errorText = document.querySelector(".quiz-error");
const cardContainer = document.querySelector("#quiz-start-container");

// Category image, loaded once from quizzes.json
let categoryImage = null;

// START LINK
function setStartLoading(isLoading) {
  startLink.classList.toggle("is-loading", isLoading);
  startLink.setAttribute("aria-disabled", String(isLoading));

  if (isLoading) {
    startLink.innerHTML = `<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Loading...`;
  } else {
    startLink.innerHTML = `<i class="fa-solid fa-play" aria-hidden="true"></i> Start quiz`;
  }
}

// ERROR MESSAGE
function showError(message) {
  errorText.textContent = message;
  errorText.hidden = false;
}

function hideError() {
  errorText.hidden = true;
}

// RENDER
async function renderPage() {
  // Load the category image once, then cache it
  if (categoryImage === null) {
    try {
      const { categories } = await getCategories();
      categoryImage = categories[category]?.image ?? "";
    } catch (error) {
      console.warn("Could not load category image:", error);
      categoryImage = "";
    }
  }

  const formattedName = formatName(category);

  document.querySelector(".quiz-name").textContent = formattedName;
  document.querySelector(".quiz-subtext").textContent =
    `Take this quiz about ${formattedName.toLowerCase()}`;

  const difficultyIcon = createElement(
    "i",
    `fa-regular ${DIFFICULTY_ICONS[selectedDifficulty]}`,
  );
  difficultyIcon.setAttribute("aria-hidden", "true");

  document
    .querySelector(".quiz-difficulty")
    .replaceChildren(
      difficultyIcon,
      `Difficulty - ${capitalize(selectedDifficulty)}`,
    );

  // Hero image: decorative, the title beside it names the quiz
  const heroImg = document.querySelector("#hero img");
  if (heroImg && categoryImage) {
    heroImg.src = categoryImage;
  }

  renderQuizCards();

  document.body.classList.remove("loading");
}

function createQuizCard(difficulty) {
  const name = formatName(category);

  const img = createElement("img");
  img.width = 80;
  img.height = 80;
  img.alt = "";
  img.style.borderRadius = "12px";
  img.src = categoryImage || "https://placehold.co/80x80?text=Quiz";
  img.style.objectFit = "cover";
  img.onerror = () => {
    img.src = "https://placehold.co/80x80?text=Quiz";
  };

  const title = createElement(
    "span",
    "quiz-card-desc-title",
    name,
    createElement("br"),
  );

  const categorySpan = createElement("span", "", name);
  const difficultySpan = createElement("span", "", capitalize(difficulty));
  const meta = createElement(
    "span",
    "quiz-card-meta",
    categorySpan,
    " • ",
    difficultySpan,
  );
  const text = createElement(
    "span",
    "quiz-card-text",
    `Take this quiz about ${name.toLowerCase()}`,
  );

  const info = createElement("span", "", meta, createElement("br"), text);
  const desc = createElement("span", "quiz-card-desc", title, info);

  const card = createElement("button", "quiz-start-card", img, desc);
  card.type = "button";

  // Toggle-style button: aria-pressed tells screen readers which is selected
  const isSelected = difficulty === selectedDifficulty;
  card.setAttribute("aria-pressed", String(isSelected));

  if (isSelected) {
    card.classList.add("selected");
  } else {
    card.addEventListener("click", () => {
      selectedDifficulty = difficulty;
      hideError();
      renderPage();
    });
  }

  return card;
}

function renderQuizCards() {
  const cards = DIFFICULTIES.map((difficulty) => createQuizCard(difficulty));
  cardContainer.replaceChildren(...cards);
}

// START QUIZ
startLink.addEventListener("click", async (event) => {
  event.preventDefault();

  if (startLink.classList.contains("is-loading")) {
    return;
  }
  const savedQuiz = loadQuiz();

  const isAlreadySaved =
    savedQuiz?.category === category &&
    savedQuiz?.difficulty === selectedDifficulty;

  if (isAlreadySaved) {
    window.location.href = startLink.href;
    return;
  }

  hideError();
  setStartLoading(true);

  setTimeout(async () => {
    try {
      const questions = await getQuestions(
        QUESTION_COUNT,
        category,
        selectedDifficulty,
      );
      saveQuiz(category, selectedDifficulty, questions);
      window.location.href = startLink.href;
    } catch (error) {
      showError(error.message);
      setStartLoading(false);
    }
  }, MIN_LOADING_TIME);
});

// Reset the Start link if the player comes back with the Back button
window.addEventListener("pageshow", () => {
  setStartLoading(false);
});

// INIT
if (!category) {
  window.location.href = "../index.html";
} else {
  renderPage();
}
