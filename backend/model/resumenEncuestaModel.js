const { getConnection, sql } = require('../../connect');

async function obtenerResumen(encuestaID) {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('EncuestaID', sql.Int, encuestaID)
            .execute('sp_ResumenEncuestaJson');

        return result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'];
    } catch (err) {
        throw new Error(`Error al obtener el resumen: ${err.message}`);
    }
}

module.exports = { obtenerResumen };
