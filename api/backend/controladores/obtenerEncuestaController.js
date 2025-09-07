const model = require('../model/obtenerEncuestaModel');

async function obtenerEncuesta(req, res) {
    try {
        const encuestas = await model.obtenerEncuestaPorTipo(req.params.tipo); // 👈 corregido
        if (encuestas && encuestas.length > 0) {
            res.json(encuestas);
        } else {
            res.status(404).json({ message: 'Encuesta no encontrada.' });
        }
    } catch (err) {
        console.error("❌ Error en obtenerEncuesta:", err.message);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}

module.exports = { obtenerEncuesta };
