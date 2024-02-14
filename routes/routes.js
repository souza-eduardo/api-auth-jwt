const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../auth/authMiddleware');

const {
  createUser,
  getUser,
  updateUser,
  deleteUser } = require('../controllers/userController');

const { login } = require('../controllers/loginController');

router.post('/register', createUser);
router.post('/login', login);

router.use(authMiddleware);

router.get('/user', getUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


module.exports = router;