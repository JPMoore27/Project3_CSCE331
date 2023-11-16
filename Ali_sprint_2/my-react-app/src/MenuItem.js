import React, { useEffect, useState } from 'react';
import './MenuItem.css';

const MenuItem = ({ name, price, image, index }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Set a timeout based on the index to delay the appearance
    const timer = setTimeout(() => {
      setLoaded(true);
    }, index * 100); // 100ms delay per item

    return () => clearTimeout(timer); // Clear the timeout if the component unmounts
  }, [index]);

  return (
    <div className={`menu-item ${loaded ? 'loaded' : ''}`}>
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
