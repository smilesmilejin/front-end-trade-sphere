import { Link, useLocation } from "react-router";
import '../styles/NavBar.css';


function Navbar() {
  const location = useLocation(); // gives you current pathname
  const isActive = (path) => location.pathname === path;

  return (
    <nav className='nav-bar-container'>
      <Link to="/">
        <button className={isActive('/') ? 'active-link' : ''}>Home</button>
      </Link>
      <Link to="/itemsforsale">
        <button className={isActive('/itemsforsale') ? 'active-link' : ''}>Items for Sale</button>
      </Link>
      <Link to="/about">
        <button className={isActive('/about') ? 'active-link' : ''}>About the Platform</button>
      </Link>
      <Link to="/contact">
        <button className={isActive('/contact') ? 'active-link' : ''}>Contact Information</button>
      </Link>
    </nav>
  );
}

export default Navbar;
