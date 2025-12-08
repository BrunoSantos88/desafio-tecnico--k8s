const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Dados mock em memória (substitui o banco)
const temperaturas = [
  { local: 'Antártica', pais: 'Antártica', temperatura: -89.2, horario: '2025-12-07 20:00', tipo: 'frio' },
  { local: 'Iacution', pais: 'Rússia', temperatura: -71.2, horario: '2025-12-07 19:45', tipo: 'frio' },
  { local: 'Oymyakon', pais: 'Rússia', temperatura: -67.7, horario: '2025-12-07 18:30', tipo: 'frio' },
  { local: 'Death Valley', pais: 'EUA', temperatura: 56.7, horario: '2025-12-07 15:20', tipo: 'quente' },
  { local: 'Lut Desert', pais: 'Irã', temperatura: 70.7, horario: '2025-12-07 16:10', tipo: 'quente' },
  { local: 'Dalol', pais: 'Etiópia', temperatura: 49.1, horario: '2025-12-07 14:55', tipo: 'quente' }
];

// Inicializa (simula initTemperaturas)
console.log('✅ Dados mock carregados:', temperaturas.length, 'registros');

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    records: temperaturas.length,
    frio: temperaturas.filter(t => t.tipo === 'frio').length,
    quente: temperaturas.filter(t => t.tipo === 'quente').length
  });
});

// FRIO - Mais frio (menor temperatura)
app.get('/api/frio', (req, res) => {
  const maisFrio = temperaturas
    .filter(t => t.tipo === 'frio')
    .sort((a, b) => a.temperatura - b.temperatura)[0];
  res.json(maisFrio);
});

// QUENTE - Mais quente (maior temperatura)
app.get('/api/quente', (req, res) => {
  const maisQuente = temperaturas
    .filter(t => t.tipo === 'quente')
    .sort((a, b) => b.temperatura - a.temperatura)[0];
  res.json(maisQuente);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Backend SEM Banco: http://0.0.0.0:${port}`);
  console.log(`📊 GET / - Health check`);
  console.log(`🥶 GET /api/frio - Mais frio`);
  console.log(`🔥 GET /api/quente - Mais quente`);
});
