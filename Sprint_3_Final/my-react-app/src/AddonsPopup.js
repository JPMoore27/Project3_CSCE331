import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const addonsData = [
    { addonID: 0, itemName: 'Oat Milk', price: 0.99, dairy: 'No' },
    { addonID: 1, itemName: 'Soy Milk', price: 0.99, dairy: 'No' },
    { addonID: 2, itemName: 'Almond Milk', price: 0.99, dairy: 'No' },
    { addonID: 3, itemName: 'Coconut Milk', price: 0.99, dairy: 'No' },
    { addonID: 4, itemName: 'Vanilla Syrup', price: 0.5, dairy: 'No' },
    { addonID: 5, itemName: 'Hazelnut Syrup', price: 0.5, dairy: 'No' },
    { addonID: 6, itemName: 'Sugarfree Vanilla Syrup', price: 0.5, dairy: 'No' },
    { addonID: 7, itemName: 'Single Shot', price: -0.5, dairy: 'No' },
    { addonID: 8, itemName: 'Half & Half', price: 0.5, dairy: 'Yes' },
    { addonID: 9, itemName: 'Brown Sugar Syrup', price: 0.5, dairy: 'No' },
    // Add more addons as needed
  ];
  

const AddonsPopup = ({ addonsCart, onClose, onAddToCart }) => {
  const [selectedAddons, setSelectedAddons] = useState([]); // State to store selected addons

  const handleAddAddon = (addon) => {
    if (!selectedAddons.some((selectedAddon) => selectedAddon.addonID === addon.addonID)) {
      // Add the addon to selectedAddons only if it's not already selected
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleRemoveAddon = (addon) => {
    const updatedAddons = selectedAddons.filter((item) => item.addonID !== addon.addonID);
    setSelectedAddons(updatedAddons);
  };

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
    height: 'auto', // Adjust height
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

  const listItemStyles = {
    marginBottom: '10px',
  };

  const confirmAddons = () => {
    // Add selected addons to the main cart
    onAddToCart([...addonsCart, ...selectedAddons]);
    setSelectedAddons([]); // Clear selected addons
    onClose(); // Close the AddonsPopup
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
        <h3>Addons</h3>
        <ul>
          {addonsData.map((addon, index) => (
            <li key={index} style={listItemStyles}>
              {addon.itemName} - ${addon.price.toFixed(2)}
              <span>
                {selectedAddons.some((selectedAddon) => selectedAddon.addonID === addon.addonID) ? (
                  <FontAwesomeIcon
                    icon={faMinusCircle}
                    className="addons-remove-icon"
                    onClick={() => handleRemoveAddon(addon)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    className="addons-add-icon"
                    onClick={() => handleAddAddon(addon)}
                  />
                )}
              </span>
            </li>
          ))}
        </ul>
        <button className="addons-add-to-cart" onClick={confirmAddons}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default AddonsPopup;
