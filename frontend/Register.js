import React, { useState } from 'react';
import api from './api/axiosConfig';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await api.post('/users', { username, password, role: "USER" });
      if (response.status === 200) {
        alert('Registration successful');
        navigate('/login');
      }
    } catch (error) {
        alert('Username already exists. Please try another one.');
      
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-header">Create an Account</h2>
      <input
        type="text"
        className="register-input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="register-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="register-button" onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
