const express = require('express');
const {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
} = require('../controllers/OrderController');
const { protect, isAdminUser } = require('../middlewares/Auth');
const router = express.Router();

router.route('/').post(protect, addOrderItem);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, isAdminUser, updateOrderToPaid);

module.exports = router;
