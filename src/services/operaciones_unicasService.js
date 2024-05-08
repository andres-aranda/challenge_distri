
const Operaciones_unicas = require('../database/Operaciones_unicas');


const updateOneOperaciones_unicas = async (id, comment, approved) => {
    console.log(comment,approved);
     try {
          // Obtener la operación única por su ID
          const operacion = await Operaciones_unicas.getOneOperaciones_unicas(id);
          
          // Verificar si la operación existe
          if (!operacion && !operacion[0]) {
              throw new Error("Operación no encontrada");
          }
          
          let resultUpdate = operacion[0].result;
          let usedUpdate = operacion[0].used;

          // Verificar las condiciones y actualizar result y used según corresponda
          if (resultUpdate === null) {
              if (approved) {
                  if (comment.includes('<<DS100>>')) {
                      resultUpdate = 1;
                      usedUpdate = 2;
                  } else if (comment.includes('<<DS')) {
                      const dsNumber = parseInt(comment.match(/<<DS(\d{2})>>/)[1]);
                      if (dsNumber < 100 && usedUpdate === 0) {
                          resultUpdate = 1;
                          usedUpdate = 1;
                      } else if (dsNumber < 100 && usedUpdate === 1) {
                          resultUpdate = 1;
                          usedUpdate = 2;
                      }
                  } else {
                      resultUpdate = 1;
                      usedUpdate = 2;
                  }
              } else {
                  resultUpdate = 2;
                  usedUpdate = 0;
              }
          } else {
               
               if (approved && comment.includes('<<DS') && comment.match(/<<DS(\d{2})>>/)) {
                    const dsNumber = parseInt(comment.match(/<<DS(\d{2})>>/)[1]);
                  if (dsNumber < 100 && usedUpdate === 1) {
                      resultUpdate = 1;
                      usedUpdate = 2;
                  }
              } else {
                  throw new Error("No se puede actualizar la operación, no cumple con los criterios.");
              }
          }
          // Actualizar la operación en la base de datos
        let operacionUpdated=  await Operaciones_unicas.updateOperaciones_unicas(id, resultUpdate, usedUpdate);
  
          return { status: "OK", message: "Operación actualizada correctamente" , operacion:operacionUpdated};
      } catch (error) {
          throw new Error("Error al actualizar la operación: " + error.message);
      }
     return;
};
const getOneOperaciones_unicas = () => {
     return;
};
const getAllOperaciones_unicas = async ( pageSize,offset,used, aprob) => {
     let query = 'SELECT * FROM OPERACIONES_UNICAS';

     // Verificar si se proporcionan los parámetros de consulta used y aprob
     if (used !== '' || aprob !== '') {
         query += ' WHERE';
         let conditions = [];
 
         // Agregar condiciones para used
         if (used !== '') {
             conditions.push(` used = ${used}`);
         }
 
         // Agregar condiciones para aprob
         if (aprob !== '') {
             const result = aprob === 'true' ? 1 : 2; // Convertir el string 'true' a 1, 'false' a 2
             conditions.push(` result = ${result}`);
         }
 
         // Unir todas las condiciones con AND
         query += conditions.join(' AND');
     }
 
     // Aplicar paginación
     query += ` LIMIT ${pageSize} OFFSET ${offset}`;
 
     const allOperaciones_unicas = await Operaciones_unicas.getAllOperaciones_unicas(query);
     return allOperaciones_unicas;
};

module.exports = {
     updateOneOperaciones_unicas
     , getOneOperaciones_unicas
     , getAllOperaciones_unicas
 }