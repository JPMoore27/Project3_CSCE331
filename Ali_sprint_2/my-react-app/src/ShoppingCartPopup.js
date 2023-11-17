import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const ShoppingCartPopup = ({ cart, onClose, onRemoveItem }) => {
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
    padding: '20px', // Add padding for spacing
    margin: '10px', // Add margin for spacing between icon and text
  };
  

  const removeButtonStyles = {
    backgroundColor: '#ffcc00', // Background color for the minus sign icon
    borderRadius: '50%', // Rounded border for a circular shape
    padding: '4px', // Adjust padding as needed
    
    margin: '10px', // Add margin for spacing between icon and text
    cursor: 'pointer', // Change cursor to a pointer on hover
  };

  return (
    <div style={popupStyles}>
      <div className="shopping-cart-popup">
        <h3>Shopping Cart</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.itemName} - ${item.price.toFixed(2)} x {item.quantity}
              <span style={removeButtonStyles}>
                <FontAwesomeIcon
                  icon={faMinusCircle}
                  className="remove-icon"
                  onClick={() => onRemoveItem(item)}
                />
              </span>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShoppingCartPopup;
