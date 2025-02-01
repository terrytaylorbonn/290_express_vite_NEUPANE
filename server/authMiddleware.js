// /server/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('(authMiddleware) decoded:', decoded);
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};
module.exports = authMiddleware;
