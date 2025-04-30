import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBreedDetailsWithImages } from '../services/catApi'; // Importa a nova função
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function BreedDetailPage() {
  const { breedId } = useParams();
  const [breedInfo, setBreedInfo] = useState(null); // Armazena detalhes e imagens
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBreedData = async () => {
      if (!breedId) return;
      try {
        setLoading(true);
        setError(null);
        const data = await fetchBreedDetailsWithImages(breedId, 8); // Pede até 8 imagens
        setBreedInfo(data);
      } catch (err) {
        setError(`Failed to fetch details for breed ${breedId}. It might not exist or there was a network issue.`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBreedData();
  }, [breedId]); // Re-executa se breedId mudar

  // Função auxiliar para renderizar detalhes
  const renderDetail = (label, value) => {
    if (!value) return null; // Não renderiza se o valor não existir
    return <p><strong>{label}:</strong> {value}</p>;
  };

  return (
    <div>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '1.5rem', fontSize: '1.1em' }}>
        &larr; Back to Breed List
      </Link>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && breedInfo && (
        <div className="breed-details-container">
          <h1>{breedInfo.name}</h1>

          {/* Galeria de Imagens */}
          {breedInfo.images && breedInfo.images.length > 0 ? (
             <div className="image-gallery">
               {breedInfo.images.map((imgUrl, index) => (
                 <img
                    key={index}
                    src={imgUrl}
                    alt={`${breedInfo.name} - Image ${index + 1}`}
                    className="gallery-image"
                 />
               ))}
             </div>
          ) : (
            <p>No images available for this breed.</p>
          )}

          {/* Detalhes da Raça */}
          <div className="breed-info">
              <h2>Details</h2>
              {renderDetail('Temperament', breedInfo.temperament)}
              {renderDetail('Origin', `${breedInfo.origin} (${breedInfo.country_code})`)}
              {renderDetail('Weight', `${breedInfo.weight?.metric} kg (${breedInfo.weight?.imperial} lbs)`)}
              {renderDetail('Life Span', `${breedInfo.life_span} years`)}
              {renderDetail('Description', breedInfo.description)}
              {renderDetail('Adaptability', `${breedInfo.adaptability} / 5`)}
              {renderDetail('Affection Level', `${breedInfo.affection_level} / 5`)}
              {renderDetail('Child Friendly', `${breedInfo.child_friendly} / 5`)}
              {renderDetail('Dog Friendly', `${breedInfo.dog_friendly} / 5`)}
              {renderDetail('Energy Level', `${breedInfo.energy_level} / 5`)}
              {renderDetail('Intelligence', `${breedInfo.intelligence} / 5`)}
              {renderDetail('Shedding Level', `${breedInfo.shedding_level} / 5`)}
              {renderDetail('Social Needs', `${breedInfo.social_needs} / 5`)}
              {renderDetail('Stranger Friendly', `${breedInfo.stranger_friendly} / 5`)}
              {renderDetail('Vocalization', `${breedInfo.vocalisation} / 5`)}

              {breedInfo.wikipedia_url && (
                <p>
                  <a href={breedInfo.wikipedia_url} target="_blank" rel="noopener noreferrer">
                    Read more on Wikipedia &rarr;
                  </a>
                </p>
              )}
               {breedInfo.vetstreet_url && (
                <p>
                  <a href={breedInfo.vetstreet_url} target="_blank" rel="noopener noreferrer">
                    View on Vetstreet &rarr;
                  </a>
                </p>
              )}
               {breedInfo.vcahospitals_url && (
                <p>
                  <a href={breedInfo.vcahospitals_url} target="_blank" rel="noopener noreferrer">
                    Info from VCA Hospitals &rarr;
                  </a>
                </p>
              )}
          </div>
        </div>
      )}
      {/* Mensagem caso não encontre a raça após terminar de carregar sem erro */}
      {!loading && !error && !breedInfo && (
            <ErrorMessage message={`Breed with ID ${breedId} not found.`} />
      )}
    </div>
  );
}

export default BreedDetailPage;