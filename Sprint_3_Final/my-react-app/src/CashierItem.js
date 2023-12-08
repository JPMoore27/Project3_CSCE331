import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './MenuItem.css';

const MenuItem = ({ name, price, image, index, addToCart, cart, setCart, togglePopup }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Handler for adding an item to the cart
  const handleAddToCart = () => {
    // Create an item object. Make sure you have a unique identifier for each item.
    const item = { id: index, name, price };
    
    // Open the addons popup by calling togglePopup
    togglePopup();
    
    addToCart(cart, item, setCart);
  };

  // Assuming 5 items per row, adjust as needed
  const row = Math.floor(index / 5);
  const delay = (index % 5 + row) * 100; // Delay calculation

  return (
    <div
      ref={ref}
      className={`menu-item ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${inView ? delay : 0}ms` }}
    >
      <div className="menu-item-front">
        <img src={image} alt={name} className="menu-item-image" />
        <h3 className="menu-item-name">{name}</h3>
        <p className="menu-item-price">${price.toFixed(2)}</p>
        <button className="menu-item-button" onClick={handleAddToCart}>Add to cart</button>
      </div>
      <div className="menu-item-back">
        <h3>Ingredients</h3>
        <p>Espresso, Milk, Sugar, Water</p> {/* Placeholder text */}
      </div>
    </div>
  );
};

export default MenuItem;
