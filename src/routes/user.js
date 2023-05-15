const express = require('express');
const router = express.Router();
const User = require('../bussiness/User');
const ServiceActionResult = require('../model/ServiceActionResult');

// POST route for handling the request
router.post('/', async (req, res) => {
    const code = req.body.code;
    const name = req.body.name;

    const user = new User();
    const result = await user.insert(code, name);

    const serviceActionResult = new ServiceActionResult(result);

    res.send(serviceActionResult);
});

module.exports = router;