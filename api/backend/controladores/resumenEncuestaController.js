// controllers/resumenEncuestaController.js
const model = require('../model/resumenEncuestaModel');

async function resumenEncuesta(req, res) {
    try {
        const id = parseInt(req.params.id);
        console.log(`📌 Obteniendo resumen de encuesta ${id}`);

        const resumen = await model.obtenerResumen(id);

        res.json({
            success: true,
            data: JSON.parse(resumen)
        });

    } catch (err) {
        console.error("❌ Error en /encuestas/resumen/:id =>", err.message);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

module.exports = { resumenEncuesta };

