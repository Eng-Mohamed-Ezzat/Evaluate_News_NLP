const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(require('cors')());

// TextRazor API Key
const TEXT_RAZOR_API_KEY = process.env.TEXTRAZOR_API_KEY;

if (!TEXT_RAZOR_API_KEY) {
    console.error("Error: TextRazor API Key is missing. Please set it in the .env file.");
    process.exit(1);
}

// API route for processing text
app.post('/analyze', async (req, res) => {
  const { text } = req.body;

  if (!text) {
      return res.status(400).json({ error: "Text input is required" });
  }

  try {
      const response = await axios.post(
          'https://api.textrazor.com',
          new URLSearchParams({
              extractors: 'entities,topics,words',
              url: text, // Use the URL parameter for content fetching
          }),
          {
              headers: {
                  'x-textrazor-key': TEXT_RAZOR_API_KEY,
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
          }
      );

      res.status(200).json(response.data);
  } catch (error) {
      console.error('Error communicating with TextRazor API:', error.message);
      res.status(500).json({ error: "Failed to analyze text" });
  }
});


// Default route
app.get('/', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
