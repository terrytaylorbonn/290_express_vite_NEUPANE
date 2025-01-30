//server.js
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    // origin: 'http://localhost:5173' // only accept from this origin
    origin: process.env.CORS_ORIGIN // use the environment variable for the origin
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
// Import and use the API routes
const apiRoutes = require('./api');
app.use(apiRoutes);
//=====================================================    
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
        // console.log('#290 25.0128 09:44 Server http://localhost:8080');
    console.log(`290 25.0128 14:53 server URL = ${process.env.SERVER_URL} and CORS origin = ${process.env.CORS_ORIGIN}`);
});

