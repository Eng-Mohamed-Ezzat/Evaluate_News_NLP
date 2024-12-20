// Replace checkForName with a function that checks the URL
import { checkForName } from './nameChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'https://localhost:8000/api'

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const formText = document.getElementById('name').value;
    if (formText === "") {
      alert("Please enter a URL!");
      return;
    }
    fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ url: formText }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById('results').innerHTML = `
          Polarity: ${data.polarity}<br>
          Subjectivity: ${data.subjectivity}<br>
          Snippet: ${data.text}
        `;
      });
  }
  


// Function to send data to the server

// Export the handleSubmit function
export { handleSubmit };

