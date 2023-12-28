const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('this is the user route');
});

router.get('/101', (req, res) => {
    res.send('this is the user 101 route');
});

router.get('/102', (req, res) => {
    res.send('this is the user 102 route');
});

// export the router module so that the server.js can use it.
module.exports = router;