import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddNewItemStyle.css'; // Import the CSS file

//const API_BASE_URL = 'http://127.0.0.1:8000/api';
const API_BASE_URL = 'https://project3-team03g.onrender.com/api';
const AddNewItem = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ itemname: '', price: 0, stockid: 0, dairy: false });
  const [stockItems, setStockItems] = useState([]);
  const [selectedStockItems, setSelectedStockItems] = useState([]);

  useEffect(() => {
    fetchItems();
    fetchStockItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/items/`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchStockItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stock/`);
      setStockItems(response.data);
    } catch (error) {
      console.error('Error fetching stock items:', error);
    }
  };

  const findLowestAvailableKey = () => {
    const keys = items.map(item => item.key);
    return Math.max(0, ...keys) + 1; // Return 1 more than the highest in-use key
  };

  const findLowestAvailableItemId = () => {
    const itemIds = items.map(item => item.itemid);
    return Math.max(0, ...itemIds) + 1; // Return 1 more than the highest in-use itemid
  };

  const handleAddItem = async () => {
    try {
      const newItemId = findLowestAvailableItemId();
      const startKey = findLowestAvailableKey(); // Find the starting key

      // Create a new item for each selected stock item
      const newItemPromises = selectedStockItems.map(async (stockItem, index) => {
        const newKeyForEntry = startKey + index; // Generate a new key for each entry
        const response = await axios.post(`${API_BASE_URL}/items/`, {
          ...newItem,
          key: newKeyForEntry,
          itemid: newItemId,
          stockid: stockItem.stockid,
        });
        return response.data;
      });

      // Wait for all new items to be created
      const newItems = await Promise.all(newItemPromises);

      setItems([...items, ...newItems]);
      setNewItem({ itemname: '', price: 0, stockid: 0, dairy: false });
      setSelectedStockItems([]); // Reset selected stock items
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

  // Filter items to show only those with unique itemid
  const uniqueItems = Array.from(new Set(items.map(item => item.itemid)))
    .map(itemid => items.find(item => item.itemid === itemid));

  return (
    <div>
      <center><h2>Items List</h2></center>
      <div className="items-list-center"> {/* Apply styles to center the list */}
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {uniqueItems.map(item => (
              <tr key={item.key}>
                <td>{item.itemname}</td>
                <td>${item.price}</td>
                <td>
                  <button onClick={() => handleDeleteItem(item.key)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div><br/>
      <br/>
      <center><h2>Add New Item</h2></center>
      <div className="add-item-form"> {/* Apply styles */}
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
        <label>
          Dairy:
          <input
            type="checkbox"
            checked={newItem.dairy}
            onChange={(e) => setNewItem({ ...newItem, dairy: e.target.checked })}
          />
        </label>
        <div>
          <h3>Stock Items</h3>
          {stockItems.map(stockItem => (
            <div key={stockItem.stockid} className="stock-item"> {/* Apply styles */}
              <input
                type="checkbox"
                checked={selectedStockItems.some(item => item.stockid === stockItem.stockid)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedStockItems([...selectedStockItems, stockItem]);
                  } else {
                    setSelectedStockItems(selectedStockItems.filter(item => item.stockid !== stockItem.stockid));
                  }
                }}
              />
              {stockItem.stockname}
            </div>
          ))}
        </div>
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
};

export default AddNewItem;
