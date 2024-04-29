const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const fs = require('fs');
// Helper functions for reading and writing to the JSON file
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const api = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// This view route is a GET route for notes entry page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// This API route is a GET Route for retrieving all the notes (THIS IS AN ENDPOINT!)
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));  // this is what is actually fetching the data
});

// Wildcard route to direct users to a 404 page
// NOTE: the order this code matters!!! If you put it above line #16, it will catch all url inputs (which are strings)
app.get('*', (req, res) =>    //   this * matches all strings that do not match line #16,21,26 (or more specifically, strings that precede this code)
  res.sendFile(path.join(__dirname, 'public/404.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
