import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <header style={{ padding: '1rem', backgroundColor: '#000000', marginBottom: '1rem' }}>
        <nav>
          <Link to="/" style={{ marginRight: '1rem', textDecoration: 'none', color: '#fffafa', fontWeight: 'bold' }}>
            Cat Explorer 
          </Link>
        </nav>
      </header>
      <main style={{ padding: '0 1rem' }}>
        {children}
      </main>
      <footer style={{ padding: '1rem', backgroundColor: '#f0f0f0', marginTop: '2rem', textAlign: 'center', fontSize: '0.9em' }}>
        <p>Data provided by The Cat API</p>
      </footer>
    </div>
  );
};

export default Layout;