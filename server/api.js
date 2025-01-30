//server/api.js
const express = require('express');
const router = express.Router();
const MyModel = require('./model');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
router.post('/api/create', async (req, res) => {
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

router.get('/api', (req, res) => {
    res.json({ fruits: ['jan', '30', '2025'] });
});

module.exports = router;