import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import MenuPage from './MenuPage';
import HomePage from './HomePage';
import './styles.css';

function App() {
  // Create a state variable to control menu visibility
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header navigate={(page) => setShowMenu(page === 'menu')} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={showMenu ? <MenuPage /> : null} /> {/* Show MenuPage only when showMenu is true */}
          {/* Other routes... */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
