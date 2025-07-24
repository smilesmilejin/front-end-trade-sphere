import Logo from '../assets/Logo.png'; 
// import './Login.css'; 
import { useContext } from 'react';
// import { UserLoginStatusContext } from '../App';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';

function Login() {
  const { setUserLoginStatus } = useContext(UserLoginStatusContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Normally you'd validate login here
    // For now, just set login status to true
    setUserLoginStatus(true);

    // Redirect user to home page or dashboard after login
    navigate('/');
  };

  return (
    <div>
      <header className="logo">
        <img src={Logo} alt="My Logo" />
        <h1>TradeSphere</h1>
      </header>
      <h2>Log In</h2>
      {/* <form> */}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;