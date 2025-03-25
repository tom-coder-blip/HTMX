const express = require('express'); // Import the Express framework
const fetch = require('node-fetch'); // Import node-fetch to make HTTP requests
const bodyParser = require('body-parser'); // Import body-parser to parse request bodies
const path = require('path'); // Import path module to work with file and directory paths

const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (e.g., index.html)
app.use(express.static(__dirname)); 

// Handle POST request for user search
app.post('/search', async (req, res) => {
    const searchTerm = req.body.search.toLowerCase(); // Convert search term to lowercase for case-insensitive matching

    if (!searchTerm) {
        return res.send('<tr></tr>'); // Return empty row if no search term provided
    }

    // Fetch user data from external API
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    // Filter users based on name or email containing the search term
    const searchResults = users.filter((user) => {
        const name = user.name.toLowerCase();
        const email = user.email.toLowerCase();
        return name.includes(searchTerm) || email.includes(searchTerm);
    });

    // Generate HTML rows for search results
    const searchResultHtml = searchResults
        .map((user) => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
            </tr>
        `)
        .join('');

    res.send(searchResultHtml); // Send the generated HTML as response
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

