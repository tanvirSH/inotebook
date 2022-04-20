const express = require('express');
const User = require('../models/User');

const router = express.Router();

//Create user using: POST 'api/auth'

router.post('/', (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.json(req.body);
});
router.get('/', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

module.exports = router;