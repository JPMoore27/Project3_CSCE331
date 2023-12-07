import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShoppingCartCheckOutStyles.css';

const API_BASE_URL = 'https://project3-team03g.onrender.com/api/';

const ShoppingCartCheckOut = ({ cart }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [orders, setOrders] = useState([]);  //used to be items, setItems
    const [newOrder, setNewOrder] = useState({
        orderid: 0,
        itemid: 8,
        quantity: 1,
        time: "2022-03-22T01:47:00Z",
        customername: "",
        takeout: false,
        price: "0"
    });

    

    useEffect(() => {
        fetchOrders();
    }, [cart]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}orders/`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const findLowestAvailableOrderId = () => {
        const orderIds = orders.map(order => order.orderid);
        return Math.max(0, ...orderIds) + 1; // Return 1 more than the highest in-use orderid
    };


    const handleAddItem = async () => {
        try {
            // Find the highest order ID and add 1
            const newOrderId = findLowestAvailableOrderId();

         
            // Create a new order object
            const order = {
                orderid: newOrderId,
                itemid: newOrder.itemid,
                quantity: newOrder.quantity,
                time: new Date().toISOString(), // Current timestamp
                customername: newOrder.customername,
                takeout: newOrder.takeout,
                price: newOrder.price
            };

    
            console.log('Data sent to server:', order); // Log the data being sent to the server
    
            // Send the new order to the server
            const response = await axios.post(`${API_BASE_URL}orders/`, order);
    
            console.log('Server response:', response.data); // Log the server's response
    
            // Update the items state with the new order
            setOrders([...orders, response.data]);
    
            // Reset the newItem state
            setNewOrder({ orderid:0, itemid: 8, quantity: 1, time: "2022-03-22T01:47:00Z", customername: "", takeout: false, price: "0.00" });
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
                                <button onClick={handleAddItem}>Check out</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCartCheckOut;
