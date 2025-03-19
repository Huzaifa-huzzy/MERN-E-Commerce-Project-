const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
  SubCategory: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
});
module.exports = mongoose.model('SubCategory', SubCategorySchema);