const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({
  origin: '*'
}));

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

export default pool;

//Teste conexao
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Conexão com o banco realizada com sucesso!');
    client.release();
  } catch (err) {
    console.error('Erro na conexão com o banco:', err);
  }
}
testConnection();

// METODO GET
app.get('/api/temperatura/frio', async (req, res) => {
  try {
    const result = await pool.query('SELECT local, pais, temperatura, horario FROM temperatura WHERE tipo = $1', ['frio']);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Dados frio não encontrados' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar dados frio:', error);
    res.status(500).json({ error: 'Erro ao buscar dados frio' });
  }
});
//Metodo GET
app.get('/api/temperatura/quente', async (req, res) => {
  try {
    const result = await pool.query('SELECT local, pais, temperatura, horario FROM temperatura WHERE tipo = $1', ['quente']);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Dados Quente não encontrados' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar dados Quente:', error);
    res.status(500).json({ error: 'Erro ao buscar dados Quente' });
  }
});
app.listen(port, () => {
  console.log(`API rodando em http://localhost:5000`);
});
