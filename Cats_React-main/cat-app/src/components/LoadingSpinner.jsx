import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <div className="loader"></div> {/* Usaremos CSS para estilizar */}
      <p style={{ marginLeft: '1rem', fontSize: '1.2em' }}>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;