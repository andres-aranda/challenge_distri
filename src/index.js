// Importar las dependencias necesarias
const express = require('express');
require('dotenv').config(); // Para cargar las variables de entorno del archivo .env
const operaciones_unicasV1 =require("./V1/routes/operaciones_unicasRoutes.js");

// Crear una instancia de Express
const app = express();

// Configurar el puerto
const PORT = process.env.PORT || 3000; // Usar el puerto especificado en el archivo .env o el puerto 3000 por defecto

// Ruta de prueba
app.use(express.json());
app.set('view engine', 'ejs');
app.use("/api/v1", operaciones_unicasV1);

// Escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
