import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import MenuPage from './MenuPage';
import Home from './Home';
import Manager from './Manager';
import Cashier from './Cashier';
import Customer from './Customer';
import './styles.css';

function App() {
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
          <Route path="/home" element={<Home />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/menupage" element={<MenuPage />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/cashier" element={<Cashier />} />
          {/* Other routes... */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
