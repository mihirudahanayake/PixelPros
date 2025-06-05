import React, { useState } from 'react';
import { Link }            from 'react-router-dom';

import cartImg             from '../images/cart.png';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav-header">

      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
      </div>

      <div className="logo">
        <img src="logo.png" alt="Restaurant Logo" />
      </div>

      <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/popular">Popular Dishes</Link></li>
        <li><Link to="/foodMenu">Food Menu</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>

      <Link to="/cart">
        <div className="cart-icon">
          <img src={cartImg} alt="Cart" />
        </div>
      </Link>
    </nav>
  );
};

export default Header;
