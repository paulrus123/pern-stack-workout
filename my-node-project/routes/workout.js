const express = require('express');
const router = express.Router();
const sequelize = require('../controllers/sequelizeClient');
const initModels = require("../models/init-models");
const single_set = require('../models/single_set');

// initialize models
console.log("Initializing models");
var models = initModels(sequelize);

router.get('/', (_req, res) => {
    res.send('this is the workout route');
});

// get all users
router.get('/users', async (_req, res) => {
    const users = await models.users.findAll()
    console.log(JSON.stringify(users, null, 2));
    res.json(users);
});

// get a single user
router.get('/user', async (req, res) => {
    // Get rid of extra doublequotes
    const user_name = req.query.user_name.replace(/\"/g, "");
    try {
        const user = await models.users.findOne({ where: { user_name: user_name } });
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
});

// Update user information or create a new user based on email
router.route('/putUser').put(async (req, res) => {
    const userEmail = req.body.email; // Assuming the property in your request body is 'email'
    const userName = req.body.name;

    try {
        let user = await models.users.findOne({ where: { email: userEmail } });

        if (!user) {
            // If user doesn't exist, create a new user
            user = await models.users.create({
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
});

// get all excercises
router.get('/excercises', async (_req, res) => {
    const excercises = await models.excercise_definitions.findAll()
    console.log(JSON.stringify(excercises, null, 2));
    res.json(excercises);
});

router.route('/singleSet').post(async (req, res) => {

    const session_id = req.body.session_id;
    const reps = req.body.reps;
    const weight = req.body.weight;

    const excercise = await models.excercise_definitions.findOne({ where: { excercise_name: req.body.excercise }});
    if(!excercise) {
        console.error("No excercise was found");
        res.status(404).json('No excercise was found');
    }

    else {
        console.log("add a set was called: " + session_id, + " " + excercise.excercise_id + " " + reps + " " + weight);
        const newSet = new models.single_set({session_id: session_id, excercise_id: excercise.excercise_id, num_reps: reps, weight:weight});

        await newSet.save();
        res.json('New set added!');
    }
});

router.get('/102', (req, res) => {
    res.send('this is the user 102 route');
});

// export the router module so that the server.js can use it.
module.exports = router;