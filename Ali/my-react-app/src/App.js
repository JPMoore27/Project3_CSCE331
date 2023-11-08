// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import MenuPage from './MenuPage';
import HomePage from './HomePage'; // Make sure this import path is correct

// Other imports...

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Assuming you have a HomePage component */}
          <Route path="/menu" element={<MenuPage />} />
          {/* Other routes... */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
