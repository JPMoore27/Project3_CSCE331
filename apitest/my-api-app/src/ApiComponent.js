import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiComponent = () => {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/items/');
        console.log('API Response:', response.data);

        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const addItem = async () => {
    try {
      const newItem = {
        itemname: 'test',
        key: 57,
        itemid: 21,
        // Add other properties as needed
      };

      const response = await axios.post('http://127.0.0.1:8000/api/items/', newItem);

      // Assuming the API returns the updated list of items after adding a new item
      setItems(response.data);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      // Send a DELETE request to remove the item
      const response = await axios.delete(`http://127.0.0.1:8000/api/items/${itemId}`);

      // Assuming the API returns the updated list of items after deleting the item
      setItems(response.data);
    } catch (error) {
      console.error(`Error removing item with ID ${itemId}:`, error);
    }
  };

  return (
    <div>
      <h2>Items</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button onClick={addItem}>Add Item</button>
          {Object.keys(items).map(key => (
            <div key={key}>
              <span>{items[key].itemname}</span>
              <button onClick={() => removeItem(items[key].key)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiComponent;
