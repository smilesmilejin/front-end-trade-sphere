import Logo from '../assets/Logo.png'; 
// import './signup.css'; 
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';

function Signup() {
  const { setUserLoginStatus } = useContext(UserLoginStatusContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Normally you'd validate login here
    // For now, just set login status to true
    setUserLoginStatus(true);

    // Show a popup message
    alert('Sign up successfully!');

    // Redirect user to home page or dashboard after login
    navigate('/');
  };

  return (

    <div>
        <header className="logo">
        {/* <header className="signup-header"> */}
            <img src={Logo} alt="My Logo" />
            <h1>TradeSphere</h1>
        </header>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* <input type="text" placeholder="Username" required /> */}
        <input type="email" placeholder="Email" required />
        {/* <input type="password" placeholder="Password" required /> */}

        <input type="text" placeholder="name" />
        <input type="text" placeholder="address" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;