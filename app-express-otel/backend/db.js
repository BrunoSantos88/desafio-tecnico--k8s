require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

// Teste de conexão
(async () => {
  try {
    const client = await pool.connect();
    console.log('Conexão com o banco realizada com sucesso!');
    client.release();
  } catch (err) {
    console.error('Erro na conexão com o banco:', err);
  }
})();

module.exports = pool;
