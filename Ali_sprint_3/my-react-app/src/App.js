import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import MenuPage from './MenuPage';
import HomePage from './HomePage';
import Manager from './Manager';
import Cashier from './Cashier';
import Customer from './Customer';
import './styles.css';
import MenuApiConnect from './MenuApiConnect'; // Import the new component

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
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={menuClicked ? <MenuPage /> : null} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/menupage" element={<MenuPage />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/cashier" element={<Cashier />} />
          {/* Other routes... */}
        </Routes>
        <div className="App">
          <MenuApiConnect /> {/* Use the component */}
        </div>
      </div>
    </Router>
  );
}

export default App;
