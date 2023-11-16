import React from 'react';

const CartItemPopup = ({ name, price, onClose }) => {
  return (
    <div className="cart-item-popup">
      <h3>Added to Cart</h3>
      <p>Name: {name}</p>
      <p>Price: ${price.toFixed(2)}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CartItemPopup;
