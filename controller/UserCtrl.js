const User = require('../model/UserModel');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');


const UserCtrl = {
  register: async (req, res) => {
    const user = await User.create({ ...req.body });

    const { name } = user;
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ name, token });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError('All fields must be filled.');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError('No user with this email.');
    }

    const isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword) {
      throw new UnauthenticatedError('Incorrect password entered.');
    }

    const { name } = user;
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ name, token });
  },
}


module.exports = UserCtrl;