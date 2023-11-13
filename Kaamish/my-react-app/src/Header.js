import React from 'react';
import { Link } from 'react-router-dom';

function Header({ navigate }) {
  return (
    <header>
      <nav className="navbar">
        <span className="brandName">SWEET EUGENE'S</span>
        <ul>
        <li><button onClick={() => { alert('Clicked Home'); navigate('home')}}>Home</button></li>
          {/* <li><button onClick={() => navigate('menu')}>Menu</button></li> */}
          <li><Link to="/manager">Manager</Link></li>
          <li><Link to="/menupage">Menu</Link></li>
          <li><button onClick={() => navigate('cashier')}>Cashier</button></li>
          <li><button onClick={() => navigate('customer')}>Customer</button></li>
          <li><button onClick={() => navigate('contact')}>Contact</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
