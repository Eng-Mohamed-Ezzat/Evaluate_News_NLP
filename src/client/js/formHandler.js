import { checkForName } from './nameChecker';

const serverURL = '/analyze'; // Server endpoint for TextRazor API

document.getElementById('urlForm').addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    const formText = document.getElementById('name').value;

    // Validate input
    if (!checkForName(formText)) {
        alert('Invalid input. Please enter valid text.');
        return;
    }

    try {
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: formText }),
        });

        if (!response.ok) {
            throw new Error('Failed to analyze text');
        }

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while processing your request.');
    }
}

function updateUI(data) {
  const resultsDiv = document.getElementById('results');

  // Extract entities
  const entities = data.response.entities || [];
  const entityList = entities.map(entity => entity.entityId || entity.matchedText).join(', ');

  // Extract topics
  const topics = data.response.topics || [];
  const topicList = topics.map(topic => topic.label).join(', ');

  // Display results
  resultsDiv.innerHTML = `
      <h3>Analysis Results</h3>
      <p><strong>Entities:</strong> ${entityList || 'N/A'}</p>
      <p><strong>Topics:</strong> ${topicList || 'N/A'}</p>
  `;
}


export { handleSubmit };
