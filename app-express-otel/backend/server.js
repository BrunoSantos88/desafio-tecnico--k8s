const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');


///portas express
const app = express();
const port = 5000

const allowedOrigins = ['*']

const corsOptions = {
  origin: function(origin, callback) {
    // Permite requisições sem origin (ex: Postman) ou origem permitida
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};
app.use(express.json());

app.use(cors(corsOptions));
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'meu_banco',
  password: 'postgres',
  port: 5432,
});


const dadosFrio = {
  local: 'Alasca',
  pais: 'Estados Unidos',
  temperatura: -10,
  horario: 'UTC-9'
};

const dadosQuente = {
  local: 'Região Amazônica',
  pais: 'Brasil',
  temperatura: 40,
  horario: 'UTC-3'
};

// Rota para dados frio
app.get('/api/temperatura/frio', async (req, res) => {
  await incrementarContador('frio');
  res.json(dadosFrio);
});

// Rota para dados quente
app.get('/api/temperatura/quente', async (req, res) => {
  await incrementarContador('quente');
  res.json(dadosQuente);
});


// Função para incrementar contador no banco
async function incrementarContador(tipo) {
  try {
    await pool.query(
      'UPDATE contador_selecoes SET contagem = contagem + 1 WHERE tipo = $1',
      [tipo]
    );
  } catch (error) {
    console.error('Erro ao atualizar contador:', error);
  }
}

// Endpoint para consultar as contagens
app.get('/api/temperatura/contador', async (req, res) => {
  try {
    const result = await pool.query('SELECT tipo, contagem FROM contador_selecoes');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar contagem' });
  }
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
