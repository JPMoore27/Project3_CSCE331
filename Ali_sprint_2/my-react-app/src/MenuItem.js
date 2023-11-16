import React from 'react';
import { useInView } from 'react-intersection-observer';
import './MenuItem.css';

const MenuItem = ({ name, price, image, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Assuming 5 items per row, adjust as needed
  const row = Math.floor(index / 5);
  const delay = (index % 5 + row) * 100; // Delay calculation

  return (
    <div
      ref={ref}
      className={`menu-item ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${inView ? delay : 0}ms` }}
    >
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
