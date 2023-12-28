const mongoose = require('mongoose');
require('dotenv').config(); 

function ConnectToMongoDb(callback) {
    mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const connection = mongoose.connection;

    connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        if (callback) {
            callback(err);
        }
    });

    connection.once('open', () => {
        console.log('MongoDB database connection established successfully');
        if (callback) {
            callback();
        }
    });
}

module.exports = ConnectToMongoDb;
