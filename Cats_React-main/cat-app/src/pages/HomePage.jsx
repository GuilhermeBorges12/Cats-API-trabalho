import React, { useState, useEffect, useMemo } from 'react';
import { fetchBreeds } from '../services/catApi';
import BreedCard from '../components/BreedCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function HomePage() {
  const [allBreeds, setAllBreeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoverBreedId, setHoverBreedId] = useState(null);


  useEffect(() => {
    const loadBreeds = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchBreeds();
        // Ordena as raças alfabeticamente pelo nome (opcional, mas melhora a UI)
        data.sort((a, b) => a.name.localeCompare(b.name));
        setAllBreeds(data);
      } catch (err) {
        // Mensagem de erro mais específica pode ajudar
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
             setError('API Key missing or invalid. Please check src/services/catApi.js');
        } else {
            setError('Failed to fetch breeds. Check your network connection or try again later.');
        }
        console.error("Error loading breeds:", err); // Log detalhado no console
      } finally {
        setLoading(false);
      }
    };

    loadBreeds();
  }, []);

  const filteredBreeds = useMemo(() => {
    if (!searchTerm) {
      return allBreeds;
    }
    return allBreeds.filter(breed =>
      breed.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allBreeds, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Explore Cat Breeds</h1>

      <div style={{ marginBottom: '1.5rem', textAlign: 'center', position: 'relative' }}>
        <input
          type="text"
          placeholder="Search by breed name..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: '0.5rem', width: '80%', maxWidth: '400px', fontSize: '1rem' }}
          list="breed-suggestions" // Adiciona o atributo list
        />
      {/* Sugestões aparecem aqui */}
      {searchTerm && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '60%',
          transform: 'translateX(-50%)',
          width: '80%',
          maxWidth: '250px',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderTop: 'none',
          maxHeight: '150px', // Limita a altura
          overflowY: 'auto', // Scroll se ultrapassar
          zIndex: 10,
        }}>
          {allBreeds
            .filter(breed => breed.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(breed => (
              <div
                key={breed.id}
                onClick={() => handleSelectBreed(breed.name)}
                style={{
                  padding: '0.5rem',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                  backgroundColor: hoverBreedId === breed.id ? '#ccc' : '#fff',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={() => setHoverBreedId(breed.id)}
                onMouseLeave={() => setHoverBreedId(null)}
              >
                {breed.name}
              </div>
          ))}
        </div>
      )}
    </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {/* Verifica se não está carregando, não tem erro E se allBreeds não está vazio OU se há um termo de busca */}
      {!loading && !error && (allBreeds.length > 0 || searchTerm) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          {filteredBreeds.length > 0 ? (
            filteredBreeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))
          ) : (
             // Mostra a mensagem apenas se uma busca foi feita e não encontrou nada
            <p>No breeds found matching "{searchTerm}".</p>
          )}
        </div>
      )}

      {/* Mensagem específica se o carregamento terminou sem erros, mas a lista inicial está vazia */}
      {!loading && !error && allBreeds.length === 0 && !searchTerm && (
          <p>Could not load any breeds. Please check console for errors (F12).</p>
      )}
    </div>
  );
}

export default HomePage;