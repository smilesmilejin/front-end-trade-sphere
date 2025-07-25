import { Link, useLocation } from 'react-router';
// import { NavLink, useLocation } from "react-router";
import './AccountNavBar.css';

function AccountNavbar() {
  const location = useLocation(); // gives you current pathname

  console.log('Current location:', location);            // Full location object
  console.log('Current path:', location.pathname);       // Just the path like "/about"

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="account-navbar">
      <Link to="/profile">
        <button className={isActive('/profile') ? 'active-link' : ''}>Profile</button>
      </Link>
      <Link to="/profile/post-item-to-sell">
        <button className={isActive('/profile/post-item-to-sell') ? 'active-link' : ''}>Post an Item to Sell</button>
      </Link>
      <Link to="/profile/my-favorite-listings">
        <button className={isActive('/profile/my-favorite-listing') ? 'active-link' : ''}>My Favorite Listings</button>
      </Link>
      <Link to="/profile/my-sell-listings">
        <button className={isActive('/profile/my-sell-listing') ? 'active-link' : ''}>My Selling Listings</button>
      </Link>
    </nav>
  );

//   return (
//     <nav className="account-navbar">
//       <NavLink to="/profile" className={({ isActive }) => isActive ? 'active-link' : ''}>
//         Profile
//       </NavLink>
//       <NavLink to="/profile/post-item-to-sell" className={({ isActive }) => isActive ? 'active-link' : ''}>
//         Post an Item to Sell
//       </NavLink>
//       <NavLink to="/profile/my-favorite-listings" className={({ isActive }) => isActive ? 'active-link' : ''}>
//         My Favorite Listings
//       </NavLink>
//       <NavLink to="/profile/my-sell-listings" className={({ isActive }) => isActive ? 'active-link' : ''}>
//         My Selling Listings
//       </NavLink>
//     </nav>
//   );

}

export default AccountNavbar; 