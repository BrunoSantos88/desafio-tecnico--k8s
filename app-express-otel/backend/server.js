const express = require('express');
///portas express
const app = express();
const port = 5000

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
