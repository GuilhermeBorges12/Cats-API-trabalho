import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div style={{ padding: '1rem', margin: '1rem 0', border: '1px solid #ff4d4f', color: '#ff4d4f', backgroundColor: '#fff1f0', borderRadius: '4px', textAlign: 'center' }}>
      <p><strong>Error:</strong> {message}</p>
    </div>
  );
};

export default ErrorMessage;