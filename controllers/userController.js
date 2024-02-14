const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createUser = (async (req, res) => {

  const { userName, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'E-mail already exists' });

  const hashPassword = await bcryptjs.hash(password, 8);

  const newUser = new User({
    userName,
    email,
    password: hashPassword
  });

  try {
    await newUser.save();
    res.status(201).json({ userName: newUser.userName, email: newUser.email });
  } catch (error) {
    res.status(400).json(error);
  }
});

const getUser = (async (req, res) => {
  return res.json(req.user);
});

const updateUser = (async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const options = { new: true };
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, options);
    res.status(200).send({id: updatedUser._id, userName: updatedUser.userName, email: updatedUser.email});
  } catch (error) {
    res.status(400).json(updatedUser);
  }
});

const deleteUser = (async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.send(`Successfully deleted: ${deletedUser.userName}`);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser
};