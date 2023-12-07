// src/components/OrdersTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState({});

  useEffect(() => {
    // Fetch orders from your Django backend API and sort by orderid
    axios.get('https://project3-team03g.onrender.com/api/orders/')
      .then(response => {
        const sortedOrders = response.data.sort((a, b) => a.orderid - b.orderid);
        setOrders(sortedOrders);
      })
      .catch(error => console.error('Error fetching orders:', error));

    // Fetch items from your Django backend API
    axios.get('https://project3-team03g.onrender.com/api/items/')
      .then(response => {
        // Create a mapping of itemid to itemname for quick lookups
        const itemMapping = {};
        response.data.forEach(item => {
          itemMapping[item.itemid] = item.itemname;
        });
        setItems(itemMapping);
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleVoidClick = (orderId) => {
    // Make a DELETE request to void the order
    axios.delete(`https://project3-team03g.onrender.com/api/orders/${orderId}/`)
      .then(() => {
        // Remove the voided order from the local state
        setOrders(prevOrders => prevOrders.filter(order => order.orderid !== orderId));
      })
      .catch(error => console.error('Error voiding order:', error));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Time</th>
          <th>Customer Name</th>
          <th>Takeout</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.orderid}>
            <td>{order.orderid}</td>
            <td>{items[order.itemid]}</td>
            <td>{order.quantity}</td>
            <td>{order.time}</td>
            <td>{order.customername}</td>
            <td>{order.takeout ? 'Yes' : 'No'}</td>
            <td>{order.price}</td>
            <td>
              <button onClick={() => handleVoidClick(order.orderid)}>Void</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
