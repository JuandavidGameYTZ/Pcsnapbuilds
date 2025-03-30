const express = require('express');
const app = express();

// Middleware para manejar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola, Mundo! Esta es la ruta principal de la API.');
});

// Ruta de la API
app.get('/api', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

// Ruta para crear un nuevo recurso (POST)
app.post('/api/recurso', (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos necesarios' });
  }

  // Simula la creación de un recurso
  res.status(201).json({ message: 'Recurso creado', nombre, descripcion });
});

// Ruta para obtener un recurso por ID (GET)
app.get('/api/recurso/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Recurso con ID ${id} encontrado` });
});

// Ruta para eliminar un recurso por ID (DELETE)
app.delete('/api/recurso/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Recurso con ID ${id} eliminado` });
});

// Exportar la función para Vercel
module.exports = (req, res) => {
  app(req, res);
};


