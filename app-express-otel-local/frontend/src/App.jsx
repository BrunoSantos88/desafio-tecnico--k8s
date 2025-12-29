import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [dadosFrio, setDadosFrio] = useState(null);
  const [dadosQuente, setDadosQuente] = useState(null);
  const [loadingFrio, setLoadingFrio] = useState(false);
  const [loadingQuente, setLoadingQuente] = useState(false);

  const fetchFrio = async () => {
    setLoadingFrio(true);
    try {
      const response = await fetch('/api/frio');
      if (!response.ok) throw new Error('Erro na API');
      const data = await response.json();
      setDadosFrio(data);
    } catch (error) {
      console.error('API Frio Error:', error);
      alert('❄️ Erro ao buscar dados frio!');
    } finally {
      setLoadingFrio(false);
    }
  };

  const fetchQuente = async () => {
    setLoadingQuente(true);
    try {
      const response = await fetch('/api/quente');
      if (!response.ok) throw new Error('Erro na API');
      const data = await response.json();
      setDadosQuente(data);
    } catch (error) {
      console.error('API Quente Error:', error);
      alert('🔥 Erro ao buscar dados quente!');
    } finally {
      setLoadingQuente(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>🌡️ Temperatura Global</h1>
        
        <div className="buttons">
          <button 
            className={`btn btn-frio ${loadingFrio ? 'loading' : ''}`}
            onClick={fetchFrio}
            disabled={loadingFrio}
          >
            ❄️ Frio
          </button>
          <button 
            className={`btn btn-quente ${loadingQuente ? 'loading' : ''}`}
            onClick={fetchQuente}
            disabled={loadingQuente}
          >
            🔥 Quente
          </button>
        </div>

        <div className="cards">
          {dadosFrio && (
            <div className="card frio">
              <h3 className="card-frio">❄️ Local Mais Frio</h3>
              <div className="info-row">
                <span className="label">Local:</span>
                <span className="value">{dadosFrio.local}</span>
              </div>
              <div className="info-row">
                <span className="label">País:</span>
                <span className="value">{dadosFrio.pais}</span>
              </div>
              <div className="info-row">
                <span className="label">Temperatura:</span>
                <span className="value temperatura">{dadosFrio.temperatura}°C</span>
              </div>
              <div className="info-row">
                <span className="label">Horário:</span>
                <span className="value">{new Date(dadosFrio.horario).toLocaleString('pt-BR')}</span>
              </div>
            </div>
          )}
          
          {dadosQuente && (
            <div className="card quente">
              <h3 className="card-quente">🔥 Local Mais Quente</h3>
              <div className="info-row">
                <span className="label">Local:</span>
                <span className="value">{dadosQuente.local}</span>
              </div>
              <div className="info-row">
                <span className="label">País:</span>
                <span className="value">{dadosQuente.pais}</span>
              </div>
              <div className="info-row">
                <span className="label">Temperatura:</span>
                <span className="value temperatura temperatura-quente">{dadosQuente.temperatura}°C</span>
              </div>
              <div className="info-row">
                <span className="label">Horário:</span>
                <span className="value">{new Date(dadosQuente.horario).toLocaleString('pt-BR')}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;