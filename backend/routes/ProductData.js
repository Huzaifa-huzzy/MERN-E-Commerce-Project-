// routes/ProductData.js
const express = require('express');
const router = express.Router();
const Product = require('../models/ProductSchema');
const Category = require('../models/CategorySchema');
const SubCategory = require('../models/SubCateSchema');

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('categoryName', 'name') // Only populate the 'name' field from Category
      .populate('subCategory', 'name');  // Only populate the 'name' field from SubCategory
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('categoryName', 'name')
      .populate('subCategory', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;