import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShoppingCartCheckOutStyles.css';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const ShoppingCartCheckOut = ({ cart }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [newItem, setNewItem] = useState({
        itemid: 8,
        quantity: 1,
        time: "2022-03-22T01:47:00Z",
        customername: "",
        takeout: false,
        price: "0"
    });

    // Define the 'items' state and 'setItems' function
    const [items, setItems] = useState([]); // Add this line

    useEffect(() => {
        // You can use 'cart' as needed in this component
    }, [cart]);

    const handleAddItem = async () => {
        try {
            // Find the highest order ID and add 1
            const highestOrderId = Math.max(...items.map(item => item.orderid), 0); // Ensure a default of 0 if no orders exist
            const newOrderId = highestOrderId + 1;
    
            // Create a new order object
            const newOrder = {
                orderid: newOrderId,
                itemid: newItem.itemid,
                quantity: newItem.quantity,
                time: new Date().toISOString(), // Current timestamp
                customername: newItem.customername,
                takeout: newItem.takeout,
                price: newItem.price
            };
    
            console.log('Data sent to server:', newOrder); // Log the data being sent to the server
    
            // Send the new order to the server
            const response = await axios.post(`${API_BASE_URL}/orders/`, newOrder);
    
            console.log('Server response:', response.data); // Log the server's response
    
            // Update the items state with the new order
            setItems([...items, response.data]);
    
            // Reset the newItem state
            setNewItem({ itemid: 8, quantity: 1, time: "2022-03-22T01:47:00Z", customername: "", takeout: false, price: "0.00" });
        } catch (error) {
            console.error('Error adding item:', error);
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
                                        value={newItem.customername}
                                        onChange={event => setNewItem({ ...newItem, customername: event.target.value })}
                                    />
                                </label>
                                <label>
                                    Takeout:
                                    <input
                                        type="checkbox"
                                        checked={newItem.takeout}
                                        onChange={event => setNewItem({ ...newItem, takeout: event.target.checked })}
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
