//server/api.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const MyModel = require('./model');

// the next 2 were missiing!
const User = require('./userModel'); // Ensure this is correctly imported
const authMiddleware = require('./authMiddleware');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');

// this was missing!
require('dotenv').config();

// Swagger setup
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
                url: process.env.SERVER_URL // Local server URL
            },
            {
                url: process.env.CORS_ORIGIN // Client application URL
            }
        ]
    },
//    apis: ['./server.js']
    apis: ['./api.js'] ///////////////////
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// User registration
router.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// User login
router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a route to get all users (for verification purposes)
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


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
router.post('/api/create', authMiddleware, async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log the request body
        const { field1, field2, field3 } = req.body;
        const newDocument = new MyModel({
            field1,
            field2,
            field3
        });
        await newDocument.save();
        console.log('New document created:', newDocument); // Print newDocument to the console
        res.json(newDocument);
    } catch (err) {
        console.error('Error creating document:', err); // Log the error
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/read:
 *   get:
 *     summary: Retrieve a list of documents
 *     tags: [MyModel]
 *     responses:
 *       200:
 *         description: A list of documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MyModel'
 *       500:
 *         description: Some server error
 */
router.get('/api/read', async (req, res) => {
    try {
        const documents = await MyModel.find();
        res.json(documents);
    } catch (err) {
        console.error('Error fetching documents:', err); // Log the error
        res.status(500).json({ error: err.message });
    }
});


router.get('/api', (req, res) => {
    res.json({ fruits: ['jan', '30', '2025'] });
});

// GraphQL endpoint
router.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


module.exports = router;