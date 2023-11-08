// MenuItem.js
import React from 'react';
import './MenuItem.css'; // Make sure to create a corresponding CSS file

const MenuItem = ({ name, price }) => {
  return (
    <div className="menu-item-card">
      <div className="menu-item-content">
        <h3 className="menu-item-name">{name}</h3>
        <div className="menu-item-price">{price}</div>
      </div>
      <button className="menu-item-button">Add to cart</button>
    </div>
  );
};

export default MenuItem;
