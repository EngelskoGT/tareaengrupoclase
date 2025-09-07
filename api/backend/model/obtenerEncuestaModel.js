// models/obtenerEncuestaModel.js
const sql = require('mssql');
const { getConnection } = require('../../connect');

async function obtenerEncuestaPorTipo(tipoEncuestaID) {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('TipoEncuestaID', sql.Int, tipoEncuestaID)
            .execute('sp_ObtenerEncuestaPorTipo');
        return result.recordset;
    } catch (err) {
        throw new Error(`Error al obtener la encuesta: ${err.message}`);
    }
}

module.exports = { obtenerEncuestaPorTipo };