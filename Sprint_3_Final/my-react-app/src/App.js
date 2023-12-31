import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header';
import MenuPage from './MenuPage';
import HomePage from './HomePage';
import Manager from './Manager';
import CashierPage from './CashierPage';
import CustomerPage from './CustomerPage';
import './styles.css';
import './AddNewItem';
import AddNewItem from './AddNewItem';
import EditStock from './EditStock';
import ViewOrder from './ViewOrder';
import OrderHistoryChart from './OrderHistoryChart';
import TotalSalesChart from './TotalSalesChart.js'
/*global google*/
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

// hi kaamish 
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);

  const toggleMenu = () => {
    setMenuClicked(!menuClicked);
  };

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
      console.log(credentialResponseDecoded);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error decoding token:', error);
      setIsAuthenticated(false);
    }
  };

  const handleLoginFailure = () => {
    console.log('Login Failed');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className={`App ${isAuthenticated ? 'app-content' : 'login-screen'}`}>
        {!isAuthenticated ? (
          <div className="login-container">
            <h2>Sign-In</h2>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
            />
          </div>
        ) : (
          <>
            <Header navigate={toggleMenu} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={menuClicked ? <MenuPage /> : null} />
              <Route path="/manager" element={<Manager />} />
              <Route path="/menupage" element={<MenuPage />} />
              <Route path="/CustomerPage" element={<CustomerPage />} />
              <Route path="/CashierPage" element={<CashierPage />} />
              <Route path="/AddNewItem" element={<AddNewItem />} />
              <Route path="/EditStock" element={<EditStock />} />
              <Route path="/ViewOrder" element={<ViewOrder />} />
              <Route path="/OrderHistoryChart" element={<OrderHistoryChart />} />
              <Route path="/TotalSalesChart" element={<TotalSalesChart />} />
              {/* Other routes... */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        )}
      </div>
      
    </Router>
    
  );
}

export default App;
