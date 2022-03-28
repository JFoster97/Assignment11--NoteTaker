const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const indexRoutes = require('./routes/index');
const notesRoutes = require('./routes/notesRoutes')

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use('/api', notesRoutes);
app.use('/', indexRoutes);
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`API server port: ${PORT}!`);
}); 