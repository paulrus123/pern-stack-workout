const express = require('express');
const router = express.Router();

let Example = require('../models/example.model');

router.route('/').get((req,res) => {
    Example.find()
        .then(examples => res.json(examples))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    console.log("add was called");
    const name = req.body.name;
    const description = req.body.description;

    const newExample = new Example({
        name,
        description,
    });

    newExample.save()
        .then(() => res.json('Example added!'))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/clear').post(async (_req, res) => {
    console.log("clear was called");
    await Example.deleteMany({ name: 'Paul' });

    res.json('Cleared');
});

module.exports = router;

;