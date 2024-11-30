import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth'; // Funzione per chiamare l'API di login

const AccountPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); // Per tenere traccia dell'utente loggato
  const navigate = useNavigate(); // usa navigate invece di history

  // Funzione per gestire il login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginUser(username, password);
      // Salva il token nel localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);
      // Imposta i dati dell'utente
      setUser({
        username: response.username,
        userId: response.userId,
      });
      // Redirige all'area personale usando navigate
      navigate('/profile');
    } catch (error) {
      setError('Credenziali errate');
    }
  };

  // Funzione per fare il logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
    navigate('/login'); // usa navigate invece di history.push
  };

  if (user) {
    return (
      <div>
        <h1>Benvenuto, {user.username}!</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AccountPage;
