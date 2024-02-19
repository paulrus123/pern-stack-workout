const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// use routes
app.use('/api/excercises', require('./routes/excercises'));
app.use('/api/users', require('./routes/users'));

app.get('/api', (req, res) => {
    res.send('Welcome to the API');
});

// initialize
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
;