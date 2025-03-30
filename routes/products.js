const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const { name, price, description, image } = req.body;

  const newProduct = new Product({
    name,
    price,
    description,
    image
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
