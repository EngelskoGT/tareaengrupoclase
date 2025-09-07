const express = require("express");
const EncuestaController = require("./backend/controladores/obtenerEncuestaController");
const cors = require("cors");
const RESPUESTASUSUARIOCONTROLLER = require("./backend/controladores/respuestasUsuarioController");
const RESUMENENCUESTACONTROLLER = require("./backend/controladores/resumenEncuestaController");
const {getConnection} = require('./connect');

const app = express();
app.use(express.json());

// Configuración de CORS
app.use(cors());

// Conecta a la base de datos al inicio de la aplicación
(async () => {
    try {
        await getConnection();
        console.log("✅ Conexión a SQL Server establecida");
    } catch (err) {
        console.error("❌ Error conectando a la base de datos:", err.message);
    }
})();

// Rutas de encuestas
app.get("/encuestas/:tipo", EncuestaController.obtenerEncuesta);
app.get("/encuestas/resumen/:id", RESUMENENCUESTACONTROLLER.resumenEncuesta);
app.post("/encuestas/respuestas", RESPUESTASUSUARIOCONTROLLER.guardar);

// Exporta la aplicación para que Vercel la ejecute
module.exports = app;