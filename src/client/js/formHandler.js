async function handleSubmit(event) {
  event.preventDefault();

  // Get the form input
  const formText = document.getElementById('name').value;
  if (!formText) {
      alert('Please enter a URL');
      return;
  }

  console.log('::: Form Submitted :::');

  // Send the URL to the backend for analysis
  try {
      const response = await fetch('http://localhost:8081/api', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: formText }),
      });

      const data = await response.json();

      // Extract Polarity, Subjectivity, and Snippet
      const sentences = data.response?.sentences || [];
      const snippet = sentences.length > 0
          ? sentences.map(sentence => sentence.words.map(word => word.token).join(' ')).join('. ')
          : 'Not available';

      // Placeholder for Polarity and Subjectivity (as they are not in the response)
      const polarity = 'Not available';
      const subjectivity = 'Not available';

      // Extract Entities and Topics
      const entitiesList = data.response.entities?.map(entity => entity.matchedText).join(', ') || 'None';
      const topicsList = data.response.topics?.map(topic => topic.label).join(', ') || 'None';

      // Update the results UI
      document.getElementById('results').innerHTML = `
          <h3>Analysis Results:</h3>
          <p><strong>Polarity:</strong> ${polarity}</p>
          <p><strong>Subjectivity:</strong> ${subjectivity}</p>
          <p><strong>Snippet:</strong> ${snippet}</p>
          <p><strong>Entities:</strong> ${entitiesList}</p>
          <p><strong>Topics:</strong> ${topicsList}</p>
      `;
  } catch (error) {
      console.error('Error during API request:', error);
      alert('Failed to analyze the URL. Please try again.');
  }
}

export { handleSubmit };
