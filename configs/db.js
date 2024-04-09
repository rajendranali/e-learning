require('dotenv').config(); // Load environment variables from .env file
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DatabaseUrl, // Corrected variable name
});

// Connect to the database
// client.connect()
//   .then(() => console.log('Connected to the database'))
//   .catch(error => console.error('Error connecting to the database:', error));

module.exports = client; // Export the client object for use in other files

