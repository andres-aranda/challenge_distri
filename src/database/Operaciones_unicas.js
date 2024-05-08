// Importar la conexión a la base de datos
const db = require('../database/DB');

const getAllOperaciones_unicas = async (query) => {
        return await db.query(query);
};

// Obtener una operación por su ID
const getOneOperaciones_unicas = async (id) => {
    const query = `SELECT * FROM OPERACIONES_UNICAS WHERE id = ${id}`;
    return await db.query(query);
};

// Actualizar el estado de una operación
const updateOperaciones_unicas = async (id, result, used) => {
    const query = `UPDATE OPERACIONES_UNICAS SET result = ${result}, used = ${used} WHERE id = ${id}`;
    return await db.query(query);
};

module.exports = { getAllOperaciones_unicas
    ,updateOperaciones_unicas
    ,getOneOperaciones_unicas };
