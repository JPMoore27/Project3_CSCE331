import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import MenuPage from './MenuPage';
import HomePage from './HomePage';
import Manager from './Manager';
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
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={menuClicked ? <MenuPage /> : null} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/menupage" element={<MenuPage />} />
          {/* Other routes... */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;