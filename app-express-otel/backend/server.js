const express = require('express');
const cors = require('cors');
const logger = require('./logger');

const app = express();
const port = process.env.PORT || 5000;

const temperaturas = [
  {
    id: 1,
    local: 'Oymyakon',
    pais: 'Rússia',
    temperatura: -67.7,
    horario: '2025-12-07 20:00',
    tipo: 'frio'
  },
  {
    id: 2,
    local: 'Death Valley',
    pais: 'EUA',
    temperatura: 56.7,
    horario: '2025-12-07 20:00',
    tipo: 'quente'
  }
];

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(logger); 

console.log('✅ 2 temperaturas carregadas:', temperaturas.length);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    records: temperaturas.length,
    endpoints: ['/api/frio', '/api/quente']
  });
});

// FRIO - ÚNICO registro frio
app.get('/api/frio', (req, res) => {
  const frio = temperaturas.find(t => t.tipo === 'frio');
  res.json(frio);
});

// QUENTE - ÚNICO registro quente
app.get('/api/quente', (req, res) => {
  const quente = temperaturas.find(t => t.tipo === 'quente');
  res.json(quente);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Backend 2 Temps: http://0.0.0.0:5000`);
  console.log(`🥶 ${temperaturas[0].local}: ${temperaturas[0].temperatura}°C`);
  console.log(`🔥 ${temperaturas[1].local}: ${temperaturas[1].temperatura}°C`);
});
