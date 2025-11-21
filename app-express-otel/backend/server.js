const express = require('express');
const app = express();
const port = 5000;

app.use(express.json())

// Dados
let dadosFrio = {
  local: 'Alasca',
  pais: 'Estados Unidos',
  temperatura: -10,
  horario: 'UTC-9',
};

let dadosQuente = {
  local: 'Região Amazônica',
  pais: 'Brasil',
  temperatura: 40,
  horario: 'UTC-3',
};

//GET
app.get('/api/temperatura/frio', (req, res) => {
  res.json(dadosFrio);
});

app.get('/api/temperatura/quente', (req, res) => {
  res.json(dadosQuente);
});

//POST
app.post('/api/temperatura/frio', (req, res) => {
  dadosFrio = req.body;
  res.status(201).json({ message: 'Dados frio atualizados', dados: dadosFrio });
});

app.post('/api/temperatura/quente', (req, res) => {
  dadosQuente = req.body;
  res.status(201).json({ message: 'Dados quente atualizados', dados: dadosQuente });
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:5000`);
});