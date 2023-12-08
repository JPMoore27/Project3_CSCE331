import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import './ShoppingCartCheckOutStyles.css';

const API_BASE_URL = 'https://project3-team03g.onrender.com/api/';

const ShoppingCartCheckOut = ({ cart }) => {
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [newOrder, setNewOrder] = useState({
    orderid: 0,
    itemid: 8,
    quantity: 1,
    time: "2022-03-22T01:47:00Z",
    customername: "",
    takeout: false,
    price: "0.00"
  });
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchItems();
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
    return Math.max(0, ...orderIds) + 1;
  };
  const closeButtonStyles = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  };

  const boxStyles = {
    width: '400px',
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  const getItemIdByName = (itemName) => {
    const item = items.find(item => item.itemname === itemName);
    return item ? item.itemid : 0;
  };

  const handleAddItem = async () => {
    try {
      const startOrderId = findLowestAvailableOrderId();
      const newOrders = [];

      for (const cartItem of cart) {
        const newOrderId = startOrderId + newOrders.length;
        const tempItemName = cartItem.itemName;
        const itemId_found = getItemIdByName(tempItemName);
        const order = {
          orderid: newOrderId,
          itemid: itemId_found,
          quantity: cartItem.quantity,
          time: new Date().toISOString(),
          customername: newOrder.customername,
          takeout: newOrder.takeout,
          price: cartItem.price,
        };

        newOrders.push(order);
      }

      for (const newOrderItem of newOrders) {
        const response = await axios.post(`${API_BASE_URL}orders/`, newOrderItem);
        console.log('Data sent to server:', newOrderItem);
        console.log('Server response:', response.data);
      }

      setOrders([...orders, ...newOrders]);
      setNewOrder({
        orderid: 0,
        itemid: 8,
        quantity: 1,
        time: "2022-03-22T01:47:00Z",
        customername: "",
        takeout: false,
        price: "0.00",
      });

      // Set a confirmation message
      setConfirmationMessage('Orders have been successfully added.');

      // Show the confirmation pop-up
      setShowCheckoutPopup(false); // Hide the checkout pop-up
      setShowConfirmationPopup(true); // Show the confirmation pop-up

      // Hide the confirmation pop-up after 3 seconds
      setTimeout(() => {
        setShowConfirmationPopup(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding ORDER:', error);
    }
  };

  const closeCheckoutPopup = () => {
    setShowCheckoutPopup(false);
  };

  return (
    <div>
      <center>
        <button className="addon-item_button_2" onClick={() => setShowCheckoutPopup(true)}>Show Orders</button>
      </center>

      {showCheckoutPopup && (
        <div style={boxStyles}>
            <div className="popup">
                <div className="popup-content">
                    <div className="popup-header">
                        
                    <h2>Orders</h2>
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="close-icon"
                        style={closeButtonStyles}
                        onClick={closeCheckoutPopup}
                        />
                    
                    </div>
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
                        <button onClick={handleAddItem}>Check out</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {showConfirmationPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2>Order Confirmation</h2>
              <span className="close-popup" onClick={() => setShowConfirmationPopup(false)}>X</span>
            </div>
            <div className="confirmation-message">
              {confirmationMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartCheckOut;
