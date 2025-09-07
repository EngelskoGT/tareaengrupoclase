require("dotenv").config();
const sql = require("mssql");

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  server: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

async function getConnection() {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("✅ Conexión a SQL Server (Azure) establecida");
    return pool;
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
    throw error;
  }
}

module.exports = { sql, getConnection };


