import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quente, setQuente] = useState('Carregando...');
  const [frio, setFrio] = useState('Carregando...');

  useEffect(() => {
    fetch('/api/quente')
      .then(res => res.json())
      .then(data => setQuente(`${data.temperatura}: ${data.valor}°C`))
      .catch(() => setQuente('❌ Quente offline'));
    
    fetch('/api/frio')
      .then(res => res.json())
      .then(data => setFrio(`${data.temperatura}: ${data.valor}°C`))
      .catch(() => setFrio('❌ Frio offline'));
  }, []);

  const isOffline = quente.includes('offline') || frio.includes('offline');

  return (
    <div className="app-container">
      <h1 className="title">React+K8s+🚀APIs</h1>

      
      <div className="api-card quente">
        <h3 className="api-title">🔥 API QUENTE</h3>
        <p className="api-value">{quente}</p>
      </div>

      <div className="api-card frio">
        <h3 className="api-title">❄️ API FRIO</h3>
        <p className="api-value">{frio}</p>
      </div>

      <div className={`status ${isOffline ? 'offline' : 'online'}`}>
        <strong>Status:</strong> 
        {isOffline ? '⚠️ Alguma API offline' : '✅ Todas APIs OK!'}
      </div>
    </div>
  );
}

export default App;
