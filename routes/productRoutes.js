const express = require('express');
const {
  getProducts,
  createProduct,
  getProduct,
} = require('../controllers/ProductController');
const { protect, isAdminUser } = require('../middlewares/Auth');

const router = express.Router();

router.route('/').get(getProducts);

router.route('/:id').get(getProduct);

router.route('/').post(protect, isAdminUser, createProduct);

module.exports = router;
