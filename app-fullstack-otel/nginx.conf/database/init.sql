CREATE TABLE IF NOT EXISTS temperatura (
  id SERIAL PRIMARY KEY,
  tipo VARCHAR(10),
  local VARCHAR(100),
  pais VARCHAR(100),
  temperatura INT,
  horario VARCHAR(10)
);

INSERT INTO temperatura (tipo, local, pais, temperatura, horario) VALUES
('frio', 'Alasca', 'Estados Unidos', -10, 'UTC-9'),
('quente', 'Região Amazônica', 'Brasil', 40, 'UTC-3')
ON CONFLICT DO NOTHING;