// controllers/respuestasUsuarioController.js
const model = require('../model/respuestasUsuarioModel');

async function guardar(req, res) {
    const { UsuarioID, Respuestas } = req.body;
    if (!UsuarioID || !Respuestas || Respuestas.length === 0) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud no es válido.' });
    }
    try {
        await model.guardarRespuestas(UsuarioID, Respuestas);
        res.status(201).json({ message: 'Respuestas guardadas correctamente.' });
    } catch (err) {
        res.status(500).json({ message: 'Error al procesar las respuestas.' });
    }
}

module.exports = { guardar };