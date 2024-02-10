const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {

  const user =  new User ({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
});

router.get('/', async (req, res) => {
  res.send('Hello World!');
});

module.exports = router;