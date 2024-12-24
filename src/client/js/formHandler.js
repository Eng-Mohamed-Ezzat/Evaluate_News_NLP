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
  
    // Extract entities and calculate frequencies
    const entities = data.response.entities || [];
    const entityCounts = {};
    entities.forEach(entity => {
      const key = entity.entityId || entity.matchedText || 'Unknown';
      entityCounts[key] = (entityCounts[key] || 0) + 1;
    });
  
    // Find the most common entity
    const mostCommonEntity = Object.entries(entityCounts).reduce(
      (max, [key, count]) => (count > max.count ? { entity: key, count } : max),
      { entity: 'N/A', count: 0 }
    );
  
    // Extract topics and calculate frequencies
    const topics = data.response.topics || [];
    const topicCounts = {};
    topics.forEach(topic => {
      const key = topic.label || 'Unknown';
      topicCounts[key] = (topicCounts[key] || 0) + 1;
    });
  
    // Find the most common topic
    const mostCommonTopic = Object.entries(topicCounts).reduce(
      (max, [key, count]) => (count > max.count ? { topic: key, count } : max),
      { topic: 'N/A', count: 0 }
    );
  
    // Display results
    resultsDiv.innerHTML = `
        <h3>Analysis Results</h3>
        <p><strong>Entities:</strong> ${Object.keys(entityCounts).join(', ') || 'N/A'}</p>
        <p><strong>Most Common Entity:</strong> ${mostCommonEntity.entity} (${mostCommonEntity.count} times)</p>
        <p><strong>Topics:</strong> ${Object.keys(topicCounts).join(', ') || 'N/A'}</p>
        <p><strong>Most Common Topic:</strong> ${mostCommonTopic.topic} (${mostCommonTopic.count} times)</p>
    `;
  }
  


export { handleSubmit };
