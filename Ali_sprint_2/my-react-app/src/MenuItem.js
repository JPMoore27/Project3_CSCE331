import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons'; // Import the rotation icon
import './MenuItem.css';

const MenuItem = ({ name, price, image, index, addToCart, cart, setCart }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Rotate card handler
  const handleRotate = () => {
    setIsFlipped(!isFlipped);
  };

  // Handler for adding an item to the cart
  const handleAddToCart = () => {
    // Create an item object. Make sure you have a unique identifier for each item.
    const item = { id: index, name, price };
    addToCart(cart, item, setCart);
  };

  // Assuming 5 items per row, adjust as needed
  const row = Math.floor(index / 5);
  const delay = (index % 5 + row) * 100; // Delay calculation

  return (
    <div
      ref={ref}
      className={`menu-item ${inView ? 'in-view' : ''} ${isFlipped ? 'flipped' : ''}`}
      style={{ transitionDelay: `${inView ? delay : 0}ms` }}
    >
      <div className="menu-item-front">
        <div className="menu-item-top-right">
          {/* Add a rotation icon to rotate to the back */}
          <FontAwesomeIcon
            icon={faSync}
            className="rotate-icon"
            onClick={handleRotate}
          />
        </div>
        <img src={image} alt={name} className="menu-item-image" />
        <h3 className="menu-item-name">{name}</h3>
        <p className="menu-item-price">${price.toFixed(2)}</p>
        <button className="menu-item-button" onClick={handleAddToCart}>Add to cart</button>
      </div>
      <div className="menu-item-back">
        <div className="menu-item-top-right">
          {/* Add a rotation icon to rotate back to the front */}
          <FontAwesomeIcon
            icon={faSync}
            className="rotate-icon"
            onClick={handleRotate}
          />
        </div>
        <h3>Ingredients</h3>
        <p>Espresso, Milk, Sugar, Water</p> {/* Placeholder text */}
      </div>
    </div>
  );
};

export default MenuItem;
