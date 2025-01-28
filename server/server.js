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

// Import the model
const MyModel = require('./model');

// Swagger setup
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation'
        },
        servers: [
            {
                // url: 'http://localhost:8080'
                url: process.env.SERVER_URL // Local server URL
            }
        ]
    },
    apis: ['./server.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/**
 * @swagger
 * components:
 *   schemas:
 *     MyModel:
 *       type: object
 *       required:
 *         - field1
 *         - field2
 *         - field3
 *       properties:
 *         field1:
 *           type: string
 *           description: The first field
 *         field2:
 *           type: integer
 *           description: The second field
 *         field3:
 *           type: array
 *           items:
 *             type: string
 *           description: The third field
 */
/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Create a new document
 *     tags: [MyModel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MyModel'
 *     responses:
 *       200:
 *         description: The created document
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MyModel'
 *       500:
 *         description: Some server error
 */


// Create a sample document
// app.get('/api/create', async (req, res) => {
app.post('/api/create', async (req, res) => {
        try {
            console.log('Request body:', req.body); // Log the request body
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
        console.error('Error creating document:', err); // Log the error
        res.status(500).json({ error: err.message });
    }
});


app.get('/api', (req, res) => {
    res.json({fruits: ['aaaa', 'dddd', 'cccc']});
});
    
// app.listen(8080, () => {
app.listen(PORT, () => {
        // console.log('#290 25.0128 09:44 Server http://localhost:8080');
    console.log(`290 25.0128 14:53 server URL = ${process.env.SERVER_URL} and CORS origin = ${process.env.CORS_ORIGIN}`);
});

