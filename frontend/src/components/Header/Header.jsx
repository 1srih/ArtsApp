import React from 'react';
import { Palette, Search, ShoppingCart, User, Sun, Moon, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ isDarkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-top">
          <motion.div 
            className="logo"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Palette size={32} />
            <span>ArtsCrafts</span>
          </motion.div>
          
          <div className="search-bar">
            <input type="text" placeholder="Search for arts & crafts..." />
            <Search className="search-icon" size={20} />
          </div>
          
          <div className="header-actions">
            <User size={24} />
            <ShoppingCart size={24} />
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <Menu 
              size={24} 
              className="mobile-menu" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
            />
          </div>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/shop" className="nav-link">Shop Now</Link></li>
            <li><Link to="/new-arrivals" className="nav-link">New Arrivals</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
            <li><Link to="/about" className="nav-link">About Us</Link></li>
            <li><Link to="/help" className="nav-link">Help</Link></li>
            <li><Link to="/collaborate" className="nav-link">Collaborate</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
