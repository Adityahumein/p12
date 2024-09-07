// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers && storedUsers[username]) {
      const user = storedUsers[username];
      if (user.password === password) {
        console.log('Login successful!');
        localStorage.setItem('username', username);
        navigate('/'); // Redirect to the dashboard or home page
      } else {
        setError('Invalid password');
      }
    } else {
      setError('User not found');
    }
  };

  return (
    <div className='lp1'>
      <div className="login-page">
        <div className="login-page-content">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
            <br />
            <label>Password:</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <br />
            <button type="submit">Login</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;