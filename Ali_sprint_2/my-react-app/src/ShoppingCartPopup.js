import React from 'react';

const ShoppingCartPopup = ({ cart, onClose }) => {
  // CSS styles for centering the shopping cart
  const popupStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
  };

  return (
    <div style={popupStyles}>
      <div className="shopping-cart-popup">
        <h3>Shopping Cart</h3>
        <ul>
            {cart.map((item, index) => (
                <li key={index}>
                    {item.itemName} - ${item.price.toFixed(2)} x {item.quantity}
                </li>
            ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShoppingCartPopup;
