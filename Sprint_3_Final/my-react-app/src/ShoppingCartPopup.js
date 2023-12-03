import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import ShoppingCartCheckOut from './ShoppingCartCheckOut';

const ShoppingCartPopup = ({ cart, onClose, onRemoveItem }) => {
  const popupStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 30,
    right: 0,
    bottom: 30,
    left: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
  };

  const boxStyles = {
    width: '400px',
    background: 'rgba(0, 0, 0, 0.8)',
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
    backgroundColor: '#ffcc00',
    borderRadius: '50%',
    padding: '4px',
    margin: '12px',
    cursor: 'pointer',
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
              {item.itemName ? (
                <>
                  {item.itemName} - ${item.price.toFixed(2)} x {item.quantity}
                  <span>
                    <FontAwesomeIcon
                      icon={faMinusCircle}
                      className="remove-icon"
                      onClick={() => onRemoveItem(item)}
                      style={removeButtonStyles}
                    />
                  </span>
                </>
              ) : (
                // Handle cases where the item does not have a name
                <span>Invalid Item</span>
              )}
            </li>
          ))}
        </ul>
        <ShoppingCartCheckOut cart={cart} />
      </div>
    </div>
  );
};

export default ShoppingCartPopup;
