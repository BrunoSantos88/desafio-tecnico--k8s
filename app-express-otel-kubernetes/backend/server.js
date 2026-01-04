const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const pool = require('./config/database');
const { initTemperaturas } = require('./init-db');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(logger);

// Inicializa DB na startup
initTemperaturas();

console.log('✅ Iniciando backend com PostgreSQL...');

// Health check
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM temperaturas');
    res.json({
      status: 'OK',
      records: parseInt(result.rows[0].count),
      endpoints: ['/api/frio', '/api/quente']
    });
  } catch (error) {
    res.status(500).json({ error: 'DB indisponível' });
  }
});

// FRIO
app.get('/api/frio', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM temperaturas WHERE tipo = 'frio'");
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// QUENTE
app.get('/api/quente', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM temperaturas WHERE tipo = 'quente'");
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Backend Temps PostgreSQL: http://0.0.0.0:${port}`);
});
