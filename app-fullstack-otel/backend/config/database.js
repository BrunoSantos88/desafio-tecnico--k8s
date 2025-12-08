const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'app_db',
  password: '123456',
  port: 5432,
});

pool.on('connect', () => {
  console.log('🔗 PostgreSQL conectado');
});

pool.on('error', (err) => {
  console.error('❌ Erro PostgreSQL:', err);
});

module.exports = pool;
