const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const createUser = (async (req, res) => {

  const user =  new User ({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  });
  
  try {
    const userToSave = await user.save();
    res.status(201).json(userToSave);
  } catch (error) {
    res.status(400).json(error);
  }
});

const getUsers = (async (req, res) => {

  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
});

const getUser = (async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = {
  createUser,
  getUsers,
  getUser
};