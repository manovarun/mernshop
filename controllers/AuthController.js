const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const AppError = require('../utils/AppError');

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(
      new AppError('Please provide a valid name, email and password')
    );
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new AppError('User already exists', 400));
  }

  user = await User.create({ name, email, password });

  if (!user) {
    return next(new AppError('Unable to create user', 400));
  }

  const token = await user.getSignedJWTToken();

  res.status(201).json({ status: 'success', user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide a valid email and password'));
  }

  const user = await User.findOne({ email });

  if (!user) return next(new AppError('User not found, please try again', 400));

  const isMatch = await user.matchPassword(password);

  if (!isMatch)
    return next(new AppError('Invalid password, please try again', 401));

  const token = await user.getSignedJWTToken();

  return res.status(200).json({ status: 'success', token, user });
});
