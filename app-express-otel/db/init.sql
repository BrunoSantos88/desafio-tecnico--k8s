CREATE TABLE IF NOT EXISTS temperaturas (
  id SERIAL PRIMARY KEY,
  local VARCHAR(255),
  pais VARCHAR(100),
  temperatura INTEGER,
  horario VARCHAR(20)
);