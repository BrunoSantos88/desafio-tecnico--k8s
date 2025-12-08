import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('Carregando...');

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data?.message || 'Backend OK!'))
      .catch(() => setMessage('Sem backend'));
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1>🚀 React + K8s</h1>
      <p><strong>API:</strong> {message}</p>
    </div>
  );
}

export default App;
