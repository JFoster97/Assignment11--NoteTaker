const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const api = require('./public')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/notes', api)

app.use(express.json());
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`API server port: ${PORT}!`);
}); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));

// Create a get route for 
app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', function(err, contents) {
      var note = JSON.parse(contents);
      res.send(note);
    });
  });


//   Create a POST route for new notes
app.post('/api/notes', (req, res) => {
    fs.readFile('db/db.json',(err, data) => {
      if (err) throw err;
      let json = JSON.parse(data);
      let note = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
      }
      json.push(note);
  
      fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
        if (err) throw err;
        res.send('200');
      });
    });
  });

// Create a DELETE route for notes
app.delete('/api/notes/:id', (req, res) => {

    fs.readFile('db/db.json',(err, data) => {
      if (err) throw err;
      let id = req.params.id;
      let json = JSON.parse(data);
      json.forEach((item, i) =>{
        if (item.id.includes(id)){
          json.splice(i, 1);       
        }
      });
  
      fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
        if (err) throw err;
        res.send('200');
      });
    });
  
  })