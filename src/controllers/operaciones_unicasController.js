const operaciones_unicasService = require('../services/operaciones_unicasService');

const getAllOperaciones_unicas = async (req, res) => {
    try {

        // Obtener los parámetros de paginación de la query
        const page = parseInt(req.query.page) || 1; // Página por defecto: 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Tamaño de página por defecto: 10
        let { used, aprob } = req.query;
        used = used === '1' || used === '2' || used === '0' ? used : '';
        aprob = aprob === 'true' || aprob === 'false' ? aprob : '';

        // Calcular el desplazamiento
        const offset = (page - 1) * pageSize;

        const allOperaciones_unicas = await operaciones_unicasService.getAllOperaciones_unicas(pageSize,offset, used, aprob);
        res.send({ status: "OK", data: allOperaciones_unicas });
    } catch (error) {
        console.error('Error en getAllOperaciones_unicas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    };
}

const updateOneOperaciones_unicas = async (req, res) => {
    try {
        // Verificar si se proporciona un ID en la solicitud
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ error: 'Se requiere proporcionar un ID de operación' });
        }

        const { comment, approved } = req.body;
        if (!comment || !approved ) {
            return res.status(400).send({ error: 'No proporciono comment o approved en el body de la solicitud.' });
        }
        // Llamar al servicio para actualizar la operación
        const result = await operaciones_unicasService.updateOneOperaciones_unicas(id, comment, approved);

        // Enviar una respuesta de éxito
        res.send(result);
    } catch (error) {
        // Manejar cualquier error y enviar una respuesta de error al cliente
        console.error('Error en updateOneOperaciones_unicas:', error);
        res.status(500).send({ error: 'Error interno del servidor' ,message:error.message});
    }
};

module.exports = {
    updateOneOperaciones_unicas
    , getAllOperaciones_unicas
}