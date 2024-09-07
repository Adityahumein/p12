// App.js
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Registration from './Registration';
import Aboutus from './Aboutus';
import Home from './Home';
import Footer from './Footer';
import Chatbox from './Chatbox';
import Termsandcondition from './Termsandcondition';
import Disclaimer from './Disclaimer';

function App() {
  const [showChatbox, setShowChatbox] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const handleChatboxClick = () => {
    setShowChatbox(!showChatbox);
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
    } else if (storedTheme === 'light') {
      setDarkMode(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className={darkMode ? "App dark-mode" : "App"}>
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/terms" element={<Termsandcondition  />} />
          <Route path="/disclaimer" element={<Disclaimer  />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/signup" element={<Signup />} />
          
        </Routes>
        <Footer
      darkMode={darkMode} 
      toggleDarkMode={toggleDarkMode} 
      />
      <i className="fas fa-comment" onClick={handleChatboxClick} />
      {showChatbox && <Chatbox />}
      </div>
      
    </BrowserRouter>
    
  );
}

export default App;