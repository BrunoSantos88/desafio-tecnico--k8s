CREATE TABLE IF NOT EXISTS calor_logs (
  id BIGSERIAL PRIMARY KEY,
  temperatura VARCHAR(20) NOT NULL CHECK (temperatura IN ('quente', 'frio')),
  valor NUMERIC(5,2) NOT NULL,
  unidade VARCHAR(5) DEFAULT '°C',
  status VARCHAR(10) DEFAULT 'OK',
  client_ip INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_temperatura ON calor_logs(temperatura);
CREATE INDEX IF NOT EXISTS idx_created_at ON calor_logs(created_at);

CREATE OR REPLACE VIEW calor_status AS
SELECT 
  temperatura,
  COUNT(*) as total,
  ROUND(AVG(valor)::numeric, 1) as media,
  MAX(created_at) as ultima
FROM calor_logs 
GROUP BY temperatura;

INSERT INTO calor_logs (temperatura, valor, unidade, status) 
VALUES ('quente', 35, '°C', 'OK'), ('frio', 12, '°C', 'OK')
ON CONFLICT DO NOTHING;
