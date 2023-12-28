const ConnectToMongoDb = require("./controllers/mongooseClient");
const ConnectToPostgres = require("./controllers/postgresClient");
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Connect to dbs
ConnectToMongoDb();
ConnectToPostgres((err) => {
    if (err) {
        console.error('Failed to connect to PostgreSQL:', err);
    } else {
        console.log('Successfully connected to PostgreSQL');
    }
});

// include route files
const usersRoute = require('./routes/users');
const examplesRouter = require('./routes/example');
const workoutRouter = require('./routes/workout')

// use routes
app.use('/users', usersRoute);
app.use('/examples', examplesRouter);
app.use('/workout', workoutRouter);

// initialize
app.get('/', (_req, res) => {
    res.send('Homepage! try out the examples route...');
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
;