import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiComponent = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/items/');
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
    // Do nothing for now
    console.log(`Removing item with ID ${itemId}`);
  };

  return (
    <div>
      <h2>Items</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button onClick={addItem}>Add Item</button>
          <table>
            {/* Table structure remains the same */}
            {/* ... */}
          </table>
          {items.map(item => (
            <div key={item.key}>
              <span>{item.itemname}</span>
              <button onClick={() => removeItem(item.itemid)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiComponent;
