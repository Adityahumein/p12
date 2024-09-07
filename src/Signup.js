// Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    let storedUsers = JSON.parse(localStorage.getItem('users'));
    if (!storedUsers) {
      storedUsers = {};
    }
    if (storedUsers[username]) {
      setError('Username already exists');
    } else {
      storedUsers[username] = {
        email,
        password,
      };
      localStorage.setItem('users', JSON.stringify(storedUsers));
      localStorage.setItem('username', username);
      navigate('/'); 
    }
  };  
  return (
    <div className='sp1'>
      <div className="signup-page">
        <div className="signup-page-content">
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
            <br />
            <label>Email:</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <br />
            <label>Password:</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <br />
            <button type="submit">Signup</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;