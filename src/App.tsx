import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { MoviesPerActorPage } from './components/MoviesPerActorPage';
import { ActorsWithMultipleCharactersPage } from './components/ActorsWithMultipleCharactersPage';
import { CharactersWithMultipleActorsPage } from './components/CharactersWithMultipleActorsPage';
import { GlobalStyles } from '@mui/material';

const globalStyles = {
  body: {
    margin: 0,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale'
  }
};
const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles styles={globalStyles} />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/movies-per-actor" />} />
        <Route path="/movies-per-actor" element={<MoviesPerActorPage />} />
        <Route path="/actors-with-multiple-characters" element={<ActorsWithMultipleCharactersPage />} />
        <Route path="/characters-with-multiple-actors" element={<CharactersWithMultipleActorsPage />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
};

export default App;