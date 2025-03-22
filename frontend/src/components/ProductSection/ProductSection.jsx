import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import './ProductSection.css';

const products = {
  newArrivals: [
    {
      id: 1,
      name: "Handwoven Basket",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Ceramic Vase",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Macrame Wall Hanging",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1582643381669-0486f3282660?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      name: "Handmade Soap Set",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1547793549-70faf88838c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ],
  popular: [
    {
      id: 5,
      name: "Wooden Serving Tray",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1541976590-713941681591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      name: "Hand-painted Mug",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 7,
      name: "Knitted Throw Blanket",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1543248939-ff40856f65d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 8,
      name: "Pottery Bowl Set",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ],
  deals: [
    {
      id: 9,
      name: "Handmade Candle Set",
      price: 34.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1602874801007-aa87920a440b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 10,
      name: "Woven Wall Art",
      price: 79.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1580380853934-834251ec0e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 11,
      name: "Ceramic Plant Pot",
      price: 29.99,
      originalPrice: 44.99,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 12,
      name: "Handwoven Scarf",
      price: 39.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1601244005535-a48d21d951ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ]
};

function ProductCard({ product, isDiscount }) {
  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-actions">
          <button className="action-btn"><Heart size={20} /></button>
          <button className="action-btn"><ShoppingCart size={20} /></button>
        </div>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="price-container">
          <span className="price">${product.price}</span>
          {isDiscount && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProductSection() {
  return (
    <div className="product-sections">
      <section className="product-section">
        <h2>New Arrivals</h2>
        <div className="products-grid">
          {products.newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="product-section">
        <h2>Popular Items</h2>
        <div className="products-grid">
          {products.popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="product-section">
        <h2>Special Deals</h2>
        <div className="products-grid">
          {products.deals.map((product) => (
            <ProductCard key={product.id} product={product} isDiscount={true} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductSection;