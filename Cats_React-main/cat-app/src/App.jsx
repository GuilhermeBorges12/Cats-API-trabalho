import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BreedDetailPage from './pages/BreedDetailPage';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/breed/:breedId" element={<BreedDetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;