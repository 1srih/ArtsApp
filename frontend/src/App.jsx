import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import About from './components/About/About.jsx';
import Home from './components/Home/Home.jsx';
import './styles/global.css';
import { useState, useEffect } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    // Set body class for light/dark mode
    document.body.className = isDarkMode ? 'dark' : 'light';
    // Save the theme in localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Router basename="/ArtsApp">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
      </nav>

      <main className="container">
        <Routes>
          {/* Default routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Wildcard route to catch all undefined paths */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
