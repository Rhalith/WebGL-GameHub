import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function GameList({ games, isAuthenticated, onLogout, username }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByLikes, setSortByLikes] = useState(false);

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

  const handleSortByLikes = () => {
    setSortByLikes(!sortByLikes);
  };

  // Filter games based on name, description, and genres
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm) ||
    game.description.toLowerCase().includes(searchTerm) ||
    game.genres.some(genre => genre.toLowerCase().includes(searchTerm))
  );

  // Sort games by likeCount if sortByLikes is true
  const sortedGames = sortByLikes 
    ? [...filteredGames].sort((a, b) => b.likeCount - a.likeCount) 
    : filteredGames;

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
        <button className="sort-btn" onClick={handleSortByLikes}>
          {sortByLikes ? 'Tüm Oyunlar' : 'En Çok Beğenilenler'}
        </button>
      </div>
      <h1>Game List</h1>
      <div className="game-list">
        {sortedGames.length > 0 ? sortedGames.map(game => (
          <div className="game" key={game.gameId}>
            <img src={game.thumbnailUrl} alt={`${game.name} Thumbnail`} style={{ width: '150px', height: '100px' }} />
            <h2>{game.name}</h2>
            <p>{game.description}</p>
            <p className="genres"><strong>Genres:</strong> {game.genres.join(', ')}</p>
            <p className="likes"><strong>Like Count:</strong> {game.likeCount}</p>
            <Link to={`/game/${game.gameId}`} className="play-button">Play</Link>
          </div>
        )) : <p>No games found that match your search criteria.</p>}
      </div>
    </div>
  );
}

export default GameList;
