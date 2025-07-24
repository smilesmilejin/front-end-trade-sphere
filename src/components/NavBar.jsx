// import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { Link, useLocation } from "react-router";


function Navbar() {
  const location = useLocation(); // gives you current pathname

  console.log('Current location:', location);            // Full location object
  console.log('Current path:', location.pathname);       // Just the path like "/about"

  // Current location: {pathname: '/itemsforsale', search: '', hash: '', state: null, key: 'qhzlwbqh'}
  //   Current path: /itemsforsale

  // helper to check if path is active
  // You're defining a helper function called isActive.
  // It takes a path (like "/about" or "/contact") as input.
  // It compares that input with the current path of the URL, using location.pathname.
  // It returns true if they match (i.e., the user is currently on that page), otherwise false.
  const isActive = (path) => location.pathname === path;

  return (
    <nav>
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


// import { Link, useLocation } from "react-router";

// <Link to="/dashboard">Dashboard</Link>;

// <Link
//   to={{
//     pathname: "/some/path",
//     search: "?query=string",
//     hash: "#hash",
//   }}
// />
