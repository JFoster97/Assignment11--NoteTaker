const notes = require('express').Router();
const {v4: uuidv4} = require('uuid');
const { readFromFile, readAndAppend, writeToFile} = rquire('../helpers/fsUtils');

// GET route to retrieve notes

// POST route for new notes

// DELETE route for deleting a note



module.exports = notes;