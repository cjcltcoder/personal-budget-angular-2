const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: 'Rent',
            budget: 275
        },
        {
            title: 'Grocery',
            budget: 110
        },
    ]
};

app.get('/budget', (req, res) => {
    res.json(budget);
});

const data = [10, 20, 30, 40, 50];
const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];

// Route to serve the data for the pie chart
app.get('/chart', (req, res) => {
  res.json({ data, labels });
});

// Route to serve the HTML page with the D3.js chart
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});