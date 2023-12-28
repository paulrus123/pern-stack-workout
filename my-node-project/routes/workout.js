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
    // get rid of extra doublequotes
    const user_name = req.query.user_name.replace(/\"/g, "");
    const users = await models.users.findAll({ where: { user_name: user_name }})
    console.log(JSON.stringify(users, null, 2));
    res.json(users);
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