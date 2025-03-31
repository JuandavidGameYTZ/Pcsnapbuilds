const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Product = require('./Product');  // Importamos el modelo correctamente

const app = express();
app.use(express.json());
app.use(cors());  // Permite peticiones del frontend

// Servir archivos estáticos (CSS, JS, imágenes) desde la raíz del proyecto
app.use(express.static(path.join(__dirname)));  

// Conectar a MongoDB (Asegúrate de que MongoDB esté corriendo)
mongoose.connect('mongodb://localhost:27017/pcsnapbuild', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Ruta para obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// Ruta para agregar un producto
app.post('/api/products', async (req, res) => {
  const { name, price, description, image, quantity, variants, category } = req.body;

  const newProduct = new Product({
    name,
    price,
    description,
    image,
    quantity,
    variants,
    category
  });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).json({ message: 'Error al agregar producto' });
  }
});

// Ruta para eliminar un producto
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});

// Escuchar el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
