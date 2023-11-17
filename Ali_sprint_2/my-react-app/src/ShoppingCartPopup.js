import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const ShoppingCartPopup = ({ cart, onClose, onRemoveItem }) => {
  const popupStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 30, // Adjust top padding
    right: 0,
    bottom: 30, // Adjust bottom padding
    left: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
  };

  const boxStyles = {
    width: '400px',
    height: '100px',
    background: 'rgba(0, 0, 0, 0.6)', // Transparent white background
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  const closeButtonStyles = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  };


  const removeButtonStyles = {
    backgroundColor: '#ffcc00', // Background color for the minus sign icon
    borderRadius: '50%', // Rounded border for a circular shape
    padding: '2px', // Adjust padding as needed
    
    margin: '10px', // Add margin for spacing between icon and text
    cursor: 'pointer', // Change cursor to a pointer on hover
  };

  const listItemStyles = {
    marginBottom: '10px', // Add margin between list items
  };
  return (
    <div style={popupStyles}>
      <div style={boxStyles}>
        <FontAwesomeIcon
          icon={faTimes}
          className="close-icon"
          style={closeButtonStyles}
          onClick={onClose}
        />
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
      </div>
    </div>
  );
};

export default ShoppingCartPopup;
