//server.js
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173' // only accept from this origin
};
app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Import the model
const MyModel = require('./model');
// Create a sample document
// app.get('/api/create', async (req, res) => {
app.post('/api/create', async (req, res) => {
        try {
          const { field1, field2, field3 } = req.body;
          const newDocument = new MyModel({
            // field1: 'Sample String',
            // field2: 123,
            // field3: ['item1', 'item2', 'item3']
            field1,
            field2,
            field3
          });
        await newDocument.save();
        console.log(newDocument); // Print newDocument to the console
        res.json(newDocument);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/api', (req, res) => {
    res.json({fruits: ['aaaa', 'dddd', 'cccc']});
});
    
app.listen(8080, () => {
    console.log('#290 25.0128 09:44 Server http://localhost:8080');
});

