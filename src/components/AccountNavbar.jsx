import { Link, useLocation } from 'react-router';
import '../styles/AccountNavbar.css';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';
import UserContext from '../contexts/UserContext';

function AccountNavbar() {
  const location = useLocation(); // gives you current pathname
  const { setUserLoginStatus } = useContext(UserLoginStatusContext);
  const { setCurUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    setUserLoginStatus(false);
    setCurUserData(null);

    // Wait for state update then navigate
    setTimeout(() => {
      navigate('/');
    }, 0);

  };

  return (
    <nav className="account-navbar">
      <Link to="/profile">
        <button className={isActive('/profile') ? 'account-navbar-active-link' : ''}>👤 Profile</button>
      </Link>

      <Link to="/profile/post-item-to-sell">
        <button className={isActive('/profile/post-item-to-sell') ? 'account-navbar-active-link' : ''}>➕ Post an Item to Sell</button>
      </Link>
      
      <Link to="/profile/my-favorite-listings">
        <button className={isActive('/profile/my-favorite-listings') ? 'account-navbar-active-link' : ''}>💖 My Favorite Listings</button>
      </Link>

      <Link to="/profile/my-sell-listings">
        <button className={isActive('/profile/my-sell-listings') ? 'account-navbar-active-link' : ''}>🧾 My Selling Listings</button>
      </Link>

      <div>
        <button className="logout" onClick={handleLogout}>👋 Log Out</button>
      </div>
    </nav>
  );

}

export default AccountNavbar; 