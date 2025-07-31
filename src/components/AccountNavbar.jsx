import { Link, useLocation } from 'react-router';
// import UserLoginStatusContext from '../contexts/UserLoginStatusContext';
// import { useContext } from 'react';
import '../styles/AccountNavbar.css';

function AccountNavbar() {
  const location = useLocation(); // gives you current pathname
  
  // const { userLoginStatus } = useContext(UserLoginStatusContext);

  // console.log('Current location:', location);            // Full location object
  // console.log('Current path:', location.pathname);       // Just the path like "/about"

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="account-navbar">
      <Link to="/profile">
        <button className={isActive('/profile') ? 'account-navbar-active-link' : ''}>Profile</button>
      </Link>

      <Link to="/profile/post-item-to-sell">
        <button className={isActive('/profile/post-item-to-sell') ? 'account-navbar-active-link' : ''}>Post an Item to Sell</button>
      </Link>
      
      <Link to="/profile/my-favorite-listings">
        <button className={isActive('/profile/my-favorite-listings') ? 'account-navbar-active-link' : ''}>My Favorite Listings</button>
      </Link>

      <Link to="/profile/my-sell-listings">
        <button className={isActive('/profile/my-sell-listings') ? 'account-navbar-active-link' : ''}>My Selling Listings</button>
      </Link>
    </nav>
  );

}

export default AccountNavbar; 