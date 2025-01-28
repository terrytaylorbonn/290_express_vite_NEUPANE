//server.js
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173' // only accept from this origin
};
app.use(cors(corsOptions));

// Connect to MongoDB
const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/api', (req, res) => {
    res.json({fruits: ['aaaa', 'dddd', 'cccc']});
});
    
app.listen(8080, () => {
    console.log('290 Server running on http://localhost:8080');
});

