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
          <li><Link to="/menupage">Customer</Link></li>
          <li><Link to="/CashierPage">Cashier</Link></li>
          <li><Link to="/CustomerPage">Menu</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
