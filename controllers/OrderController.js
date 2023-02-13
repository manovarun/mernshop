const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const Order = require('../models/Order');

exports.addOrderItem = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems.length === 0) {
    return next(new AppError('No order items', 400));
  }

  let order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  order = await order.save();

  res.status(201).json({ status: 'success', order });
});

exports.getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  res.status(200).json({ status: 'success', order });
});

exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  order.isPaid = true;
  order.paidAt = Date.now();

  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  };

  order = await order.save();

  res.status(200).json({ status: 'success', order });
});
