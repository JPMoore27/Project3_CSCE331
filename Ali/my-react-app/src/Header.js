import React from 'react';

function Header() {
    return (
        <header>
            <Navbar />
        </header>
    );
}

function Navbar() {
    return (
        <nav className="navbar">
            <span className="brandName">SWEET EUGENE'S</span>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/menu">Menu</a></li>
                <li><a href="/about">Manager</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    );
}


export default Header;
