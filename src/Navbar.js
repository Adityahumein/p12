import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Switch from 'react-switch';

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' ? true : false
  );

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem('username')]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  const handleSignout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    localStorage.setItem('darkMode', checked ? 'true' : 'false');
  };

  return (
    <div className={`navbar ${isDarkMode ? 'dark-navbar' : ''}`}>
      <div className="left-nav-links">
        {isLoggedIn ? (
          <a href="/registration" className={`nav-link ${isDarkMode ? 'dark-nav-link' : ''}`}>Registration</a>
        ) : null}
        <a href="/aboutus" className={`nav-link ${isDarkMode ? 'dark-nav-link' : ''}`}>About Us</a>
      </div>
      <a href='/' className={`heading ${isDarkMode ? 'dark-heading' : ''}`}>Ayush Portal</a>
      <div className={`nav-buttons ${isDarkMode ? 'dark-nav-buttons' : ''}`}>
        <Switch
          className={`dark-mode-checkbox ${isDarkMode ? 'dark-checkbox' : ''}`}
          onChange={handleDarkMode}
          checked={isDarkMode}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
        />
        {isLoggedIn ? (
          <>
            <button className={`nav-button ${isDarkMode ? 'dark-nav-button' : ''}`} onClick={handleSignout}>Signout</button>
          </>
        ) : (
          <>
            <button className={`nav-button ${isDarkMode ? 'dark-nav-button' : ''}`} onClick={() => navigate('/login')}>Login</button>
            <button className={`nav-button ${isDarkMode ? 'dark-nav-button' : ''}`} onClick={() => navigate('/signup')}>Signup</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;