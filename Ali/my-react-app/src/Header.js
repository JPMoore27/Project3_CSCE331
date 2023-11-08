import React from 'react';

function Header({ navigate }) {
  return (
    <header>
      <nav className="navbar">
        <span className="brandName">SWEET EUGENE'S</span>
        <ul>
          <li><button onClick={() => navigate('home')}>Home</button></li>
          <li><button onClick={() => navigate('menu')}>Menu</button></li>
          <li><button onClick={() => navigate('about')}>Manager</button></li>
          <li><button onClick={() => navigate('contact')}>Contact</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
