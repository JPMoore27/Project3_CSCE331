import React, { useState, useEffect } from 'react';
import './AddOnSectioStyles.css';    
const AddOnSection = () => {
  const [items, setItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://project3-team03g.onrender.com/api/addons/') // Replace with your API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Extract the desired data
        const extractedData = data.map(item => ({
          addonname: item.addonname,
          price: item.price,
          dairy: item.dairy,
        }));

        setItems(extractedData);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <center><button class="addon-item_button_2" onClick={togglePopup}>Show Addons</button></center>
      
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Addons</h2>
            <div className="addons-container">
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              {!loading && !error && (
                <div className="addon-items">
                  {items.map((item, index) => (
                    <div key={index} className="addon-item">
                      <h3>{item.addonname}</h3>
                      <p>Price: ${item.price} </p>
                      <p>Dairy: {item.dairy ? 'Yes' : 'No'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="close_btn" onClick={togglePopup}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddOnSection;
