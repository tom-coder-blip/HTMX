// Imports the Express.js framework
import express from 'express';

//Initializes an Express application.
const app = express();

// Set static folder
// telling express to use the public directory which has our html
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle GET request to fetch users
app.get('/users', async (req, res) => {
    setTimeout(async () => {
        const limit = +req.query.limit || 10;  //+req.query.limit controls he number of users being returned

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
        );

        const users = await response.json()
        res.send(`
    <h2>Users</h2>
    <ul class="list-group">
    ${users.map((user) => `<li class="list-group-item">${user.name}</li>`).join('')}
    </ul>
    `)
    }, 2000)
});


// Starts the server on port 3000
// Logs "Server listening on port 3000" to the console.
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});