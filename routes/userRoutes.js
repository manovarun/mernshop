const express = require('express');
const { register, login } = require('../controllers/AuthController');
const {
  createUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/UserController');
const { protect, isAdminUser } = require('../middlewares/Auth');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/').post(protect, isAdminUser, createUser);
router.route('/').get(protect, isAdminUser, getUsers);

module.exports = router;
