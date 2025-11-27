require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: '*' }));

// GET FRIO
app.get('/api/temperatura/frio', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT local, pais, temperatura, horario FROM temperatura WHERE tipo = $1',
      ['frio']
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Dados frio não encontrados' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar dados frio:', error);
    res.status(500).json({ error: 'Erro ao buscar dados frio' });
  }
});

// GET QUENTE
app.get('/api/temperatura/quente', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT local, pais, temperatura, horario FROM temperatura WHERE tipo = $1',
      ['quente']
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Dados quente não encontrados' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar dados quente:', error);
    res.status(500).json({ error: 'Erro ao buscar dados quente' });
  }
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});