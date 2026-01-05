-- Cria tabela
CREATE TABLE IF NOT EXISTS temperaturas (
  id SERIAL PRIMARY KEY,
  local VARCHAR(100),
  pais VARCHAR(50),
  temperatura DECIMAL(5,2),
  horario TIMESTAMP,
  tipo VARCHAR(20)
);

-- Insere dados
INSERT INTO temperaturas (local, pais, temperatura, horario, tipo) VALUES
('Oymyakon', 'Rússia', -67.7, '2025-12-07 20:00', 'frio'),
('Death Valley', 'EUA', 56.7, '2025-12-07 20:00', 'quente')
ON CONFLICT DO NOTHING;
