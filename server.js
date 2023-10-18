const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors'); // Import the cors package
const app = express();
const PORT = 4000;

const origin = process.argv[2];

app.use(cors({ origin }));

// app.use(cors({ origin: 'http://20.160.160.36:3000' })); // Allow requests from React app

app.use(express.static(path.join(__dirname, 'build')));

// app.use(express.json());

// let selectedCostKey = 'Internet'; // Default cost factor key
app.get('/get-cost-factor', (req, res) => {
    // Always send the current selected cost key and its value in the response
    res.json({ selectedCostKey, selectedCostValue });
  });

// Add a new route for updating the cost factor
app.post('/update-cost-factor', (req, res) => {
    const { costFactorKey } = req.body;
  
    // Check if the costFactorKey is valid and update it
    if (costFactors[costFactorKey]) {
      selectedCostKey = costFactorKey;
      res.status(200).json({ message: 'Cost factor updated successfully.' });
    } else {
      res.status(400).json({ message: 'Invalid cost factor key.' });
    }
  });
  

app.get('/poll', async (req, res) => {
    try {
        const response = await axios.get('http://database.techtalk.com:8080/poll');
        res.json(response.data);
    } catch (error) {
        console.error('Error connecting to Go server:', error.message);
        res.status(500).send('Failed to connect to Go server');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unexpected Error:', err.stack);
    res.status(500).send('Unexpected server error.');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});