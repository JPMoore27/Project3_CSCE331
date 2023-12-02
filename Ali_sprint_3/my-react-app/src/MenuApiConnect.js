import React, { useState, useEffect } from 'react';

const MenuApiConnect = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/items/') // Replace with your API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Create an object to track seen item names
        const seen = {};
        // Filter out items with duplicate item names
        const filteredItems = data.filter(item => {
          return seen.hasOwnProperty(item.itemname) ? false : (seen[item.itemname] = true);
        });

        setItems(filteredItems);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Menu Items</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.itemname} - ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MenuApiConnect;
