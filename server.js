const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Habilita CORS para evitar errores en el frontend

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/pcsnapbuild', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Definir el esquema y modelo de productos
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String
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

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
