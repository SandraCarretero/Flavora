const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Importar rutas
const recipesRoutes = require('./routes/recipe.routes');

// Opciones avanzadas de configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Dominios autorizados
  methods: '*', // Métodos permitidos
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Uso de rutas
app.use('/api/recipes', recipesRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to database');
  } catch (err) {
    console.log('Connection error:', err);
  }

  app.listen(process.env.PORT, () =>
    console.log(`Servidor en ejecución en el puerto ${process.env.PORT}`)
  );
};

startServer();
