import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShoppingCartCheckOutStyles.css';

const API_BASE_URL = 'https://project3-team03g.onrender.com/api/';

const ShoppingCartCheckOut = ({ cart }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [orders, setOrders] = useState([]); // Used to be items, setItems
  const [items, setItems] = useState([]); // To store fetched items
  const [newOrder, setNewOrder] = useState({
    orderid: 0,
    itemid: 8,
    quantity: 1,
    time: "2022-03-22T01:47:00Z",
    customername: "",
    takeout: false,
    price: "0.00"
  });

  useEffect(() => {
    fetchOrders();
    fetchItems(); // Fetch items when the component mounts
  }, [cart]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}orders/`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}items/`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const findLowestAvailableOrderId = () => {
    const orderIds = orders.map(order => order.orderid);
    return Math.max(0, ...orderIds) + 1; // Return 1 more than the highest in-use orderid
  };

  const getItemIdByName = (itemName) => {
    const item = items.find(item => item.itemname === itemName);
    return item ? item.itemid : 0; // Return 0 if item not found
  };


  const handleAddItem = async (itemId) => {
    try {
      // Find the highest order ID and add 1
      const startOrderId = findLowestAvailableOrderId();

      // Create an array to store all the new orders
      const newOrders = [];

      

      // Loop through the items in the cart
      const counter = -1;
      for (const cartItem of cart) {
        const newOrderId = startOrderId + newOrders.length;
        
        const tempItemName = cartItem.itemName;
        const itemId_found = getItemIdByName(tempItemName);
        const order = {
          orderid: newOrderId,
          itemid: itemId_found, // Use the passed itemId
          quantity: cartItem.quantity,
          time: new Date().toISOString(),
          customername: newOrder.customername,
          takeout: newOrder.takeout,
          price: cartItem.price,
        };
        
        
        newOrders.push(order);
      }

      // Loop through the new orders array and send each order to the server
      
      for (const newOrderItem of newOrders) {
        const response = await axios.post(`${API_BASE_URL}orders/`, newOrderItem);
        console.log('Data sent to server:', newOrderItem); // Log the data being sent to the server
        console.log('Server response:', response.data); // Log the server's response
      }

      // Update the orders state with the new orders
      setOrders([...orders, ...newOrders]);

      // Reset the newItem state
      setNewOrder({
        orderid: 0,
        itemid: 8,
        quantity: 1,
        time: "2022-03-22T01:47:00Z",
        customername: "",
        takeout: false,
        price: "0.00",
      });
    } catch (error) {
      console.error('Error adding ORDER:', error);
    }
  };

  return (
    <div>
      <center><button className="addon-item_button" onClick={() => setShowPopup(true)}>Show Orders</button></center>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Orders</h2>
            <div className="orders-container">
              <h3>Check out</h3>
              <div>
                <label>
                  Customer Name:
                  <input
                    type="text"
                    value={newOrder.customername}
                    onChange={event => setNewOrder({ ...newOrder, customername: event.target.value })}
                  />
                </label>
                <label>
                  Takeout:
                  <input
                    type="checkbox"
                    checked={newOrder.takeout}
                    onChange={event => setNewOrder({ ...newOrder, takeout: event.target.checked })}
                  />
                </label>
                <button onClick={() => handleAddItem(newOrder.itemid)}>Check out</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartCheckOut;