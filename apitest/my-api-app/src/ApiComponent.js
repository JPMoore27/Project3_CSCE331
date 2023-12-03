import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/items/';  // Replace with your Django API base URL

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ itemname: '', price: 0 });  // Example, modify as needed

  useEffect(() => {
<<<<<<< HEAD
    // Fetch items on component mount
=======
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

>>>>>>> 8f2901d11645ba463ff5bf8b1fb30d1346655fc6
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get(`${API_BASE_URL}/items/`);
      setItems(response.data);
=======
      const newItem = {
        itemname: 'test',
        price: '0.00', // Add a default price or another logic here
        // Add other properties as needed
      };

      const response = await axios.post('http://127.0.0.1:8000/api/items/', newItem);

      // Update state with the new item assuming the API returns it
      setItems(prevItems => [...prevItems, newItem]);
>>>>>>> 8f2901d11645ba463ff5bf8b1fb30d1346655fc6
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/items/`, newItem);
      setItems([...items, response.data]);
      setNewItem({ itemname: '', price: 0 });  // Clear input fields
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

<<<<<<< HEAD
  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`${API_BASE_URL}/items/${itemId}/`);
      setItems(items.filter(item => item.key !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
=======
  const removeItem = async (itemId) => {
    // Functionality to remove an item can be implemented here
    console.log(`Removing item with ID ${itemId}`);
>>>>>>> 8f2901d11645ba463ff5bf8b1fb30d1346655fc6
  };

  return (
    <div>
<<<<<<< HEAD
      <h2>Items List</h2>
      <ul>
        {items.map(item => (
          <li key={item.key}>
            {item.itemname} - ${item.price}
            <button onClick={() => handleDeleteItem(item.key)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add New Item</h2>
      <div>
        <label>
          Item Name:
          <input
            type="text"
            value={newItem.itemname}
            onChange={(e) => setNewItem({ ...newItem, itemname: e.target.value })}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
        </label>
        <button onClick={handleAddItem}>Add Item</button>
      </div>
=======
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
>>>>>>> 8f2901d11645ba463ff5bf8b1fb30d1346655fc6
    </div>
  );
};

export default ItemList;
