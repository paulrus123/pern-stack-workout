const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.POSTGRES_DB_HOST,
    port: process.env.POSTGRES_DB_PORT,
    username: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
});

module.exports = sequelize;