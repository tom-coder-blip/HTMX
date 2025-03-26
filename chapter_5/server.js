const express = require('express'); // Import the Express framework
const app = express(); // Create an instance of an Express application
const port = 3000; // Define the port number the server will listen on

// Middleware to parse URL-encoded data from incoming requests
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the current directory
app.use(express.static(__dirname));

// Route to handle POST requests to '/email'
app.post('/email', (req, res) => {
  const submittedEmail = req.body.email; // Extract email input from the request body
  
  // Regular expression pattern for validating email addresses
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if the submitted email matches the regular expression
  if (emailRegex.test(submittedEmail)) {
    // If email is valid, return an input field with a success message
    return res.send(`
      <div class="mb-3" hx-target="this" hx-swap="outerHTML">
        <label class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          name="email"
          hx-post="/email"
          value="${submittedEmail}"
        >
        <div class="alert alert-success" role="alert">
          That email is valid ✅
        </div>
      </div>
    `);
  } else {
    // If email is invalid, return an input field with an error message
    return res.send(`
      <div class="mb-3" hx-target="this" hx-swap="outerHTML">
        <label class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          name="email"
          hx-post="/email"
          value="${submittedEmail}"
        >
        <div class="alert alert-danger" role="alert">
          Please enter a valid email address ❌
        </div>
      </div>
    `);
  }
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});