const { Pool } = require('pg');
require('dotenv').config(); 

const pool = new Pool({
    user: process.env.POSTGRES_DB_USER,
    host: process.env.POSTGRES_DB_HOST,
    database: process.env.POSTGRES_DB_NAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    port: process.env.POSTGRES_DB_PORT,
});


function ConnectToPostgres(callback) {
    pool.connect((err, _client, release) => {
        if (err) {
            console.error('Error connecting to PostgreSQL:', err);
            if (callback) {
                callback(err);
            }
            return;
        }

        console.log('Connected to PostgreSQL database');

        // Release the client back to the pool
        release();

        if (callback) {
            callback();
        }
    });
}

function GetSessionDetails(sessionId, callback) {
    pool.connect((connectError, client, release) => {
        if (connectError) {
            console.error('Error acquiring client from pool:', connectError);
            release();
            callback(connectError, null);
            return;
        }

        // Use $1 as a placeholder for the parameter in the SQL query
        const query = 'SELECT * FROM your_table WHERE column_name = $1';

        // Pass the parameter as an array in the second argument of client.query
        client.query(query, [sessionId], (queryError, result) => {
            // Release the client back to the pool regardless of the query result
            release();

            if (queryError) {
                console.error('Error executing query:', queryError);
                callback(queryError, null);
            } else {
                // Pass the result to the callback
                callback(null, result.rows);
            }
        });
    });
}

module.exports = ConnectToPostgres, GetSessionDetails;
