import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID Token: " + response.credential);
  }

  useEffect(() => {
    // Check if the 'google' object and account.id are available
    if (window.google && window.google.account && window.google.account.id) {
      window.google.account.id.initialize({
        client_id: "598156964936-5qsp2pnbfrjkqccildlktudlpoa5csig.apps.googleusercontent.com",
        callback: handleCallbackResponse
      });

      window.google.account.id.renderButton(
        document.getElementById("signinDiv"),
        { theme: "outline", size: "large" }
      );
    } else {
      console.error("Google API or account.id not available");
    }
  }, []);

  // Create a state variable to control menu visibility
  const [menuClicked, setMenuClicked] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuClicked(!menuClicked);
  };

  return (
    <Router>
      <div className={`App ${menuClicked ? 'menu-open' : ''}`}>
        <Header navigate={(page) => toggleMenu()} />
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={menuClicked ? <MenuPage /> : null} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/AddNewItem" element={<AddNewItem />} />
          <Route path="/menupage" element={<MenuPage />} />
          <Route path="/CustomerPage" element={<CustomerPage />} />
          <Route path="/cashier" element={<Cashier />} />
          {/* Other routes... */}
        </Routes>
        <div id="signinDiv"></div>
      </div>
      
    </Router>
    
  );
}

export default App;
