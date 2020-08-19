import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/repositories'); 
        setRepositories(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  
  async function handleAddRepository() {
    try {
      const response = await api.post('/repositories', {
        title: `Novo Projeto ${Date.now()}`,
        url: 'https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs',
        techs: ['NodeJS', 'ReactJS']
      });

      const repository = response.data;
      setRepositories([...repositories, repository]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      
      if (repositoryIndex < 0) {
        return;
      }
    
      const newRepositories = [...repositories];
      newRepositories.splice(repositoryIndex, 1);

      setRepositories(newRepositories);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
