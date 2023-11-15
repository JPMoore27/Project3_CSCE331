// Manager.js
import React, { useState } from 'react';
import './Manager.css'; // Import the CSS file for styling

const Manager = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showCashierOptions, setShowCashierOptions] = useState(false);
  const [showReportsOptions, setShowReportsOptions] = useState(false);
  const [showEmployeeOptions, setShowEmployeeOptions] = useState(false);

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

  const handleCashierButtonClick = () => {
    setShowCashierOptions(!showCashierOptions);
    setShowReportsOptions(false); // Close Reports options if open
    setShowEmployeeOptions(false); //Close Employee Button if open
  };

  const handleReportsButtonClick = () => {
    setShowReportsOptions(!showReportsOptions);
    setShowCashierOptions(false); // Close Cashier options if open
    setShowEmployeeOptions(false); //Close Employee Button if open
  };

  const handleEmployeeButtonClick = () => {
    setShowEmployeeOptions(!showEmployeeOptions);
    setShowCashierOptions(false); // Close Cashier options if open
    setShowReportsOptions(false); // Close Reports options if open
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
      {/* Heading buttons for Cashier and Reports */}
      <div className="button-container">
        <button className="heading-button" onClick={handleCashierButtonClick}>
          Cashier
        </button>
        {showCashierOptions && (
          <div className="sub-button-container">
            <button className="sub-button">Check-In</button>
            <button className="sub-button">Check-Out</button>
            <button className="sub-button">Open Drawer</button>
          </div>
        )}
        <button className="heading-button" onClick={handleReportsButtonClick}>
          Reports
        </button>
        {showReportsOptions && (
          <div className="sub-button-container">
            <button className="sub-button">Inventory</button>
            <button className="sub-button">Flash Reports</button>
            <button className="sub-button">Sales Report</button>
            <button className="sub-button">Cashier Sales</button>
            <button className="sub-button">Labor Report</button>
          </div>
        )}
        <button className="heading-button" onClick={handleEmployeeButtonClick}>
          Employee
        </button>
        {showEmployeeOptions && (
          <div className="sub-button-container">
            <button className="sub-button">Edit Clock-In/Out Time</button>
            <button className="sub-button">Edit Inventory</button>
            <button className="sub-button">Tax Reports</button>
            <button className="sub-button">History</button>
            <button className="sub-button">Reviews</button>
          </div>
        )}
      </div>

      {/* Display order management UI */}
      <div>
        <ul>
          {orders.map((order, index) => (
            <li key={index}>{order}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Manager;
