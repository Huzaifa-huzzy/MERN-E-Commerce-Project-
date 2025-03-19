// routes/CartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/CartSchema');
const Product = require('../models/ProductSchema');
const authMiddleware = require('../middleware/auth');

// Middleware to ensure the user is authenticated
router.use(authMiddleware);

// Add a product to the cart
router.post('/add', async (req, res) => {
  try {
    const { productId, quantity, selectedOptions } = req.body;
    const userId = req.user.id;
    
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Find or create the user's cart
    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity: quantity || 1, selectedOptions }],
      });
    } else {
      // If cart exists, check if the product with the same options is already in the cart
      const productIndex = cart.products.findIndex(
        (item) =>
          item.product.toString() === productId &&
          JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions || {})
      );
      
      if (productIndex > -1) {
        // If the product with the same options exists, update the quantity
        cart.products[productIndex].quantity += quantity || 1;
      } else {
        // If the product or options are different, add a new entry
        cart.products.push({ product: productId, quantity: quantity || 1, selectedOptions });
      }
    }
    
    // Save the cart
    await cart.save();
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get the user's cart
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: 'products.product',
        populate: [
          { path: 'categoryName', model: 'Category' },
          { path: 'subCategory', model: 'SubCategory' },
        ],
      });
    
    if (!cart) {
      return res.status(200).json({ message: 'Cart is empty', cart: { products: [] } });
    }
    
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update product quantity in cart
router.put('/update/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;
    
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
    
    cart.products[productIndex].quantity = quantity;
    await cart.save();
    
    res.status(200).json({ message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove a product from the cart
router.delete('/remove/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.products = cart.products.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Clear cart
router.delete('/clear', async (req, res) => {
  try {
    const userId = req.user.id;
    
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.products = [];
    await cart.save();
    
    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;