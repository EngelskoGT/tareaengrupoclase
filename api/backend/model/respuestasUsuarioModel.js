// models/respuestasUsuarioModel.js
const sql = require('mssql');
const { getConnection } = require('../../connect');

async function guardarRespuestas(usuarioID, respuestas) {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    try {
        await transaction.begin();

        for (const respuesta of respuestas) {
            const { OpcionID, Seleccionado } = respuesta;

            // Evita duplicados si ya existe respuesta del mismo usuario y opción
            await transaction.request()
                .input('UsuarioID', sql.VarChar, usuarioID)
                .input('OpcionID', sql.Int, OpcionID)
                .input('Seleccionado', sql.Int, Seleccionado)
                .input('FechaRespuesta', sql.DateTime, new Date())
                .query(`
                    IF NOT EXISTS (
                        SELECT 1 FROM RespuestasUsuario 
                        WHERE UsuarioID = @UsuarioID AND OpcionID = @OpcionID
                    )
                    INSERT INTO RespuestasUsuario (UsuarioID, OpcionID, Seleccionado, FechaRespuesta)
                    VALUES (@UsuarioID, @OpcionID, @Seleccionado, @FechaRespuesta)
                `);
        }

        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw new Error(`Error al guardar las respuestas: ${err.message}`);
    }
}

module.exports = { guardarRespuestas };
