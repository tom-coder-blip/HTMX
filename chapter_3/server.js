const express = require('express'); // Import the Express framework
const app = express(); // Create an Express application
const port = 3000; // Define the port the server will run on

// Middleware to parse incoming requests with URL-encoded and JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (including index.html) from the current directory
app.use(express.static(__dirname));

// Define a route to fetch the current Bitcoin price from CoinGecko API
app.get('/get-price', async (req, res) => {
  try {
      // Fetch Bitcoin price in USD from CoinGecko API
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      
      // Check if the response is successful
      if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
      }

      // Parse the response JSON data
      const data = await response.json();
      const price = data.bitcoin.usd; // Extract the Bitcoin price in USD

      // Send the price as a formatted HTML response
      res.send(`<div class="price-display success">$${price.toLocaleString()}</div>`);
  } catch (error) {
      console.error('Price fetch error:', error); // Log error to the console

      // Send an error message as an HTML response
      res.send(`
          <div class="price-display error">
              Unable to fetch price
              <span class="error-details">🔄 Retrying...</span>
          </div>
      `);
  }
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});