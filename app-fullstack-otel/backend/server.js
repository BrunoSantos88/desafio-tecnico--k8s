const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const app = express();

app.use(cors({ origin: ['*'] }));
app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const clientIP = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent') || 'Unknown';
  
  console.log(`🔗 CONEXÃO [${timestamp}]`);
  console.log(`   📍 IP: ${clientIP}`);
  console.log(`   🌐 Origin: ${req.get('Origin') || 'Direto'}`);
  console.log(`   📱 User-Agent: ${userAgent.substring(0, 60)}...`);
  console.log(`   🔗 Método: ${req.method} ${req.originalUrl}`);
  
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`   ✅ RESPOSTA: ${res.statusCode} (${duration}ms)\n`);
  });
  
  next();
});

app.get('/', (req, res) => {
  res.json({ 
    status: 'Backend rodando!',
    apis: ['/api/quente', '/api/frio'],
    connected_at: new Date().toISOString()
  });
});

app.get('/api/quente', async (req, res) => {
  pool.query('INSERT INTO calor_logs(temperatura, valor, unidade, status, client_ip) VALUES($1,$2,$3,$4,$5)',
    ['quente', 35, '°C', 'OK', req.ip]).catch(() => {});
  
  console.log('   🔥 → /api/quente');
  res.json({ 
    temperatura: 'quente',
    valor: 35,
    unidade: '°C',
    status: 'OK'
  });
});

app.get('/api/frio', async (req, res) => {
  pool.query('INSERT INTO calor_logs(temperatura, valor, unidade, status, client_ip) VALUES($1,$2,$3,$4,$5)',
    ['frio', 12, '°C', 'OK', req.ip]).catch(() => {});
  
  console.log('   ❄️ → /api/frio');
  res.json({
    temperatura: 'frio',
    valor: 12,
    unidade: '°C',
    status: 'OK'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Backend ☸️ http://0.0.0.0:5000}`);
  console.log(`📡 Docker-ready!\n`);
});