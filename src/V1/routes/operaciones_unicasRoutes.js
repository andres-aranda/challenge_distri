// Importar las dependencias necesarias
const express = require('express');
require('dotenv').config(); // Para cargar las variables de entorno del archivo .env

// Crear una instancia de Express
const router = express.Router();
const operaciones_unicasController = require('../../controllers/operaciones_unicasController');
const path = require('path');


// Ruta de prueba
router.get('/operaciones/', operaciones_unicasController.getAllOperaciones_unicas)
.patch('/operaciones/:id', operaciones_unicasController.updateOneOperaciones_unicas)
.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'documentacion.html');
  res.sendFile(filePath);
  });



module.exports = router;