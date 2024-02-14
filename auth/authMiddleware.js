const User = require('../models/user');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const loggedUser = await User.findById(id);

    req.user = {id: loggedUser._id, userName: loggedUser.userName, email: loggedUser.email};

    next();
  } catch (error) {
    res.status(500).json({message: 'Internal Server Error', error});
  }
}

module.exports = authMiddleware;