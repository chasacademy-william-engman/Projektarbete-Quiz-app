const QUIZ_KEY = "quiz";
const SCORE_KEY = "score";
const HISTORY_KEY = "quiz-history";
const HISTORY_LIMIT = 50;

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

// HISTORY
export function loadHistory() {
  return load(HISTORY_KEY) ?? [];
}

export function addToHistory(entry) {
  const history = loadHistory();
  history.unshift(entry); // newest first
  if (history.length > HISTORY_LIMIT) history.length = HISTORY_LIMIT;
  save(HISTORY_KEY, history);
  return history;
}

export function clearHistory() {
  remove(HISTORY_KEY);
}
