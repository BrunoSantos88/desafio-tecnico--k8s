import React, { useState } from 'react';

// Definição da variável com URLs da API
const backendIPs = [
  'http://192.168.49.2:30001', // NodePort
  'http://backend.app-desafio.svc.cluster.local:5000' //ENDPONT MINIKUBE
];

function App() {
  const [dadosFrio, setDadosFrio] = useState(null);
  const [dadosQuente, setDadosQuente] = useState(null);

  const fetchFromBackends = async (path) => {
    for (const baseUrl of backendIPs) {
      try {
        const res = await fetch(`${baseUrl}${path}`);
        if (res.ok) {
          const data = await res.json();
          return data;
        }
      } catch (error) {
        console.warn(`Erro ao acessar ${baseUrl}`, error);
      }
    }
    throw new Error('Falha ao acessar todos os backends');
  };

  const buscarFrio = async () => {
    try {
      const data = await fetchFromBackends('/api/temperatura/frio');
      setDadosFrio(data);
      setDadosQuente(null);
    } catch {
      alert('Erro ao buscar dados frio');
    }
  };

  const buscarQuente = async () => {
    try {
      const data = await fetchFromBackends('/api/temperatura/quente');
      setDadosQuente(data);
      setDadosFrio(null);
    } catch {
      alert('Erro ao buscar dados quente');
    }
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial' }}>
      <h1>Temperatura</h1>

      <button onClick={buscarFrio} style={{ marginRight: '1rem' }}>
        Frio
      </button>
      <button onClick={buscarQuente}>Quente</button>

      {dadosFrio && (
        <div style={{ marginTop: '2rem', border: '1px solid #ddd', padding: '1rem', borderRadius: '5px' }}>
          <h3>Dados Frio</h3>
          <p><strong>Local:</strong> {dadosFrio.local}</p>
          <p><strong>País:</strong> {dadosFrio.pais}</p>
          <p><strong>Temperatura:</strong> {dadosFrio.temperatura} °C</p>
          <p><strong>Horário:</strong> {dadosFrio.horario}</p>
        </div>
      )}

      {dadosQuente && (
        <div style={{ marginTop: '2rem', border: '1px solid #ddd', padding: '1rem', borderRadius: '5px' }}>
          <h3>Dados Quente</h3>
          <p><strong>Local:</strong> {dadosQuente.local}</p>
          <p><strong>País:</strong> {dadosQuente.pais}</p>
          <p><strong>Temperatura:</strong> {dadosQuente.temperatura} °C</p>
          <p><strong>Horário:</strong> {dadosQuente.horario}</p>
        </div>
      )}
    </div>
  );
}

export default App;
