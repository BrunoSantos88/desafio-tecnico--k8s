-- Cria tabela temperaturas
CREATE TABLE IF NOT EXISTS temperaturas (
  id SERIAL PRIMARY KEY,
  local VARCHAR(100) NOT NULL,
  pais VARCHAR(50) NOT NULL,
  temperatura DECIMAL(5,2) NOT NULL,
  horario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tipo VARCHAR(20) NOT NULL
);

-- Oymyakon (mais frio registrado)
INSERT INTO temperaturas (id, local, pais, temperatura, horario, tipo) 
VALUES (1, 'Oymyakon', 'Rússia', -67.7, '2025-12-07 20:00:00', 'frio') 
ON CONFLICT (id) DO NOTHING;

-- Death Valley (mais quente registrado)
INSERT INTO temperaturas (id, local, pais, temperatura, horario, tipo) 
VALUES (2, 'Death Valley', 'EUA', 56.7, '2025-12-07 20:00:00', 'quente') 
ON CONFLICT (id) DO NOTHING;

-- Verificação
SELECT * FROM temperaturas ORDER BY temperatura;