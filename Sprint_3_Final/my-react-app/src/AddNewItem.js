import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Base styles for your application
import './AddNewItemStyle.css'; // Styles specific to the AddNewItem component

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const AddNewItem = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ itemname: '', price: 0, dairy: false });
  const [stockItems, setStockItems] = useState([]);
  const [selectedStockItems, setSelectedStockItems] = useState([]);

  useEffect(() => {
    fetchStockItems();
  }, []);

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

  return (
    <div className="add-item-form"> 
      <h2 className="header">Add New Item</h2> 
      <div className="form-group"> {/* Added for grouping form elements */}
        <label className="input-label"> 
          Item Name:
          <input
            className="input-field" 
            type="text"
            value={newItem.itemname}
            onChange={(e) => setNewItem({ ...newItem, itemname: e.target.value })}
          />
        </label>
        <label className="input-label"> 
          Price:
          <input
            className="input-field" 
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
        </label>
        <label className="input-label"> 
          Dairy:
          <input
            className="input-field"
            type="checkbox"
            checked={newItem.dairy}
            onChange={(e) => setNewItem({ ...newItem, dairy: e.target.checked })}
          />
        </label>
      </div>
      <div className="stock-items">
      <h3>Stock Items</h3>
      {stockItems.map(stockItem => (
        <div key={stockItem.stockid} className="stock-item">
          <input
            type="checkbox"
            id={`stock-item-${stockItem.stockid}`}
            checked={selectedStockItems.some(item => item.stockid === stockItem.stockid)}
            onChange={(e) => {
              const updatedSelectedStockItems = e.target.checked
                ? [...selectedStockItems, stockItem]
                : selectedStockItems.filter(item => item.stockid !== stockItem.stockid);
              setSelectedStockItems(updatedSelectedStockItems);
            }}
          />
          <label htmlFor={`stock-item-${stockItem.stockid}`}>{stockItem.stockname}</label>
        </div>
      ))}
    </div>
      <button className="button" onClick={handleAddItem}>Add Item</button> 
    </div>
  );
};

export default AddNewItem;
