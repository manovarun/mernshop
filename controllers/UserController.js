const expressAsyncHandler = require('express-async-handler');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const AppError = require('../utils/AppError');

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create({ ...req.body });

  if (!user) {
    return next(new AppError('Unable to create user', 400));
  }

  return res.status(201).json({ status: 'success', user });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    return next(new AppError('Unable to find users', 404));
  }

  return res
    .status(200)
    .json({ status: 'success', users, results: users.length });
});

exports.getUserProfile = asyncHandler(async (req, res, next) => {
  let user = req.user;

  if (!user) {
    return next(new AppError('User not authorized', 401));
  }

  res.status(200).json({ status: 'success', user });
});

exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  user.name = req.body.name || user.name;

  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  user = await user.save();

  res.status(200).json({ status: 'success', user });
});
