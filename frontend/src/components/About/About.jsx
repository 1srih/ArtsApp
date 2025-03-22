import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <h1 className="about-title">About Us</h1>
        
        <div className="about-content">
          <div className="about-image">
            <img src="/images/about-us.jpg" alt="Our Team" />
          </div>
          
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Founded in 2020, our company started with a simple vision: to create products that make a difference in people's lives. 
              What began as a small startup has grown into a passionate team dedicated to innovation and quality.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              We strive to develop innovative solutions that combine cutting-edge technology with intuitive design. 
              Our mission is to provide products that are not only functional but also enhance the everyday experiences of our customers.
            </p>
            
            <h2>Our Values</h2>
            <ul className="about-values">
              <li><strong>Innovation:</strong> We constantly push boundaries to create new and better solutions.</li>
              <li><strong>Quality:</strong> We maintain the highest standards in everything we do.</li>
              <li><strong>Customer Focus:</strong> Our customers' needs drive our decisions and development.</li>
              <li><strong>Sustainability:</strong> We're committed to environmentally responsible practices.</li>
            </ul>
          </div>
        </div>
        
        <div className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="/images/team/ceo.jpg" alt="CEO" />
              <h3>Jane Doe</h3>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <img src="/images/team/cto.jpg" alt="CTO" />
              <h3>John Smith</h3>
              <p>CTO</p>
            </div>
            <div className="team-member">
              <img src="/images/team/designer.jpg" alt="Lead Designer" />
              <h3>Emily Johnson</h3>
              <p>Lead Designer</p>
            </div>
            <div className="team-member">
              <img src="/images/team/developer.jpg" alt="Lead Developer" />
              <h3>Michael Chen</h3>
              <p>Lead Developer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;