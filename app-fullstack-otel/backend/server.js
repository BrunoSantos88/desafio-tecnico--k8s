const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors({ origin: 'http://localhost' }));


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

// ✅ ROTAS
app.get('/', (req, res) => {
  console.log('   🏠 → Raiz acessada');
  res.json({ 
    status: 'Backend rodando!',
    connected_at: new Date().toISOString()
  });
});

app.get('/hello', (req, res) => {
  console.log('   👋 → /hello via Nginx (React /api/hello)');
  res.json({ 
    message: '🚀 Backend OK!',
    from: req.ip
  });
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Backend escutando conexões em http://0.0.0.0:5000`);
  console.log(`📡 Aguardando conexões...\n`);
});
