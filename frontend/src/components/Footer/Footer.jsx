import React from 'react';
import { Link } from 'react-router-dom'; 
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        
        {/* Information Section */}
        <div className="footer-section">
          <h3>Information</h3>
          <ul className="footer-links">
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            <li><Link to="/collaborate" className="footer-link">Collaborate</Link></li>
          </ul>
        </div>
        
        {/* Need Help Section */}
        <div className="footer-section">
          <h3>Need Help?</h3>
          <ul className="footer-links">
            <li><Link to="/faqs" className="footer-link">FAQs</Link></li>
            <li><Link to="/return-policy" className="footer-link">Return Policy</Link></li>
            <li><Link to="/track-order" className="footer-link">Track Order</Link></li>
            <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
          </ul>
        </div>
        
        {/* Social Media Section */}
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
