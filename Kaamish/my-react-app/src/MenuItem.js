// MenuItem.js
import React from 'react';
import './MenuItem.css';

const MenuItem = ({ name, price, image }) => {
  return (
    <div className="menu-item">
      <div className="menu-item-content">
        <img src={image} alt={name} className="menu-item-image" />
        <h3 className="menu-item-name">{name}</h3>
        <p className="menu-item-price">{price}</p>
        <button className="menu-item-button">Add to cart</button> {/* Add this button */}
      </div>
    </div>
  );
};

export default MenuItem;
