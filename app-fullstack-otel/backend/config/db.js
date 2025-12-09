require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres-service.app-desafio.svc.cluster.local',
  database: process.env.POSTGRES_DB || 'db',
  password: process.env.POSTGRES_PASSWORD || 'password123',
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
});

// Logs silenciosos
pool.on('connect', () => console.log('✅ PostgreSQL conectado'));
pool.on('error', (err) => console.error('❌ PostgreSQL Error:', err.message));

module.exports = pool;
