# Random Quote Generator

A responsive quote website built with HTML, CSS, browser JavaScript, Node.js, and Express. The server provides a local collection of 36 quotes without a database or paid API.

## Requirements

- Node.js 18 or newer
- npm (included with Node.js)

## Run locally

From the `random-quote-generator` folder:

```powershell
npm install
npm start
```

Open `http://localhost:3000` in a browser. Stop the server with `Ctrl+C`.

For automatic server restarts during development, use `npm run dev`.

## API

- `GET /api/quotes` returns the complete quote collection and its count.
- `GET /api/quote/random` returns one random quote.
- `GET /api/quote/random?exclude=1` returns a random quote other than quote `1` when another quote is available.

Both endpoints return JSON with a `success` field. Unknown API routes return a JSON 404 response.

## Features

- 36 inspirational quotes served from the Express backend
- A different quote on each successive request from the browser
- Copy-to-clipboard with a confirmation message
- Native sharing where supported, with a clipboard fallback
- Responsive layout, keyboard focus styling, and reduced-motion support
