const fetch = require('node-fetch');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');



dotenv.config();
console.log('TEXTRAZOR_API_KEY:', process.env.TEXTRAZOR_API_KEY);
const app = express();

app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

// Variables for API key
const TEXTRAZOR_API_KEY = process.env.TEXTRAZOR_API_KEY;


// Endpoint for TextRazor API request
app.post(['/api', '/analyze'], async (req, res) => {
    console.log('Endpoint for TextRazor API request');
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).send({ error: 'URL is required' });
    }
    
    try {
        const response = await fetch('https://api.textrazor.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-textrazor-key': TEXTRAZOR_API_KEY,
            },
            body: `url=${encodeURIComponent(url)}&extractors=entities,topics,words`,
        });
        console.log(response);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error calling TextRazor API:', error);
        res.status(500).send({ error: 'Failed to analyze text' });
    }
});

// Set up server to use dist folder
app.use(express.static('dist'));

// Start server
const port = 8081;
app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});
