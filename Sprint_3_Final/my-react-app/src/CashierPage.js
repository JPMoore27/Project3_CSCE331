import React, { useState } from 'react';
import CashierList from './CashierList';
import AddOnSection from './AddOnSection';
import AddonsPopup from './AddonsPopup';

const CashierPage = ({ showBackgroundImage }) => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Add your authentication logic here (replace 'cashier123' with your actual password)
    if (password === 'cashier123') {
      setAuthenticated(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  if (!authenticated) {
    return (
      <div className="password-container">
        <h2>Cashier Login</h2>
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
    <div className={`menu-page ${showBackgroundImage ? 'background-image' : ''}`}>
      <AddOnSection />
      <CashierList />
    </div>
  );
};

export default CashierPage;
