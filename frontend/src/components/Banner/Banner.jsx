import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Banner.css';

const bannerData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    title: "Discover Unique Handcrafted Art",
    description: "Explore our collection of handmade treasures"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    title: "Special Holiday Collection",
    description: "Find the perfect handmade gifts"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    title: "Artisan Crafted Jewelry",
    description: "Unique pieces for every occasion"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    title: "Home Decor Collection",
    description: "Transform your space with handcrafted pieces"
  }
];

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length);
  };

  return (
    <section className="banner">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          className="banner-slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundImage: `url("${bannerData[currentSlide].image}")`
          }}
        >
          <div className="banner-content">
            <h1>{bannerData[currentSlide].title}</h1>
            <p>{bannerData[currentSlide].description}</p>
            <button className="btn btn-primary">Shop Now</button>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <button className="banner-nav banner-nav-left" onClick={prevSlide}>
        <ChevronLeft size={24} />
      </button>
      <button className="banner-nav banner-nav-right" onClick={nextSlide}>
        <ChevronRight size={24} />
      </button>
      
      <div className="banner-dots">
        {bannerData.map((_, index) => (
          <button
            key={index}
            className={`banner-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Banner;