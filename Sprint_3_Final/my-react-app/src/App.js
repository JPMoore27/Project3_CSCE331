import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header';
import MenuPage from './MenuPage';
import HomePage from './HomePage';
import Manager from './Manager';
import Cashier from './Cashier';
import CustomerPage from './CustomerPage';
import './styles.css';
import './AddNewItem';
import AddNewItem from './AddNewItem';
/*global google*/
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


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
              <Route path="/customer" element={<CustomerPage />} />
              <Route path="/cashier" element={<Cashier />} />
              <Route path="/AddNewItem" element={<AddNewItem />} />
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
