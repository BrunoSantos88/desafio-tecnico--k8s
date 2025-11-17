CREATE TABLE IF NOT EXISTS contador_selecoes (
  tipo VARCHAR(10) PRIMARY KEY,
  contagem INT NOT NULL DEFAULT 0
);

INSERT INTO contador_selecoes (tipo, contagem) VALUES ('frio', 0), ('quente', 0)
ON CONFLICT (tipo) DO NOTHING;