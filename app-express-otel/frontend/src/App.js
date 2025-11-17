import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function App() {
  const [dadosFrio, setDadosFrio] = useState(null);
  const [dadosQuente, setDadosQuente] = useState(null);
  const [contador, setContador] = useState(null);

  const buscarContador = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/temperatura/contador`);
      const data = await res.json();
      setContador(data);
    } catch (error) {
      alert('Erro ao buscar contagem');
      setContador(null);
    }
  };

  const buscarFrio = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/temperatura/frio`);
      const data = await res.json();
      setDadosFrio(data);
      await buscarContador(); // Atualiza contador após incrementar no backend
    } catch (error) {
      alert('Erro ao buscar dados frio');
      setDadosFrio(null);
    }
  };

  const buscarQuente = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/temperatura/quente`);
      const data = await res.json();
      setDadosQuente(data);
      await buscarContador(); // Atualiza contador após incrementar no backend
    } catch (error) {
      alert('Erro ao buscar dados quente');
      setDadosQuente(null);
    }
  };

useEffect(() => {
  buscarContador(); // primeira chamada
  const intervalId = setInterval(() => {
    buscarContador();
  }, 500); // 500ms, intervalo rápido mas ainda razoável

  return () => clearInterval(intervalId);
}, []);


  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial' }}>
      <h1>Temperatura</h1>

      <button onClick={buscarFrio} style={{ marginRight: '1rem' }}>
        Frio
      </button>
      <button onClick={buscarQuente}>
        Quente
      </button>

      {/* Contador */}
      {contador && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #888', borderRadius: '5px', backgroundColor: '#eee' }}>
          <h3>Contagem de seleções:</h3>
          {contador.map(({ tipo, contagem }) => (
            <p key={tipo}><strong>{tipo}:</strong> {contagem}</p>
          ))}
        </div>
      )}

      {/* Dados Frio */}
      {dadosFrio && (
        <div style={{ marginTop: '2rem', border: '1px solid #ddd', padding: '1rem', borderRadius: '5px' }}>
          <h3>Dados Frio</h3>
          <p><strong>Local:</strong> {dadosFrio.local}</p>
          <p><strong>País:</strong> {dadosFrio.pais}</p>
          <p><strong>Temperatura:</strong> {dadosFrio.temperatura} °C</p>
          <p><strong>Horário:</strong> {dadosFrio.horario}</p>
        </div>
      )}

      {/* Dados Quente */}
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
