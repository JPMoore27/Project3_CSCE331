import React from 'react';

const ShoppingCartPopup = ({ cart, onClose }) => {
  return (
    <div className="shopping-cart-popup">
      <h3>Shopping Cart</h3>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price.toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ShoppingCartPopup;
