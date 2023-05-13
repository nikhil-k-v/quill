// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const DATA_DIR = path.join(__dirname, 'data');

app.use(express.static('public')); // To serve your HTML file and client-side JS
app.use(bodyParser.json()); // To parse JSON bodies

app.get('/files', (req, res) => {
    fs.readdir(DATA_DIR, (err, files) => {
        if (err) {
            res.status(500).send('Server error');
        } else {
            res.json(files);
        }
    });
});

app.get('/files/:filename', (req, res) => {
    const filePath = path.join(DATA_DIR, req.params.filename);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Server error');
        } else {
            res.send(data);
        }
    });
});

app.post('/files/:filename', (req, res) => {
    const filePath = path.join(DATA_DIR, req.params.filename);
    fs.writeFile(filePath, req.body.content, 'utf-8', (err) => {
        if (err) {
            res.status(500).send('Server error');
        } else {
            res.send('File updated');
        }
    });
});

app.listen(3000, () => console.log('Server started on port 3000'));
