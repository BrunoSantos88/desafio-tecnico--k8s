import React, { useEffect, useState } from 'react';

function App() {
  const [mensagem, setMensagem] = useState('Carregando...');

  useEffect(() => {
    fetch('http://localhost:5000/api/saudacoes')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erro na resposta da API');
        }
        return res.json();
      })
      .then((data) => {
        setMensagem(data.mensagem);
      })
      .catch(() => {
        setMensagem('Erro ao buscar mensagem');
      });
  }, []);

  return (
    <div>
      <h1>{mensagem}</h1>
    </div>
  );
}

export default App;
