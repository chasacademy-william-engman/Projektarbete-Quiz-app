// HELPERS

// "easy" -> "Easy"
export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// "food_and_drink" -> "Food & drink"
export function formatName(key) {
  const text = key.replaceAll("_", " ").replace(" and ", " & ");
  return capitalize(text);
}

// 65 -> "1:05"
export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  let secondsText = seconds;

  if (seconds < 10) {
    secondsText = "0" + seconds;
  }

  return `${minutes}:${secondsText}`;
}

export function shuffle(list) {
  return list.toSorted(() => Math.random() - 0.5);
}

// createElement("p", "title", "Hello") -> <p class="title">Hello</p>
export function createElement(tag, className, ...children) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  element.append(...children);
  return element;
}
