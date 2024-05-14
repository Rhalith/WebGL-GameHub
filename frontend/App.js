import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GameList from './GameList';
import GamePage from './GamePage';
import api from './api/axiosConfig';
import Login from './Login';

function App() {
  const [games, setGames] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(''); // Kullanıcı adı state'i
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await api.get('/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const handleLogin = (username) => { // handleLogin fonksiyonunu kullanıcı adı alacak şekilde güncelle
    setIsAuthenticated(true);
    setUsername(username);
    navigate('/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername(''); // Kullanıcı adı state'ini sıfırla
    navigate('/login');
  };

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<GameList games={games} isAuthenticated={isAuthenticated} onLogout={handleLogout} username={username} />} />
        <Route path="/game/:id" element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;
