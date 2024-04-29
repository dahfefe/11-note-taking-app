const router = require('express').Router();
//* can also write the above as: const { Router } = require("express");
//* then we would have to create new instance of router if we used line #2:
//* const apiRoutes = new Router();
//* be sure to replace all words that precede ".use" with "apiRoutes"

// Import our modular router for /notesRouter
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;
