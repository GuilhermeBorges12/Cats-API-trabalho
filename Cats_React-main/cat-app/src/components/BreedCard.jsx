import React from 'react';
import { Link } from 'react-router-dom';

const BreedCard = ({ breed }) => {
  const imageUrl = breed.image?.url;

  return (
    <Link
      to={`/breed/${breed.id}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '1rem',
        margin: '0.5rem',
        borderRadius: '8px',
        textAlign: 'center',
        width: '200px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={breed.name}
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '4px'
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '150px',
            backgroundColor: '#eee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            marginBottom: '0.5rem'
          }}>
            No Image
          </div>
        )}
        <h3>{breed.name}</h3>
      </div>
    </Link>
  );
};

export default BreedCard;
