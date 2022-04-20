const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        a: 'hello A',
        number: 786
    }
    res.json(obj);
});

module.exports = router;