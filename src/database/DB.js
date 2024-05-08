const mysql = require('mysql');
const util = require('util');
require('dotenv').config();

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.CHALLENGE_HOST,
    port: process.env.CHALLENGE_PORT,
    user: process.env.CHALLENGE_USER,
    password: process.env.CHALLENGE_PASS,
    database: process.env.CHALLENGE_DB
});

// Convertir funciones de callback a funciones que devuelven promesas
const query = util.promisify(connection.query).bind(connection);

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

connection.on('error', (err) => {
    console.error('Error en la conexión a la base de datos:', err);
});

module.exports = { query };
