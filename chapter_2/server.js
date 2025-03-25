const express = require('express'); // Import the Express framework
const app = express(); // Create an instance of an Express app
const port = 3000; // Define the port number

// Middleware to parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (e.g., index.html) from the current directory
app.use(express.static(__dirname)); 

// Handle POST requests to the '/calculate' endpoint
app.post('/calculate', (req, res) => {
  // Parse height and weight from the request body
  const height = parseFloat(req.body.height);
  const weight = parseFloat(req.body.weight);
  
  // Validate input: Ensure height and weight are positive numbers
  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return res.send(`<p>Please enter valid numbers for height and weight.</p>`);
  }
  
  // Calculate BMI (Body Mass Index)
  const bmi = weight / (height * height);

  // Send response with the calculated BMI
  res.send(`
    <p>Height: ${height} m & Weight: ${weight} kg</p>
    <p>Your BMI is <strong>${bmi.toFixed(2)}</strong></p>
  `);
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});