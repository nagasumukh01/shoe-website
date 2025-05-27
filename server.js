const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 3001;

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from "public" directory
app.use(express.static('public'));

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',      // your DB host
  port: 3306,             // default MySQL port
  user: 'Lenovo',         // your MySQL username
  password: 'Naga@2005',  // your MySQL password
  database: 'beautiful_shoes'  // your database name
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
  } else {
    console.log('✅ Connected to MySQL Database.');
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Shoe Store API!');
});

// Get all shoes
app.get('/api/shoes', (req, res) => {
  const query = 'SELECT * FROM shoes'; // adjust table name if needed

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

// Contact form submission route (handle POST /contact)
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  // Example: Insert contact message into a table named 'contacts'
  const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error saving contact message:', err);
      return res.status(500).json({ error: 'Failed to save contact message.' });
    }
    res.json({ message: 'Contact form submitted successfully!' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
