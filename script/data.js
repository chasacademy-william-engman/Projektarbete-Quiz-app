// Get scoreboard from dummy json
async function renderLeaderboard() {
  try {
    const res = await fetch("../data/dummy-results.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const list = document.getElementById("leaderboard-list");
    list.innerHTML = ""; // clear in case of re-render

    data.leaderboard.forEach((entry) => {
      const li = document.createElement("li");
      li.className = "quiz-card";
      li.innerHTML = `
          <div>
            <span class="order">${entry.order}.</span>
            <span class="name">${entry.name}</span>
          </div>
          <span class="quiz-score">${entry.score}</span>
          `;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Failed to load leaderboard:", err);
  }
}

renderLeaderboard();
