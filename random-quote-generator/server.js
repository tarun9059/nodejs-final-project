const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Keeping the quote data in memory makes this project easy to run without a database.
const quotes = [
  { id: 1, text: 'Small steps taken with care can carry you farther than grand plans left waiting.', author: 'Anonymous' },
  { id: 2, text: 'A new beginning often looks like an ordinary day you choose to use well.', author: 'Anonymous' },
  { id: 3, text: 'You do not need to see the whole path to take the next honest step.', author: 'Anonymous' },
  { id: 4, text: 'Progress is built from the moments you keep showing up.', author: 'Anonymous' },
  { id: 5, text: 'Let patience give your effort enough room to become something lasting.', author: 'Anonymous' },
  { id: 6, text: 'The courage to begin is already a kind of progress.', author: 'Anonymous' },
  { id: 7, text: 'Make today a little more thoughtful than yesterday.', author: 'Anonymous' },
  { id: 8, text: 'A setback can change your direction without changing your destination.', author: 'Anonymous' },
  { id: 9, text: 'Confidence grows each time you keep a promise to yourself.', author: 'Anonymous' },
  { id: 10, text: 'Focus on the work in front of you; let the next step reveal itself.', author: 'Anonymous' },
  { id: 11, text: 'Your pace is allowed to be different from everyone else’s.', author: 'Anonymous' },
  { id: 12, text: 'Turn what you have learned into the beginning of what comes next.', author: 'Anonymous' },
  { id: 13, text: 'A little consistency can make room for a remarkable change.', author: 'Anonymous' },
  { id: 14, text: 'The best time to practice courage is in the small choices of today.', author: 'Anonymous' },
  { id: 15, text: 'Rest is part of the work that helps you return with clarity.', author: 'Anonymous' },
  { id: 16, text: 'You can be a work in progress and still be proud of your progress.', author: 'Anonymous' },
  { id: 17, text: 'Choose the next useful action over the perfect plan.', author: 'Anonymous' },
  { id: 18, text: 'When the road feels long, remember how far your first step carried you.', author: 'Anonymous' },
  { id: 19, text: 'Let your values set the direction and your habits do the walking.', author: 'Anonymous' },
  { id: 20, text: 'A patient effort is still a powerful effort.', author: 'Anonymous' },
  { id: 21, text: 'You are allowed to learn your way into a better answer.', author: 'Anonymous' },
  { id: 22, text: 'Make room for the possibility that things can turn out well.', author: 'Anonymous' },
  { id: 23, text: 'The work you do quietly today can become tomorrow’s strength.', author: 'Anonymous' },
  { id: 24, text: 'A meaningful life is shaped by the care you bring to ordinary moments.', author: 'Anonymous' },
  { id: 25, text: 'Be curious about what you can build, not only what you might get wrong.', author: 'Anonymous' },
  { id: 26, text: 'Every skill you admire began as something someone practiced.', author: 'Anonymous' },
  { id: 27, text: 'A clear purpose can make a difficult step feel worthwhile.', author: 'Anonymous' },
  { id: 28, text: 'Keep going gently; steady does not have to mean hurried.', author: 'Anonymous' },
  { id: 29, text: 'The way forward gets clearer when you give it your attention.', author: 'Anonymous' },
  { id: 30, text: 'Let mistakes be information, not a definition of who you are.', author: 'Anonymous' },
  { id: 31, text: 'Your next chapter can start before you feel completely ready.', author: 'Anonymous' },
  { id: 32, text: 'Notice how much becomes possible when you begin with what you have.', author: 'Anonymous' },
  { id: 33, text: 'Kindness toward yourself can be the ground where discipline grows.', author: 'Anonymous' },
  { id: 34, text: 'A focused hour can do more than a day spent waiting for perfect conditions.', author: 'Anonymous' },
  { id: 35, text: 'There is strength in asking for help and wisdom in accepting it.', author: 'Anonymous' },
  { id: 36, text: 'Build a life that feels true in the quiet moments, too.', author: 'Anonymous' }
];

app.use(express.static(path.join(__dirname, 'public')));

// Return the complete collection for clients that want to browse or filter it.
app.get('/api/quotes', (req, res) => {
  res.json({ success: true, count: quotes.length, quotes });
});

// The optional exclude parameter lets the browser avoid repeating the last quote.
app.get('/api/quote/random', (req, res) => {
  const excludedId = Number.parseInt(req.query.exclude, 10);
  const availableQuotes = quotes.length > 1
    ? quotes.filter((quote) => quote.id !== excludedId)
    : quotes;
  const pool = availableQuotes.length > 0 ? availableQuotes : quotes;
  const quote = pool[Math.floor(Math.random() * pool.length)];

  res.json({ success: true, quote });
});

// Give API callers a useful JSON response for unknown API routes.
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, error: 'API route not found.' });
});

// Keep unexpected server errors in a consistent JSON format.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'An unexpected server error occurred.' });
});

app.listen(PORT, () => {
  console.log(`Random Quote Generator is running at http://localhost:${PORT}`);
});
