var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

require('dotenv').config();

dotenv.config();
const aylien = require('aylien_textapi');
const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

// Variables for url and api key


app.get('/', function (req, res) {
    res.send("This is the server API page, you may access its services via the client app.");
});


// POST Route
app.post('/api', (req, res) => {
    const { url } = req.body;
    textapi.sentiment({ url }, (error, response) => {
      if (error) {
        res.status(500).send({ error });
      } else {
        res.send(response);
      }
    });
  });
  


// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


