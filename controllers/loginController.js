require('dotenv').config();
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const login = (async (req, res) => {

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid e-mail or password' });
    }

    const verifyPass = await bcryptjs.compare(password, user.password);

    if (!verifyPass) {
      return res.status(400).json({ message: 'Invalid e-mail or password' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '8h' });
    
    return res.json({
      userName: user.userName,
      email: user.email,
      token: token
    });
  } catch (error) {
    console.error(error);
    res.send(500).json({ message: 'Internal server error' });
  }
});

module.exports = {
  login
};