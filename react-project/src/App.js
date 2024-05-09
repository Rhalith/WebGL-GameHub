import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';

function App() {

  const [games, setGames] = useState();

  const getGames = async () => {

    try {
      const response = await api.get('/api/v1/games');
      console.log('Data fetched: ', response.data);
      setGames(response.data);
    }
    catch (error) {
      console.error('Error fetching data: ', error);
    }


  };

  useEffect(() => {
    getGames();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home games ={games}/>} />

        </Route>
      </Routes>
    </div>
  );
}
export default App;
