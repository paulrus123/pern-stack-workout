const express = require('express');
const router = express.Router();
const sequelize = require('../controllers/sequelizeClient');
const initModels = require("../models/init-models");

// initialize models
console.log("Initializing excercises models");
var excerciseModels = initModels.initExcerciseModels(sequelize);

// get all excercises
router.get('/definitions', async (_req, res) => {
    const excercises = await excerciseModels.excercise_definitions.findAll()
    console.log(JSON.stringify(excercises, null, 2));
    res.json(excercises);
});

router.route('/singleSet').post(async (req, res) => {

    const session_id = req.body.session_id;
    const reps = req.body.reps;
    const weight = req.body.weight;

    const excercise = await excerciseModels.excercise_definitions.findOne({ where: { excercise_name: req.body.excercise }});
    if(!excercise) {
        console.error("No excercise was found");
        res.status(404).json('No excercise was found');
    }

    else {
        console.log("add a set was called: " + session_id, + " " + excercise.excercise_id + " " + reps + " " + weight);
        const newSet = new excerciseModels.single_set({session_id: session_id, excercise_id: excercise.excercise_id, num_reps: reps, weight:weight});

        await newSet.save();
        res.json('New set added!');
    }
});

// export the router module so that the server.js can use it.
module.exports = router;