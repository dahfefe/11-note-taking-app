const router = require('express').Router();

// Import our modular router for /notesRoute
const notesRouter = require('./notesRouter');

router.use('/notesRouter', notesRouter);

module.exports = router;
