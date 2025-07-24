import './Header.css';
import Logo from '../assets/Logo.png';
import SearchIcon from '../assets/SearchIcon.png';
import UserLogo from '../assets/UserLogo.png';

// import { Link, useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { UserLoginStatusContext } from '../App';


const Header = () => {
//   const { userLoginStatus, setUserLoginStatus } = useContext(UserLoginStatusContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setUserLoginStatus(false);
//     // Optional: clear user data from localStorage or cookies if used
//     navigate('/');
//   };

  // return (
  //   <header>This is header</header>
  // )

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src={Logo} alt="My Logo" />
        <h1>TradeSphere</h1>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search Items" />
        <button className="search-button" aria-label="Search">
          <img src={SearchIcon} alt="Search" />
        </button>
      </div>

      {/* Auth Buttons */}
      {/* <div className="auth-buttons">
        {userLoginStatus ? (
          <div className="user-logged-in">
            <Link to="/profile" className="user-logo-wrapper">
              <img src={UserLogo} alt="UserLogo" />
              <span className="tooltip-text">Click to view profile</span>
            </Link>
            <button className="logout" onClick={handleLogout}>Log Out</button>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="login">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="signup">Sign Up</button>
            </Link>
          </>
        )}
      </div> */}
    </header>
  );
};

export default Header;