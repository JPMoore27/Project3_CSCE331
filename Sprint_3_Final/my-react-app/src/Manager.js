// Manager.js
import React, { useState } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import Sales from './ManagerButtons/Sales.js';
import './Manager.css';


const Manager = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);

  const handleOrderSubmit = (order) => {
    setOrders([...orders, order]);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (password === 'manager123') {
      setAuthenticated(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  if (!authenticated) {
    return (
      <div className="password-container">
        <h2>Manager Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="manager-container">
      <div className="button-container">
        <Link to="/AddNewItem" className="heading-button">
          Add New Item to Menu
        </Link>
        <Link to="/OrderHistoryChart" className="heading-button">
          View Order Sales Chart
        </Link>
        <Link to="/TotalSalesChart" className="heading-button">
          View Total Sales Chart
        </Link>
        <Link to="/EditStock" className="heading-button">
          Edit Stock
        </Link>
        <Link to="/ViewOrder" className="heading-button">
          View Order History
        </Link>
      </div>

      {/* Display order management UI */}
      <div>
        <ul>
          {orders.map((order, index) => (
            <li key={index}>{order}</li>
          ))}
        </ul>
      </div>

      <Routes>
        <Route path="/AddNewItem" element={<div>Add New Item to Menu</div>} />
        <Route path="/OrderHistoryChart" element={<div>View Order History</div>} />
        <Route path="/EditStock" element={<div>EditStock Page</div>} />
        <Route path="/ViewOrder" element={<div>ViewOrder Page</div>} />
        <Route path="/TotalSalesChart" element={<div>View Total Sales Chart</div>} />
      </Routes>
    </div>
  );
};

export default Manager;