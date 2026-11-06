// QUIZ SETTINGS
export const DIFFICULTIES = ["easy", "normal", "hard"];
export const DEFAULT_DIFFICULTY = "easy";
export const QUESTION_COUNT = 20;
export const SECONDS_PER_QUESTION = 15;
export const ANSWER_DELAY = 1500; // ms to show right/wrong before the next question
export const MIN_LOADING_TIME = 3000; // 3 second wait before fetch

// POINTS PER CORRECT ANSWER
export const POINTS = {
  easy: 100,
  normal: 200,
  hard: 300,
};

// ICONS
export const DIFFICULTY_ICONS = {
  easy: "fa-face-smile",
  normal: "fa-face-meh",
  hard: "fa-face-frown",
};

// DATA SOURCES
export const CATEGORIES_URL = new URL("../data/quizzes.json", import.meta.url);
export const API_URL = "https://the-trivia-api.com/v2/questions";

// Our difficulty names -> The Trivia API's names
export const API_DIFFICULTIES = {
  easy: "easy",
  normal: "medium",
  hard: "hard",
};
