const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  quantity: Number,
  variants: String,
  category: String
});

module.exports = mongoose.model('Product', productSchema);

