"use strict"

const PORT = 8888;
const HOST = `http://localhost`;

const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.static('../wwwroot'));

app.get('/', (req, res) => {
    res.render('index.html');
});
app.get('/catalogData', (req, res) => {
    fs.readFile('./data/catalog.json', 'utf8', (err, data) => {
      res.send(data);
    });
  });
 

app.listen(PORT, ()=>{
    console.log(`Server started on ${HOST}:${PORT}`);
});