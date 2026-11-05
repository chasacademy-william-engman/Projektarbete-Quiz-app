import { getCategories } from "./api.js";
import { DIFFICULTIES } from "./config.js";

const button = document.querySelector("#random-quiz");
if (button) {
  button.addEventListener("click", async () => {
    button.disabled = true;
    try {
      const { categories } = await getCategories();

      // Keep only categories that have at least one question in some difficulty
      const playable = [];
      for (const [category, data] of Object.entries(categories)) {
        const { image, ...levels } = data;
        for (const difficulty of DIFFICULTIES) {
          if (levels[difficulty]?.length > 0) {
            playable.push({ category, difficulty });
          }
        }
      }

      if (playable.length === 0) {
        window.location.href = "pages/categories.html";
        return;
      }

      const pick = playable[Math.floor(Math.random() * playable.length)];
      window.location.href = `pages/start-quiz.html?category=${pick.category}&difficulty=${pick.difficulty}`;
    } catch (error) {
      console.warn("Could not pick a random quiz:", error);
      window.location.href = "pages/categories.html";
    } finally {
      button.disabled = false;
    }
  });
}
