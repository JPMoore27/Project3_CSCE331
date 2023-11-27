import React from 'react';
import { Link } from 'react-router-dom';

function Header({ navigate }) {
  return (
    <header>
      <nav className="navbar">
        <span className="brandName">SWEET EUGENE'S</span>
        <ul>
          {/* <li><button onClick={() => navigate('menu')}>Menu</button></li> */}
          <li><Link to="/">Home Page</Link></li>
          <li><Link to="/manager">Manager</Link></li>
          <li><Link to="/menupage">Menu</Link></li>
          <li><Link to="/cashier">Cashier</Link></li>
          <li><Link to="/customer">Customer</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
