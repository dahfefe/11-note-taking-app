const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const fs = require('fs');
// Helper functions for reading and writing to the JSON file
const { readFromFile } = require('./helpers/fsUtils');
// const { readFromFile, readAndAppend, writeToFile } = require('./helpers/fsUtils');
const api = require('./routes');

//* Note: this says "looking for an environment variable called 'port'" and, if not found, it will direct to port 3001
//* this allows heroku to set a port number for us
const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// * Note: this function change all require pathways to only need "./" versus "../"
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
//* Note: we need "/api/notes" here as it originates in server.js 
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));  // this is what is actually fetching the data
});

//* This will collect all searches ending in ".../[?]", not ".../notes/[?]"
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
