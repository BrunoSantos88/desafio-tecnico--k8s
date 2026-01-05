const pool = require('./config/database');

async function initTemperaturas() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS temperaturas (
        id SERIAL PRIMARY KEY,
        local VARCHAR(100),
        pais VARCHAR(50),
        temperatura DECIMAL(5,2),
        horario TIMESTAMP,
        tipo VARCHAR(20)
      )
    `);

    const count = await pool.query('SELECT COUNT(*) FROM temperaturas');
    if (parseInt(count.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO temperaturas (local, pais, temperatura, horario, tipo) VALUES
        ('Oymyakon', 'Rússia', -67.7, '2025-12-07 20:00', 'frio'),
        ('Death Valley', 'EUA', 56.7, '2025-12-07 20:00', 'quente')
      `);
      console.log('✅ 2 temperaturas criadas no banco');
    } else {
      console.log('✅ Banco já inicializado');
    }
  } catch (error) {
    console.error('❌ Erro init DB:', error);
  }
}

module.exports = { initTemperaturas };