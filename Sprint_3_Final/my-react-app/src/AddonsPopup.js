import React, { useState, useEffect } from 'react';
import './AddonPopupStyles.css';

const AddonsPopup = ({ showPopup, togglePopup }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetch('https://project3-team03g.onrender.com/api/addons/') // Replace with your API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Extract the desired data
        const extractedData = data.map((item) => ({
          addonname: item.addonname,
          price: item.price,
          dairy: item.dairy,
        }));

        setItems(extractedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleAddonClick = (index) => {
    // Check if the item is already selected
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  return (
    <div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="addons-container">
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              {!loading && !error && (
                <div className="addon-items">
                  {items.map((item, index) => (
                    <button
                      key={index}
                      className={`addon-item_button${
                        selectedItems.includes(index) ? ' selected' : ''
                      }`}
                      onClick={() => handleAddonClick(index)}
                    >
                      <h3>{item.addonname}</h3>
                      <h5>Price: ${item.price}</h5>
                      <h5>Dairy: {item.dairy ? 'Yes' : 'No'}</h5>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="close_btn" onClick={togglePopup}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddonsPopup;
