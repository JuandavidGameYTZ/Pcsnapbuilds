const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Permite peticiones del frontend

// Conectar a MongoDB (Asegúrate de que MongoDB esté corriendo)
mongoose.connect('mongodb://localhost:27017/pcsnapbuild', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Definir el modelo de productos
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: { type: String, default: 'https://example.com/default-image.jpg' } // Imagen por defecto
});

const Product = mongoose.model('Product', ProductSchema);

// Ruta para obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

// Ruta para agregar un producto
app.post('/api/products', async (req, res) => {
  const { name, price, description, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      image: image || 'https://example.com/default-image.jpg' // Imagen por defecto si no se proporciona
    });

    await newProduct.save();
    res.status(201).json(newProduct);  // Devuelve el producto recién creado
  } catch (error) {
    res.status(400).json({ message: 'Error al agregar el producto' });
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

    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
