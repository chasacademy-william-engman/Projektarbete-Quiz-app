## 🔀 Navigationsflöde (steg för steg)

1. **Dashboard** öppnas vid start.

2. Från dashboard kan användaren välja:
   - **Quizzes** → visar alla kategorier.
   - **Scoreboard** → visar highscore per kategori.
   - **Previous Quizzes** → visar tidigare spelade quizzes.

3. **Categories (Quizzes):**
   - Välj en kategori → **Start Quiz**.
   - I **Start Quiz** väljs svårighetsgrad, sedan startas quizet.
   - Alternativt: välj en annan kategori direkt från **Start Quiz**-sidan.

4. **Highscore:**
   - Visar alla kategorier.
   - Välj en kategori → se tidigare resultat inom kategorin.
   - Finns speldata jämförs den med **dummy-data från JSON**.

5. **Previous Quizzes:**
   - Lista över spelade quizzes.
   - Välj en → **Start Quiz** (spela igen).

6. **Efter avklarat quiz:**
   - Användaren skickas till **Resultat**.
   - Visar egen score och jämförelse mot dummy-data.

---

## 🧩 Sidor / Routes (förslag)

| Route | Sida | Beskrivning |
|-------|------|-------------|
| `/` | Dashboard | Startsida med 3 val |
| `/quizzes` | Categories | Alla quiz-kategorier |
| `/quizzes/:category` | Start Quiz | Välj svårighetsgrad & starta |
| `/scoreboard` | Highscore | Kategorier med highscore |
| `/scoreboard/:category` | Resultat per kategori | Tidigare resultat + dummy-data |
| `/previous` | Previous Quizzes | Lista över tidigare spel |
| `/result` | Resultat | Visas efter avklarat quiz |

---

## 🎨 Design & Teknik

- **Färgpalett:** `#59A2F6`, `#6D72F8`, `#403F3C`, `#94BBF9`, `#8F53F0`
- **Knappstil:** `.boton-elegante` (se `base.css` / root-variabler)
- **CSS-variabler** för färger, typografi, spacing och radius – se `:root` i bas-stylingen.
- **Dummy-data** lagras i JSON och används för jämförelse i highscore och resultat.