const express = require("express");
const EncuestaController = require("./backend/controladores/obtenerEncuestaController");
const cors = require("cors");
const RESPUESTASUSUARIOCONTROLLER = require("./backend/controladores/respuestasUsuarioController");
const RESUMENENCUESTACONTROLLER = require("./backend/controladores/resumenEncuestaController");
const {getConnection} = require('./connect')

const app = express();
app.use(express.json());


app.use(cors());

(async () => {
    try {
        await getConnection();
        console.log("✅ Conexión a SQL Server establecida");
    } catch (err) {
        console.error("❌ Error conectando a la base de datos:", err.message);
    }
})(); // Inicializa la conexión a la base de datos

// Rutas de encuestas
app.get("/encuestas/:tipo", EncuestaController.obtenerEncuesta);
app.get("/encuestas/resumen/:id", RESUMENENCUESTACONTROLLER.resumenEncuesta);
app.post("/encuestas/respuestas", RESPUESTASUSUARIOCONTROLLER.guardar);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("✅ Servidor corriendo en el puerto", port);
  console.log("✅ Servidor corriendo en http://localhost:3000");
});
