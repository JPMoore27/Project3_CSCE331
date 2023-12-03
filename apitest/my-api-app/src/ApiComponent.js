import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/items/';  // Replace with your Django API base URL

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ itemname: '', price: 0 });  // Example, modify as needed

  useEffect(() => {
    // Fetch items on component mount
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/items/`);
      setItems(response.data);
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

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`${API_BASE_URL}/items/${itemId}/`);
      setItems(items.filter(item => item.key !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default ItemList;
