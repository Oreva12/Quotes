const express = require('express');
const app = express();
const PORT = 3000;

const quotes = [
  { text: "Don't watch the clock; do what it does. Keep going.", genre: "motivational" },
  { text: "Success is not final, failure is not fatal.", genre: "inspirational" },
  { text: "Stay hungry, stay foolish.", genre: "tech" },
  { text: "Believe you can and you're halfway there.", genre: "inspirational" },
  { text: "Discipline equals freedom.", genre: "motivational" },
  { text: "Talk is cheap. Show me the code.", genre: "tech" },
];

app.get('/quote', (req, res) => {
  const { genre } = req.query;

  let filteredQuotes = quotes;

  // Filter by genre if it's provided
  if (genre) {
    filteredQuotes = quotes.filter(q => q.genre.toLowerCase() === genre.toLowerCase());

    if (filteredQuotes.length === 0) {
      return res.status(404).json({ error: `No quotes found for genre: ${genre}` });
    }
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];

  res.json({ quote: randomQuote.text, genre: randomQuote.genre });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
