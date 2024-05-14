import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function GameList({ games, isAuthenticated, onLogout, username }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      onLogout();
    } else {
      // Redirect to login page
      window.location.href = '/login';
    }
  };

  // Filter games based on name, description, and genres
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm) ||
    game.description.toLowerCase().includes(searchTerm) ||
    game.genres.some(genre => genre.toLowerCase().includes(searchTerm))
  );

  return (
    <div className="home-page">
      <div className="header">
        <input
          type="text"
          placeholder="Search for games by name, genre, or keywords..."
          onChange={handleSearchChange}
          className="search-bar"
        />
        {isAuthenticated && <span className="welcome-message">Hoşgeldin, {username}!</span>}
        <button className="auth-btn" onClick={handleAuthButtonClick}>
          {isAuthenticated ? 'Çıkış Yap' : 'Giriş Yap'}
        </button>
      </div>
      <h1>Game List</h1>
      <div className="game-list">
        {filteredGames.length > 0 ? filteredGames.map(game => (
          <div className="game" key={game.gameId}>
            <img src={game.thumbnailUrl} alt={`${game.name} Thumbnail`} style={{ width: '150px', height: '100px' }} />
            <h2>{game.name}</h2>
            <p>{game.description}</p>
            <p className="genres"><strong>Genres:</strong> {game.genres.join(', ')}</p>
            <Link to={`/game/${game.gameId}`} className="play-button">Play</Link>
          </div>
        )) : <p>No games found that match your search criteria.</p>}
      </div>
    </div>
  );
}

export default GameList;
