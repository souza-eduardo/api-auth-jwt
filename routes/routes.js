const express = require('express');
const router = express.Router();
const User = require('../models/user');

const { createUser, getUsers, getUser } = require('../controllers/userController');

router.post('/register', createUser);

router.get('/users', getUsers);

router.get('/users/:id', getUser);

module.exports = router;