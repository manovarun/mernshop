const express = require('express');
const {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require('../controllers/OrderController');
const { protect, isAdminUser } = require('../middlewares/Auth');
const router = express.Router();

router.route('/').post(protect, addOrderItem);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, isAdminUser, updateOrderToPaid);

module.exports = router;
