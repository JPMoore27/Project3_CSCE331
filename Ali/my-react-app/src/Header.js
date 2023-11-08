// Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate(); // Hook for navigation
  
  return (
    <header>
      <nav className="navbar">
        <span className="brandName">SWEET EUGENE'S</span>
        <ul>
          <li><button onClick={() => navigate('/')}>Home</button></li>
          <li><button onClick={() => navigate('/menu')}>Menu</button></li>
          <li><button onClick={() => navigate('/about')}>Manager</button></li>
          <li><button onClick={() => navigate('/contact')}>Contact</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
