import { API_URL, CATEGORIES_URL, API_DIFFICULTIES } from "./config.js";

export async function getQuestions(limit, category, difficulty) {
  const { categories } = await getCategories();

  // Use the local questions if they exist
  const categoryExists = Object.keys(categories).includes(category);

  if (categoryExists) {
    const levels = categories[category];
    const difficultyExists = Object.keys(levels).includes(difficulty);

    if (difficultyExists && levels[difficulty].length > 0) {
      return levels[difficulty].slice(0, limit);
    }
  }

  // Else use questions from API if they exist
  const params = new URLSearchParams({
    limit,
    categories: category,
    difficulties: API_DIFFICULTIES[difficulty],
  });

  const response = await fetch(`${API_URL}?${params}`);

  if (response.status === 429) {
    throw new Error("Too many requests. Wait a few seconds and try again.");
  }

  if (!response.ok) {
    throw new Error("Could not load questions. Please try again.");
  }

  const questions = await response.json();

  if (questions.length === 0) {
    throw new Error("No questions found for this category.");
  }

  // Make API questions look like the ones in quizzes.json
  return questions.map(({ question, correctAnswer, incorrectAnswers }) => ({
    question: question.text,
    correct: correctAnswer,
    options: [correctAnswer, ...incorrectAnswers],
  }));
}

export async function getCategories() {
  const response = await fetch(CATEGORIES_URL);

  if (!response.ok) {
    throw new Error("Could not load quizzes.json");
  }

  return response.json();
}
