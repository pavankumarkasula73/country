const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/user/country', async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const { country } = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ country });
});

module.exports = router;
