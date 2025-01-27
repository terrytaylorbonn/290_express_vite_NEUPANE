//server.js
const express = require('express');
const app = express();

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173' // only accept from this origin
};
app.use(cors(corsOptions));

app.get('/api', (req, res) => {
    res.json({fruits: ['aaaa', 'dddd', 'cccc']});
});
    
app.listen(8080, () => {
    console.log('290 Server running on http://localhost:8080');
});

