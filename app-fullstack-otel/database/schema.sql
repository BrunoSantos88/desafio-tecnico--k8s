-- Cria banco app_db
CREATE DATABASE app_db;

-- Conecta no app_db e cria tabelas
\c app_db;

CREATE TABLE temperatura (
  id SERIAL PRIMARY KEY,
  local VARCHAR(100) NOT NULL,
  pais VARCHAR(50) NOT NULL,
  temperatura DECIMAL(5,2) NOT NULL,
  horario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tipo VARCHAR(20) NOT NULL
);

-- Insere dados reais
INSERT INTO temperatura (local, pais, temperatura, tipo) VALUES
('Antártica - Estação Vostok', 'Antártica', -89.2, 'frio'),
('Oymyakon', 'Rússia', -67.7, 'frio'),
('Vale da Morte', 'EUA', 56.7, 'quente'),
('Deserto de Lut', 'Irã', 70.7, 'quente');
