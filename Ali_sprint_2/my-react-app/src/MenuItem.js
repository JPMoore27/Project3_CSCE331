import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './MenuItem.css';

const MenuItem = ({ name, price, image, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Flip card handler
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Assuming 5 items per row, adjust as needed
  const row = Math.floor(index / 5);
  const delay = (index % 5 + row) * 100; // Delay calculation

  return (
    <div
      ref={ref}
      className={`menu-item ${inView ? 'in-view' : ''} ${isFlipped ? 'flipped' : ''}`}
      style={{ transitionDelay: `${inView ? delay : 0}ms` }}
      onClick={handleFlip}
    >
      <div className="menu-item-front">
        <img src={image} alt={name} className="menu-item-image" />
        <h3 className="menu-item-name">{name}</h3>
        <p className="menu-item-price">{price}</p>
        <button className="menu-item-button">Add to cart</button>
      </div>
      <div className="menu-item-back">
        <h3>Ingredients</h3>
        <p>Espresso, Milk, Sugar, Water</p> {/* Placeholder text */}
      </div>
    </div>
  );
};

export default MenuItem;
