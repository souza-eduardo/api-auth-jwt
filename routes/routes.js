const express = require('express');
const router = express.Router();
const User = require('../models/user');

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser } = require('../controllers/userController');

const { login } = require('../controllers/loginController');

router.post('/register', createUser);

router.post('/login', login);

router.get('/users', getUsers);

router.get('/users/:id', getUser);

router.patch('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);


module.exports = router;