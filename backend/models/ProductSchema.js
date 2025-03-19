const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  categoryName: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category',
    required: true
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SubCategory',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String
  },
  options: {
    type: Map,
    of: String
  }
});

module.exports = mongoose.model('Product', ProductSchema);