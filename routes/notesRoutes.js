const notes = require('express').Router();
const {v4: uuidv4} = rquire('uuid');
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');

// GET route that retrieves all the notes
notes.get('/', (req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for new note
notes.post('/', (req,res) => {
    
    const {title, text} = req.body;

    if (req.body) {
        // create new note
        const newNote= {
            title,
            text,
            id: uuidv4()
        };

        // append new note to the database
        readAndAppend(newNote, './db/db.json');
        res.json('Successfully added a new note!');
    } else {
        res.error('Error in adding new note.');
    }
});

// DELETE route for deleting a note
notes.delete('/:id', (req,res) => {
    const noteId = req.params.id
    deleteNote('./db/db.json', noteId)
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

module.exports = notes