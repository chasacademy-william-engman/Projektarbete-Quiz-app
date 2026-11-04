const QUIZ_KEY = "quiz";
const SCORE_KEY = "score";

// Shared helpers
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function load(key) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
}

function remove(key) {
  localStorage.removeItem(key);
}

// QUIZ
export function saveQuiz(category, difficulty, questions) {
  save(QUIZ_KEY, { category, difficulty, questions });
  remove(SCORE_KEY); // a new quiz starts without the old score
}

export function loadQuiz() {
  return load(QUIZ_KEY);
}

export function clearQuiz() {
  remove(QUIZ_KEY);
}

// SCORE
export function saveScore(score) {
  save(SCORE_KEY, score);
}

export function loadScore() {
  return load(SCORE_KEY);
}

export function clearScore() {
  remove(SCORE_KEY);
}
