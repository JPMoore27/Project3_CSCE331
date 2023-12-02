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
      {/* Heading buttons for Cashier, Reports, Employee, Inventory, and Settings */}
      <div className="button-container">
        <Link to="/cashier" className="heading-button">
          Cashier
        </Link>
        <Link to="/reports" className="heading-button">
          Reports
        </Link>
        <Link to="/employee" className="heading-button">
          Employee
        </Link>

        {/* New buttons: Inventory, Settings, and Sales */}
        <Link to="/inventory" className="heading-button">
          Inventory
        </Link>
        <Link to="/settings" className="heading-button">
          Settings
        </Link>
        <Link to="/sales" className="heading-button">
        Sales
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

      {/* Define routes for each page */}
      <Routes>
        <Route path="/cashier" element={<div>Cashier Page</div>} />
        <Route path="/reports" element={<div>Reports Page</div>} />
        <Route path="/employee" element={<div>Employee Page</div>} />
        <Route path="/inventory" element={<div>Inventory Page</div>} />
        <Route path="/settings" element={<div>Settings Page</div>} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </div>
  );
};

export default Manager;