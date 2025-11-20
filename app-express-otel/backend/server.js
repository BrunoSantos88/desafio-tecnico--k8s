const express = require('express');
const cors = require('cors');

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

const dadosFrio = {
  local: 'Alasca',
  pais: 'Estados Unidos',
  temperatura: -10,
  horario: 'UTC-9',
};

const dadosQuente = {
  local: 'Região Amazônica',
  pais: 'Brasil',
  temperatura: 40,
  horario: 'UTC-3',
};

// Rota para dados frio
app.get('/api/temperatura/frio', (req, res) => {
  res.json(dadosFrio);
});

// Rota para dados quente
app.get('/api/temperatura/quente', (req, res) => {
  res.json(dadosQuente);
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:5000`);
});
