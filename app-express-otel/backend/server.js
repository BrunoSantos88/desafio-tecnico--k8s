const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 5000;

app.use(express.json());

const cors = require('cors');
app.use(cors({
  origin: 'http://192.168.98.2:3000',
}));

const pool = new Pool({
  user: 'postgres',          
  host: '127.0.0.1', 
  database: 'db',            
  password: 'postgres',     
  port: 5432,
});

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
