import { getCategories } from "./api.js";
import { formatName, createElement } from "./helpers.js";

const grid = document.querySelector(".category-grid");
// const errorText = document.querySelector(".quiz-error");

// CREATE CATEGORIES
function createCategoryCard(category, levels) {
  const img = createElement("img", "category-img");
  img.src = "https://placehold.co/600x200?text=Question+image";
  img.alt = "";

  const total = Object.values(levels).reduce(
    (sum, list) => sum + list.length,
    0,
  );

  const media = createElement("div", "category-media", img);
  const name = createElement("p", "category-quiz", formatName(category));
  const info = createElement(
    "p",
    "category-update",
    total ? `${total} questions` : "Get Questions",
  );

  const card = createElement("a", "category-card", media, name, info);
  card.href = `start-quiz.html?category=${category}`;

  return card;
}

// RENDER
async function renderCategories() {
  try {
    const { categories } = await getCategories();

    const cards = Object.entries(categories).map(([category, levels]) =>
      createCategoryCard(category, levels),
    );

    grid.replaceChildren(...cards);
  } catch (error) {
    console.log(error);
  }
}

renderCategories();
