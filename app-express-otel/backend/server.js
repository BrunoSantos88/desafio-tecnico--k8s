const express = require('express');
const cors = require('cors');
const client = require('prom-client');

const app = express();

const allowedOrigins = [
  'http://localhost'
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Origin da requisição:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS não permitido'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Rota para saudacoes
app.get('/api/saudacoes', (req, res) => {
  res.json({ mensagem: 'Olá do backend!' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.message);

  if (err.message === 'CORS não permitido') {
    return res.status(403).json({ error: err.message });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor'
  });
});

// Inicia servidor na porta 5000
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
