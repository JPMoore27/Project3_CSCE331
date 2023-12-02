import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiComponent = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/items/');
        // Extracting the itemname and price from each item in the response
        const extractedItems = response.data.map(({ itemname, price }) => ({ itemname, price }));
        setItems(extractedItems);
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
        price: '0.00', // Add a default price or another logic here
        // Add other properties as needed
      };

      const response = await axios.post('http://127.0.0.1:8000/api/items/', newItem);

      // Update state with the new item assuming the API returns it
      setItems(prevItems => [...prevItems, newItem]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const removeItem = async (itemId) => {
    // Functionality to remove an item can be implemented here
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
          {items.map((item, index) => (
            <div key={index}>
              <span>{item.itemname}: ${item.price}</span>
              {/* Assume removeItem function is implemented correctly */}
              <button onClick={() => removeItem(item.key)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiComponent;
