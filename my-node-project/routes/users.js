const express = require('express');
const router = express.Router();
const sequelize = require('../controllers/sequelizeClient');
const initModels = require("../models/init-models");

// initialize models
console.log("Initializing models");
var usersModel = initModels.initUsersModel(sequelize);

router.get('/', async (_req, res) => {
    const users = await usersModel.users.findAll()
    console.log(JSON.stringify(users, null, 2));
    res.json(users);
});

// get a single user
router.get('/user', async (req, res) => {
    try {
        // Get rid of extra doublequotes
        const user_name = req.query.user_name.replace(/\"/g, "");

        try {
            const user = await usersModel.users.findOne({ where: { user_name: user_name } });
            if (user) {
                console.log(JSON.stringify(user, null, 2));
                res.json(user);
            } else {
                console.error('User not found');
                res.status(404).json('User not found');
            }
        } catch (error) {
            console.error('Error during GET user request:', error);
            res.status(500).json('Internal Server Error');
        }

    } catch (error) {
        console.error('Error during GET user request:', error);
        res.status(400).json('Bad request:' + error);
    }
});

// Update user information or create a new user based on email
router.route('/putUser').put(async (req, res) => {
    try {
        const userEmail = req.body.email; // Assuming the property in your request body is 'email'
        const userName = req.body.name;
    
        try {
            let user = await usersModel.users.findOne({ where: { email: userEmail } });
    
            if (!user) {
                // If user doesn't exist, create a new user
                user = await usersModel.users.create({
                    name: userName,
                    email: userEmail,
                });
                res.json('New user created!');
            } else {
                // If user exists, update the information
                user.name = userName;
                user.email = userEmail;
                await user.save();
                res.json('User updated successfully!');
            }
        } catch (error) {
            console.error('Error during PUT user request:', error);
            res.status(500).json('Internal Server Error');
        }
    } catch(error) {
        res.status(400).json("Bad putUser request");
    }
});

// export the router module so that the server.js can use it.
module.exports = router;