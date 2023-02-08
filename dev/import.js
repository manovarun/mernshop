const dotenv = require('dotenv').config({ path: '.env' });
const connectDB = require('../db');
const Product = require('../models/Product');
let products = require('./products');

connectDB();

const importData = async () => {
  products = products.map((product) => ({
    ...product,
    user: '63cc24665e57f4a4f56b71f2',
  }));
  try {
    await Product.create(products);
    console.log('Data successfully imported!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data successfully deleted!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
