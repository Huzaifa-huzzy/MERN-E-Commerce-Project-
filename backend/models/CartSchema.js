// models/CartSchema.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the User model
    required: true,
    unique: true, // Ensures each user has only one cart
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // References the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1, // Default quantity is 1
        min: 1, // Ensures quantity is at least 1
      },
      selectedOptions: {
        type: Map,
        of: String, // Matches the ProductSchema's options field
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp for when the cart was created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Timestamp for when the cart was last updated
  },
});

// Middleware to update the `updatedAt` field whenever the cart is modified
CartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Cart', CartSchema);